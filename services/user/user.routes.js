const express = require("express");
const router = express.Router();
const userController = require("./user.controlller");
const auth = require("../../helper/auth");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/getById/:userId", auth.verifyToken, userController.getDetailById);

router.get("/list", auth.verifyToken, userController.list);

router.put("/update/:userId", auth.verifyToken, userController.update);

router.delete("/delete/:userId", auth.verifyToken, userController.delete);

module.exports = router;
