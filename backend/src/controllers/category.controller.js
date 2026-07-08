const Category = require("../models/category.model");
const response = require("../utils/response");

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const user_id = req.user.id;

        if (!name) {
            return response.error(res, "Category name is required", 400);
        }

        const insertId = await Category.createCategory(name, user_id);
        const newCategory = await Category.getCategoryById(insertId, user_id);

        return response.success(res, "Category Created Successfully", newCategory, 201);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};

exports.getCategories = async (req, res) => {
    try {
        const user_id = req.user.id;
        const categories = await Category.getCategoriesByUserId(user_id);
        return response.success(res, "Categories Retrieved Successfully", categories, 200);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const success = await Category.deleteCategory(id, user_id);
        if (!success) {
            return response.error(res, "Category not found or unauthorized", 404);
        }

        return response.success(res, "Category Deleted Successfully", null, 200);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};
