const { Router } = require("express");

const CustomerController = require("../controllers/customerController");
const customerController = new CustomerController();

const { validateCustomer } = require("../middleware/validate.mw");

const router = new Router();

router
  .route("/")
  .get(customerController.getCustomers)
  .post(validateCustomer, customerController.createCustomer)
  .put(customerController.updateCustomer);
router
  .route("/:customerId")
  .get(customerController.getCustomersById)
  .delete(customerController.deleteCustomer);

module.exports = router;
