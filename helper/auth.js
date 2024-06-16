const jwt = require("jsonwebtoken");
const secreteKey = { jwt_secrete_key: "secrete_key" };

class Auth {
    static async verifyToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            const token = header.split(" ")[1];

            const isVerifyToken = jwt.verify(token, secreteKey.jwt_secrete_key);
            if (isVerifyToken) {
                req["user"] = isVerifyToken;
                next();
            } else {
                return res.status(500).send({
                    status: "FAILURE",
                    message: "unauthorised access",
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "FAILURE",
                message: "Invalid credentials",
            });
        }
    }
}

module.exports = Auth;
