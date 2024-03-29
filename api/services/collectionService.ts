/** @format */

import { Request, Response } from 'express';
import Collection, { ICollection } from '../models/Collection';
import { FileArray } from 'express-fileupload';
import FileService from './fileService';
import ProductPage from '../models/ProductPage';

interface ICollectionResult {
	collection?: ICollection;
	collections?: ICollection[];
	errorMessage?: string;
}

class CollectionService {
	async getCollections(filter: string = ''): Promise<ICollectionResult> {
		try {
			const collections = await Collection.find(filter ? { filter } : {});
			return { collections };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Get collections error' };
		}
	}
	async getCollection(id: string): Promise<ICollectionResult> {
		try {
			const collection = await Collection.findById(id);
			if (!collection) {
				return { errorMessage: 'Collection not found' };
			}
			return { collection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Get collections error' };
		}
	}
	async deleteCollection(id: string): Promise<ICollectionResult> {
		try {
			const collection = await Collection.findByIdAndDelete(id);
			if (!collection) {
				return { errorMessage: 'Collection not found' };
			}
			await FileService.removeFile(collection.image);
			return { collection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Get collections error' };
		}
	}
	async addCollection(
		name: string,
		filter: string,
		images: FileArray | null
	): Promise<ICollectionResult> {
		try {
			if (!images?.image) {
				return {
					errorMessage:
						'You must specify the main image at least one additional image!',
				};
			}
			let { filePaths, errorMessage } = await FileService.saveFile(
				images.image,
				name || ''
			);
			if (errorMessage) {
				return {
					errorMessage,
				};
			}
			if (!filePaths) {
				return { errorMessage: 'Add collection error' };
			}
			const image = filePaths[0];
			const newCollection = await Collection.create({
				name,
				filter,
				image,
				products: [],
			});

			return { collection: newCollection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Add collection error' };
		}
	}
	async addProductInCollection(
		collectionID: string,
		productID: string
	): Promise<ICollectionResult> {
		try {
            const collection = await Collection.findById(collectionID);
			if (!collection) {
				return { errorMessage: 'Collection not found' };
            }
            const product = await ProductPage.findById(productID)
            if (!product) {
				return { errorMessage: 'Product not found' };
			}
			if (collection.products.find((value) => value === productID)) {
				return {
					errorMessage: 'This product is already in the collection',
				};
			}
			const updatedCollection = await Collection.findByIdAndUpdate(
				collectionID,
				{
					products: [...collection.products, productID],
				},
				{ new: true }
			);
			if (!updatedCollection) {
				return { errorMessage: 'Update collection error' };
			}
			return { collection: updatedCollection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Update collection error' };
		}
	}
	async deleteProductFromCollection(
		collectionID: string,
		productID: string
	): Promise<ICollectionResult> {
		try {
			const collection = await Collection.findById(collectionID);
			if (!collection) {
				return { errorMessage: 'Collection not found' };
			}
			if (!collection.products.find((value) => value === productID)) {
				return {
					errorMessage: 'This product is not in the collection',
				};
			}
			const updatedCollection = await Collection.findByIdAndUpdate(
				collectionID,
				{
					products: collection.products.filter(
						(item) => item !== productID
					),
				},
				{ new: true }
			);
			if (!updatedCollection) {
				return { errorMessage: 'Update collection error' };
			}
			return { collection: updatedCollection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Update collection error' };
		}
	}
	async updateCollection(
		collection: ICollection
	): Promise<ICollectionResult> {
		try {
			const updatedCollection = await Collection.findByIdAndUpdate(
				collection._id,
				collection,
				{ new: true }
			);

			if (!updatedCollection) {
				return { errorMessage: 'Collection not found' };
			}

			return { collection: updatedCollection };
		} catch (error) {
			console.log(error);
			return { errorMessage: 'Update collection error' };
		}
	}
}

export default new CollectionService();
