"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
router.get('/', user_controllers_1.showUsers);
router.get('/add', user_controllers_1.showAddUserForm);
router.post('/add', user_controllers_1.addUser);
router.get('/:id/edit', user_controllers_1.showedit);
router.post('/:id/edit', user_controllers_1.updateUser);
router.delete('/:id', user_controllers_1.deleteUser);
router.post('/:id/delete', user_controllers_1.deleteUserPost);
exports.default = router;
