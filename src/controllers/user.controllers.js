"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserPost = exports.deleteUser = exports.updateUser = exports.showedit = exports.addUser = exports.showAddUserForm = exports.showUsers = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const showUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_models_1.default.find();
        res.render('user-details', { users }); // Note 1
    }
    catch (error) {
        console.error('Error retrieving users:', error); // Added logging
        res.status(500).send('Error retrieving users');
    }
});
exports.showUsers = showUsers;
const showAddUserForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_models_1.default.find();
        res.render('addUser', { users });
    }
    catch (error) {
        res.status(500).send('Error loading form');
    }
});
exports.showAddUserForm = showAddUserForm;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const existingUser = yield user_models_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const newUser = new user_models_1.default({ name, email });
        yield newUser.save();
        res.status(200).json({ success: 'User added successfully' });
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});
exports.addUser = addUser;
const showedit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_models_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit-user', { user });
    }
    catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('Error loading edit form');
    }
});
exports.showedit = showedit;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = yield user_models_1.default.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users');
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield user_models_1.default.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).send('User not found');
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});
exports.deleteUser = deleteUser;
const deleteUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield user_models_1.default.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).send('User not found');
        res.redirect('/users');
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});
exports.deleteUserPost = deleteUserPost;
