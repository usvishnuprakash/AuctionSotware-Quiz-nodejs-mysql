const userValidationSchema = {};

userValidationSchema.login = {
  userName: {
    type: "string",
    convert: true,
  },
  password: {
    type: "string",
    convert: true,
  },
};
module.exports = userValidationSchema;
