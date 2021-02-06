var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('university.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the university database.');
  });


// create table 'student'
const sql='CREATE TABLE student(sname text, coursename text, coursetype text, qualification text)';

db.run(sql, (err) => {
  if (err) {
      // Table already created
      console.log('Table already created.');
  }else{
    console.log('Table created.');
    
    // First time Table created, insert some rows
    console.log('First time Table created, creating some rows.');
    var insert = 'INSERT INTO student (sname,coursename,coursetype,qualification) VALUES(?,?,?,?)';

    db.run(insert,["Shrushh","AI","cse","undergraduate"], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
    
  }
});

const sql2="SELECT * FROM student";
db.all(sql2,(err,rows)=>{
    if (err) {
       throw err;
    }
    rows.forEach((row)=>{
        console.log(row);
    });
});

// export as module, called db
module.exports = db  