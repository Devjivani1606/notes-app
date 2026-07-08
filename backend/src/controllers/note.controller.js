const Note = require("../models/note.model");
const response = require("../utils/response");

exports.createNote = async (req, res) => {
    try {
        const { title, description, isPinned, category_id } = req.body;
        const user_id = req.user.id;

        if (!title) {
            return response.error(res, "Title is required", 400);
        }

        const insertId = await Note.createNote(title, description, isPinned, category_id, user_id);
        const newNote = await Note.getNoteById(insertId, user_id);

        return response.success(res, "Note Created Successfully", newNote, 201);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};

exports.getNotes = async (req, res) => {
    try {
        const user_id = req.user.id;
        const notes = await Note.getNotesByUserId(user_id);
        return response.success(res, "Notes Retrieved Successfully", notes, 200);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isPinned, category_id } = req.body;
        const user_id = req.user.id;

        if (!title) {
            return response.error(res, "Title is required", 400);
        }

        const success = await Note.updateNote(id, user_id, title, description, isPinned, category_id);
        if (!success) {
            return response.error(res, "Note not found or unauthorized", 404);
        }

        const updated = await Note.getNoteById(id, user_id);
        return response.success(res, "Note Updated Successfully", updated, 200);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const success = await Note.deleteNote(id, user_id);
        if (!success) {
            return response.error(res, "Note not found or unauthorized", 404);
        }

        return response.success(res, "Note Deleted Successfully", null, 200);
    } catch (err) {
        return response.error(res, err.message, 500);
    }
};
