const Router = require("express").Router();
const validator = require("../mixins/validation.mixin");
const { login } = require("../validations/users.validations");
const userControllers = require("../controllers/users.controller");

Router.post("/login", validator(login), userControllers.login);

module.exports = Router;
