/** @format */

import express from 'express';
import product from './api/product';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
try {
	dotenv.config();

	// if (!process.env.SECRET_KEY) {
	// 	throw new Error('Missing environment variable: "SECRET_KEY"');
	// }

	if (!process.env.MONGODB_URI) {
		throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
	}

	const DB_URL = process.env.MONGODB_URI;

	const app = express();
	app.use(express.json());
	app.use('/api/product', product);
	app.get('/', async (req, res) => {
		res.status(200).send('H1!');
	});
	const PORT = process.env.PORT || 8080;
	const serverStart = async () => {
		mongoose.set('strictQuery', false);
		mongoose.connect(DB_URL);
		app.listen(PORT, () =>
			console.log(`Server is running in port ${PORT}`)
		);
    };
    serverStart();
} catch (error) {
	console.log(error);
}
