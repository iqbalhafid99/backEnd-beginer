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
  insertRecipe: ({ user_id, video, nama_resep, resep, image }) => {
    const sql = `INSERT INTO resep (user_id, video, nama_resep, resep, image) VALUES (${user_id}, '${video}','${nama_resep}','${resep}','${image}')`;
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
  updateData: ({ id, video, nama_resep, resep }) => {
    const sql = `UPDATE resep SET video='${video}', nama_resep='${nama_resep}', resep='${resep}' WHERE id=${id}`;
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
  // pagination
  paginate: (limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      const order = sort === "desc" ? "DESC" : "ASC"; // Menentukan urutan sorting berdasarkan nilai sort

      const sql = `SELECT * FROM resep ORDER BY nama_resep ${order} LIMIT ${limit} OFFSET ${offset}`;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  //  select by id
  selectByID: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM resep WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // search menggunakan join
  searchFood: (query) => {
    const sql = `SELECT * FROM resep WHERE LOWER(nama_resep) LIKE $1`;
    return new Promise((resolve, reject) => {
      db.query(sql, [query], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // sorting asc dan desceding
  sortFood: (nama_resep, sortOrder) => {
    const sql = `SELECT * FROM resep ORDER BY ${nama_resep} ${sortOrder}`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  getRecipesWithUser: (user_id) => {
    const sql = `SELECT resep.*, login.name, login.email
                 FROM resep
                 JOIN login ON resep.user_id = login.id
                 WHERE login.id = ${user_id}`;
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
