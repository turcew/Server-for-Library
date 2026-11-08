const db = require("../../db");

class AuthorController {
  async getAuthors(req, res, next) {
    try {
      const authors = await db.query(
        `SELECT full_name, email, nationality_id
        FROM authors
        ORDER BY id`,
      );
      res.json(authors.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAuthorsById(req, res, next) {
    try {
      const {
        params: { authorId },
      } = req;
      const author = await db.query(
        `
          SELECT
            a.id,
            a.full_name,
            a.email,
            n.description AS country
          FROM authors AS a
          JOIN nationalities AS n
            ON a.nationality_id = n.id
          WHERE a.id = $1
        `,
        [authorId],
      );
      console.log(author.rows[0]);
      if (!author.rows[0]) {
        return res.status(404).json({ error: "Author not found" });
      }
      res.json(author.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createAuthor(req, res, next) {
    try {
      const { full_name, email, nationality } = req.body;
      const newAuthor = await db.query(
        `INSERT INTO authors (full_name, email, nationality_id)
        VALUES
        ($1, $2, (SELECT id FROM nationalities WHERE title=$3)) RETURNING *`,
        [full_name, email, nationality],
      );
      res.status(201).json(newAuthor.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateAuthor(req, res, next) {
    try {
      const { full_name, email, nationality, id } = req.body;
      const updatedAuthor = await db.query(
        `UPDATE authors SET full_name=$1, email=$2, nationality_id=(SELECT id FROM nationalities WHERE title=$3) WHERE id=$4 RETURNING *`,
        [full_name, email, nationality, id],
      );
      if (!updatedAuthor.rows[0]) {
        return res.status(404).json({ error: "Author not found" });
      }
      res.json(updatedAuthor.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteAuthor(req, res, next) {
    try {
      const {
        params: { authorId },
      } = req;
      const delAuthor = await db.query(
        `DELETE FROM authors WHERE id=$1 RETURNING id`,
        [authorId],
      );
      if (delAuthor.rows.length) {
        res.json(delAuthor.rows[0]);
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthorController;
