import express from "express";
import product from './api/product'

const app = express();

app.use(express.json());

app.use("/api/product", product);

const PORT = process.env.PORT || 8080;
const serverStart = async () => {
	try {
		app.listen(PORT, () =>
			console.log(`Server is running in port ${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
};
serverStart();

