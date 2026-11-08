const db = require("../../db");

class BookController {
  async getBooks(req, res, next) {
    try {
      const books = await db.query(
        `SELECT id, title, genre_id, shelf_id, description, image
        FROM books
        ORDER BY id`,
      );
      res.json(books.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getBooksById(req, res, next) {
    try {
      const {
        params: { bookId },
      } = req;
      const book = await db.query(
        `
          SELECT
            b.id,
            b.title,
            b.description,
            b.image,
            g.title AS genre,
            s.title AS shelf
          FROM books AS b
          JOIN genres AS g
            ON b.genre_id = g.id
          JOIN shelves AS s
            ON b.shelf_id = s.id
          WHERE b.id = $1
        `,
        [bookId],
      );
      console.log(book.rows[0]);
      if (!book.rows[0]) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const { title, genre, shelf, description, image } = req.body;
      const newBook = await db.query(
        `INSERT INTO books (title, genre_id, shelf_id, description, image)
        VALUES
        ($1,
         (SELECT id FROM genres WHERE title=$2),
         (SELECT id FROM shelves WHERE title=$3),
         $4,
         $5)
        RETURNING *`,
        [title, genre, shelf, description || null, image || null],
      );
      res.status(201).json(newBook.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const { title, genre, shelf, description, image, id } = req.body;
      const updatedBook = await db.query(
        `UPDATE books SET
          title=$1,
          genre_id=(SELECT id FROM genres WHERE title=$2),
          shelf_id=(SELECT id FROM shelves WHERE title=$3),
          description=$4,
          image=$5
        WHERE id=$6
        RETURNING *`,
        [title, genre, shelf, description || null, image || null, id],
      );
      if (!updatedBook.rows[0]) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(updatedBook.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const {
        params: { bookId },
      } = req;
      const delBook = await db.query(
        `DELETE FROM books WHERE id=$1 RETURNING id`,
        [bookId],
      );
      if (delBook.rows.length) {
        res.json(delBook.rows[0]);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = BookController;
