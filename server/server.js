var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});



// list all books
app.get("/students", (req, res, next) => {
    let sql = `SELECT * FROM student`;
    var params = []
    db.all(sql, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single book by name
app.get("/books/:name", (req, res, next) => {
    var sql = "select * from book where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new student
app.post("/create", (req, res, next) => {
    var errors=[]

    
         const sname = req.body.sname;
         const coursename = req.body.coursename;
         const coursetype = req.body.coursetype;
         const qualification = req.body.qualification;
    
    var sql ='INSERT INTO student (sname,coursename,coursetype,qualification) VALUES(?,?,?,?)'
    var params =[sname,coursename,coursetype,qualification]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "id" : this.lastID
        })
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
