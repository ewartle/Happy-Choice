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
  .get(adminController.findOne)
//   .put(adminController.update)
//   .delete(adminController.remove);

module.exports = router;