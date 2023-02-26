/** @format */

import express from 'express';
import product from './api/product';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
try {
	// dotenv.config();

	// if (!process.env.SECRET_KEY) {
	// 	throw new Error('Missing environment variable: "SECRET_KEY"');
	// }

	// if (!process.env.MONGODB_URI) {
	// 	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
	// }

	const DB_URL =
		'mongodb+srv://Admin:192837465Vlad@cluster0.dkzm4vk.mongodb.net/?retryWrites=true&w=majority';

	const app = express();
	app.use(express.json());
	app.use('/api/product', product);
	app.get('/', async (req, res) => {
		res.status(200).send('H1!');
	});
	const PORT = process.env.PORT || 8080;

	mongoose.set('strictQuery', false);
	mongoose.connect(DB_URL);
	app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
} catch (error) {
	console.log(error);
}
