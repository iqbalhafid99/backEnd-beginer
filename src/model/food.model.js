const db = require("../config/database");

const foodModel = {
  // sql showing data
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM resep", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  //   sql to insert recipe
  insertRecipe: ({ id, gambar, nama_resep, resep }) => {
    const sql = `INSERT INTO resep (id, gambar, nama_resep, resep) VALUES (${id},'${gambar}','${nama_resep}','${resep}')`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  // sql choice data with name
  foodChoice: ({ nama_resep }) => {
    const sql = `SELECT * FROM resep WHERE nama_resep = '${nama_resep}' `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // sql update recipe
  updateData: ({ id, gambar, nama_resep, resep }) => {
    const sql = `UPDATE resep SET gambar='${gambar}', nama_resep='${nama_resep}', resep='${resep}' WHERE id=${id}`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  //   sql delete recipe
  destroyData: (id) => {
    const sql = `DELETE FROM resep WHERE id=${id}`;
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

module.exports = foodModel;
