const router = require("express").Router();
const adminController = require("../../controllers/adminController");

// Matches with "/api/admin"
router
  .route("/")
  // .get(adminController.findAll)
  .post(adminController.create);

// Matches with "/api/admin/:id"
router
  .route("/:email")
  .get(adminController.findOne);
//   .put(adminController.update)
//   .delete(adminController.remove);
router
  .route("/:id")
  .post(adminController.createsurvey);

router
  .route("/results/:id")
  .get(adminController.findresults);

router
  .route("/adminpage/:id")
  .get(adminController.findAll);

router
  .route("/admin/:email")
  // .get(adminController.findAll)
  .post(adminController.updatevotes);

module.exports = router;

