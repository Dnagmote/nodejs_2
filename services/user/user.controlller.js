const userService = require("./user.services");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const secreteKey = { jwt_secrete_key: "secrete_key" };

class UserController {
    static async register(req, res) {
        try {
            const isExist = await userService.fineOne({ email: req.body.email });
            if (isExist) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "Email already exist.",
                });
            }

            const isExistPhoneNumber = await userService.fineOne({ phoneNumber: req.body.phoneNumber });
            if (isExistPhoneNumber) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "Phone number  already exist.",
                });
            }

            if (req.body.password) {
                bcrypt.genSalt(saltRound, async function (err, salt) {
                    bcrypt.hash(req.body.password, salt, async function (err, hash) {
                        req.body.password = hash;
                        const result = await userService.save(req.body);
                        if (result) {
                            return res.status(200).send({
                                status: "SUCCESS",
                                message: "User register successfully.",
                                data: result,
                            });
                        } else {
                            return res.status(400).send({
                                status: "FAILURE",
                                message: "User not registered.",
                            });
                        }
                    });
                });
            } else {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "Password is required.",
                });
            }
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }

    // login
    static async login(req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "Email is required.",
                });
            }

            if (!req.body.password) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "password is required.",
                });
            }

            const findeUser = await userService.fineOne({ email: req.body.email });
            if (findeUser) {
                const matchPassword = bcrypt.compare(req.body.password, findeUser.password);
                if (matchPassword) {
                    const payload = {
                        userId: findeUser._id,
                        email: findeUser.email,
                    };
                    const token = jwt.sign(payload, secreteKey.jwt_secrete_key, { expiresIn: "24h" });
                    findeUser["token"] = token;

                    return res.status(200).send({
                        status: "FAILURE",
                        message: "User login successfully.",
                        data: findeUser,
                    });
                } else {
                    return res.status(400).send({
                        status: "FAILURE",
                        message: "Invalid Email or Password.",
                    });
                }
            } else {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "User not found.",
                });
            }
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }

    // Get details
    static async getDetailById(req, res) {
        try {
            console.log("----------req.user------------", req.user);
            const getDetails = await userService.fineOne({ _id: req.params.userId });
            if (!getDetails) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "User not found.",
                });
            }

            return res.status(200).send({
                status: "SUCCESS",
                message: "User details fetched successfully",
                data: getDetails,
            });
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }

    // List
    static async list(req, res) {
        try {
            const list = await userService.list({});
            console.log("list.length", list.length);
            if (list.length == 0) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "User not found.",
                });
            }

            return res.status(200).send({
                status: "SUCCESS",
                message: "User list fetched successfully",
                data: list,
            });
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }

    // Get update
    static async update(req, res) {
        try {
            console.log("----------req.user------------", req.user);
            const update = await userService.update({ _id: req.params.userId }, req.body);
            if (!update) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "User not found.",
                });
            }

            return res.status(200).send({
                status: "SUCCESS",
                message: "User updated successfully",
                data: update,
            });
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }

    // Get update
    static async delete(req, res) {
        try {
            console.log("----------req.user------------", req.user);
            const update = await userService.delete({ _id: req.params.userId });
            if (!update) {
                return res.status(400).send({
                    status: "FAILURE",
                    message: "User not found.",
                });
            }

            return res.status(200).send({
                status: "SUCCESS",
                message: "User deleted successfully",
                data: update,
            });
        } catch (error) {
            console.log("Error : ----------    ", error);
            return res.status(500).send({
                status: "FAILURE",
                message: "Internal server error",
            });
        }
    }
}

module.exports = UserController;
