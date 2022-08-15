const CryptoJS = require("crypto-js");
const sql = require("../mixins/db.mixin");
const secret = "it just a secret";
module.exports = {
  encrypt(encryptionObject) {
    return CryptoJS.AES.encrypt(JSON.stringify(encryptionObject), secret).toString();
  },
  decrypt(hash) {
    const bytes = CryptoJS.AES.decrypt(hash, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  async authenticate(req, res, next) {
    const token = req.headers?.authorization?.split(" ")?.[1]?.trim();
    try {
      if (!!token === true && JSON.parse(token).userType === "guest") {
        return next();
      }
    } catch (error) {
      return res.json(400).json({
        message: "GUEST TOKEN IS INVALID",
      });
    }

    if (!token) return res.status(403).json({ error: "UNAUTHORIZE" });

    const data = this.decrypt();
    // finding user from usertable
    if (data.userType === "user") {
      try {
        const [result] = await sql.query(`
            SELECT * FROM ilance_users WHERE username="${token.userName}"
            AND user_id ="${token.userId}"
            `);
        if (!result) {
          return res.status(403).json({ error: "UNAUTHORIZE" });
        }
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    }
    next();
  },
};
