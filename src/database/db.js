const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
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
   `)

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
   `

   const values = [
      "https://images.unsplash.com/photo-1591971737811-cf7de8c11f32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
      "Colectoria",
      "Guilherme Gemballa, Jardim America",
      "Numero 260",
      "Santa Catarina",
      "Rio do Sul",
      "Resíduos Eletrônicos, Lampadas"      
   ]

   db.run(query, values, function(err) {
      if(err) {
         return console.log(err)
      }

      console.log("cadastrado com sucesso")
      console.log(this)
   } )
   
   
})