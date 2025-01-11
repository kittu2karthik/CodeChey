const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const compilerController = require("../controllers/compilerController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.get("/:id", userController.getUserById);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.post("/run", compilerController.runCode);
router.post("/submitCode", compilerController.submitCode);

module.exports = router;
