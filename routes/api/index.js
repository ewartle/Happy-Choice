const router = require("express").Router();
// const surveyRoutes = require("./surveys");
const adminRoutes = require("./admin");
const surveyRoutes = require("./surveys");

// Survey routes
// router.use("/survey", surveyRoutes);
// Admin routes
router.use("/admin", adminRoutes);
router.use("/survey", surveyRoutes);

module.exports = router;

