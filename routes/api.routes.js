const Router = require("express").Router();

// For validation
const validator = require("../mixins/validation.mixin");
const { pagination } = require("../validations/api.validations");

// Controller
const Controller = require("../controllers/api.controller");
const { authenticate } = require("../mixins/authentication.mixin");

// Routes
//!  below authentication maintain stateless session , It is a Bearer authentication
Router.post("/:sortType", authenticate, validator(pagination), Controller.manageSortTypes);

module.exports = Router;
