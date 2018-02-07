const router = require("express").Router();
// const surveyRoutes = require("./surveys");
const adminRoutes = require("./admin");

// Survey routes
// router.use("/survey", surveyRoutes);
// Admin routes
router.use("/admin", adminRoutes);

module.exports = router;
