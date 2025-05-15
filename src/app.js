import express from "express";
import { catchError } from "./utils/errorHandler.js";
import { categoryRouter } from "./routes/category.routes.js";
import { productRouter } from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.use(catchError);

export default app;
