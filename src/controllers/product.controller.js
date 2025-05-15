import { Product } from "../models/product.model.js";
import { AppErr } from "../utils/errorHandler.js";
import { response } from "../utils/jsonResponse.js";

export class ProductController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const newProduct = new Product(data);
      await newProduct.save();
      return response(res, "New product created", newProduct);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_, res, next) {
    try {
      const allProducts = await Product.findAll({ include: { all: true } });
      return response(res, "All products", allProducts);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductController.findById(id, next);
      return response(res, "Product by id", product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      await ProductController.findById(id, next);
      const [_, updatedProduct] = await Product.update(data, {
        returning: true,
      });
      return response(res, "Product updated", updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ProductController.findById(id, next);
      await Product.destroy({ where: { id } });
      return response(res, "Product deleted", {});
    } catch (error) {
      next(error);
    }
  }

  static async findById(id, next) {
    try {
      const product = await Product.findByPk(id, { include: { all: true } });
      if (!product) {
        throw new AppErr("Product not found", 404);
      }
      return product;
    } catch (error) {
      next(error);
    }
  }
}
