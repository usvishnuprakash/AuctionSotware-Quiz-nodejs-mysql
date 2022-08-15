const sql = require("../mixins/db.mixin");
const md5 = require("md5");
const { encrypt } = require("../mixins/authentication.mixin");
module.exports = {
  async login(req, res, next) {
    try {
      const query = `SELECT username , user_id , password , salt
       FROM ilance_users WHERE username="${req.body.userName}"`;
      const [user] = await sql.query(query);
      if (!user) {
        return res.status(204).json({
          message: "User name not found",
          response: req.body,
        });
      }
      if (user.password !== md5(md5(req.body.password) + user.salt)) {
        return res.status(400).json({
          message: "Incorrect password",
          response: req.body,
        });
      }
      const token = encrypt({
        userName: user.username,
        userId: user.user_id,
        userType: "user",
      });
      return res.json({
        message: "Login successfully",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
