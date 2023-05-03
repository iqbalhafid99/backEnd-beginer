const db = require("../config/database");

const userModel = {
  // sql register
  registerUser: ({ id, name, email, phone, password, level }) => {
    const sql = `INSERT INTO login (id, name, email, phone, password, level) VALUES (${id},'${name}','${email}','${phone}','${password}', ${level})`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  // sql login
  loginUser: ({ email }) => {
    const sql = `SELECT * FROM login WHERE email = '${email}'`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  // sql delete user
  destroyUser: (id) => {
    const sql = `DELETE FROM login WHERE id=${id}`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  // update user
  update: ({ id, name, email, phone, password }) => {
    const sql = `UPDATE login SET name='${name}', email='${email}', phone='${phone}', password='${password}' WHERE id=${id}`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = userModel;
