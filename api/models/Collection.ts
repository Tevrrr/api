/** @format */

import mongoose from 'mongoose';

export interface ICollection {
    _id: string;
	name: string;
	filter: string;
	image: string;
	products: string[];
}

export const CollectionType = {
	name: { type: String, unique: true, required: true },
	filter: { type: String, ref: 'Filter', required: true },
	image: { type: String, required: true },
	products: [{ type: String, required: true }],
};
const CollectionSchema = new mongoose.Schema<ICollection>(CollectionType);
const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);
export default Collection;
