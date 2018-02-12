const router = require("express").Router();
const surveyController = require("../../controllers/surveyController");

// Matches with "/api/survey"
router
  .route("/:id")
  .get(surveyController.findById);
  // .put(surveyController.update)
  router
  .route("/calculate/:id")
  .get(surveyController.calculate);
    
module.exports = router;
