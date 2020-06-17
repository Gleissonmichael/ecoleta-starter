const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;


db.serialize(() => {
   
   //create table in bd
  db.run(`
        CREATE TABLE IF NOT EXISTS places (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           image TEXT,
           name TEXT,
           address TEXT,
           address2 TEXT,
           state TEXT,
           city TEXT,
           items TEXT
        );            
   `);


   //add values in table
  const query = `
      INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
      ) VALUES (?,?,?,?,?,?,?);
   `;

  const values = [
    "https://images.unsplash.com/photo-1592030585273-850b38003803?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    "Papperside",
    "Guilherme Gemballa, Jardim America",
    "Numero 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lampadas",
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("cadastrado com sucesso");
    console.log(this);
  }

  db.run(query, values, afterInsertData);

  //consult values in table
  db.all(`SELECT * FROM places`, function(err, rows) {
   if (err) {
      return console.log(err);
    }

    console.log("Registros:");
    console.log(rows);
  })

  //delete values in table
/*   db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
   if (err) {
      return console.log(err);
    }
    
    console.log("Deleted")
  })
 */
});