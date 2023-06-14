const db = require('../db');

class Api {
  async getExpense(req, res) {
    try {
      const expenses = await db.query(
        `
          SELECT 
            * 
          FROM 
            expenses
        `
      );

      res.json(expenses.rows);
    } catch (err) {
      res.status(500);
      res.send(err.message);
      console.log(err);
    }
  }

  async createExpense(req, res) {
    try {
      const { expense, money } = req.body;

      if (!expense || !money) throw new Error('Нету обзятальных полей!')

      await db.query(
        `
          INSERT INTO expenses
          (trata, money, date)
          VALUES ($1, $2, $3)
        `,
        [
          expense, money, new Date()
        ]
      );

      res.json('Ok')
    } catch (err) {
      res.status(500);
      res.send(err.message);
      console.log(err);
    }
  }

  async getFromDate(req, res) {
    try {
      const day = req.params.day;

      const ex = await db.query(
        `
          SELECT
            trata
          FROM expenses
          WHERE 
          extract(
            day from date
            ) = $1
        `,
        [
          day
        ]
      );

      res.send(ex.rows);
    } catch (err) {
      res.status(500);
      res.send(err.message);
      console.log(err);
    }
  }

  async createLimit(req, res) {
    try {
      const { day, limit } = req.body

      if (!day || !limit) throw new Error('нету обязательных полей!');

      const ex = await db.query(
        `
          SELECT
            trata
          FROM expenses
          WHERE 
          extract(
            day from date
            ) = $1
        `,
        [
          day
        ]
      );

      if (ex.rows.length > 0) {
        // нашёл
        await db.query(
          `
            UPDATE expenses
            SET
              "limit" = $1
            WHERE
              extract(
                day from date
                ) = $2
          `,
          [
            limit, day
          ]
        )
      } else {
        // не нашёл
        await db.query(
          `
            INSERT INTO expenses
            ("limit")
            VALUES ($1)
          `,
          [
            limit
          ]
        )
      }

      res.json('ok');
    } catch (err) {
      res.status(500);
      res.send(err.message);
      console.log(err);
    }
  }

  async getLimit(req, res) {
    try {
      const day = req.params.day;

      const ex = await db.query(
        `
          SELECT
            "limit"
          FROM expenses
          WHERE 
          extract(
            day from date
            ) = $1
        `,
        [
          day
        ]
      );

      res.send(ex.rows);
    } catch (err) {
      res.status(500);
      res.send(err.message);
      console.log(err);
    }
  }
}

module.exports = new Api;