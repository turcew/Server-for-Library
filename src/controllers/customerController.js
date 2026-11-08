const db = require("../../db");

class CustomerController {
  async getCustomers(req, res, next) {
    try {
      const customers = await db.query(
        `SELECT id, full_name, email, phone
        FROM customers
        ORDER BY id`,
      );
      res.json(customers.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCustomersById(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;
      const customer = await db.query(
        `
          SELECT id, full_name, email, phone
          FROM customers
          WHERE id = $1
        `,
        [customerId],
      );
      console.log(customer.rows[0]);
      if (!customer.rows[0]) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      const { full_name, email, phone, password } = req.body;
      const newCustomer = await db.query(
        `INSERT INTO customers (full_name, email, phone, password)
        VALUES
        ($1, $2, $3, $4) RETURNING id, full_name, email, phone`,
        [full_name, email, phone, password],
      );
      res.status(201).json(newCustomer.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const { full_name, email, phone, password, id } = req.body;
      const updatedCustomer = await db.query(
        `UPDATE customers SET full_name=$1, email=$2, phone=$3, password=$4 WHERE id=$5 RETURNING id, full_name, email, phone`,
        [full_name, email, phone, password, id],
      );
      if (!updatedCustomer.rows[0]) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(updatedCustomer.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;
      const delCustomer = await db.query(
        `DELETE FROM customers WHERE id=$1 RETURNING id`,
        [customerId],
      );
      if (delCustomer.rows.length) {
        res.json(delCustomer.rows[0]);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CustomerController;
