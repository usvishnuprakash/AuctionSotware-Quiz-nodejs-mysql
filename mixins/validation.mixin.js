const FastestValidator = require("fastest-validator");
const V = new FastestValidator();

//
function validator(schema = {}) {
  // returns the function
  return function (req, res, next) {
    const check = V.compile(schema);
    const result = check({ ...req.params, ...req.body });
    if (result === true) {
      next();
    } else {
      res.status(422).json(result);
    }
  };
}

module.exports = validator;
