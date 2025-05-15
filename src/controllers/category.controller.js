import { Category } from "../models/category.model.js";
import { AppErr } from "../utils/errorHandler.js";
import { response } from "../utils/jsonResponse.js";

export class CategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const existCategory = await Category.findOne({ where: { name } });
      if (existCategory) {
        throw new AppErr("This category already exist", 409);
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      return response(res, "Category created", newCategory);
    } catch (error) {
      next(error);
    }
  }

  async getAll(_, res, next) {
    try {
      const allCategories = await Category.findAll({
        include: { all: true },
      });
      return response(res, "All Categories", allCategories);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id, { include: { all: true } });
      if (!category) {
        throw new AppErr("Category not found", 404);
      }
      return response(res, "Category by id", category);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category) {
        throw new AppErr("Category not found", 404);
      }
      const updatedCategory = await Category.update(
        { name },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      return response(res, "Category updated", updatedCategory[1]);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        throw new AppErr("Category not found", 404);
      }
      await Category.destroy({ where: { id } });
      return response(res, "Category deleted", {});
    } catch (error) {
      next(error);
    }
  }
}
