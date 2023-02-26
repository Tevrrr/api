/** @format */

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import authRouter from './api/routers/authRouter';
import orderFormRouter from './api/routers/orderFormRouter';
import productPageRouter from './api/routers/productPageRouter';
import filterRouter from './api/routers/filterRouter';
import collectionRouter from './api/routers/collectionRouter';
import roleRouter from './api/routers/roleRouter';
import userRouter from './api/routers/userRouter';
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
app.use(express.static('public'));
app.use(fileUpload({}));
    app.use('/api', productPageRouter);
	app.use('/api', roleRouter);
	app.use('/api', userRouter);
	app.use('/api', collectionRouter);
	app.use('/api', filterRouter);
	app.use('/api', orderFormRouter);
	app.use('/api/auth', authRouter);

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
