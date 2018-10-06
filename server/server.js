var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb'); 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text : req.body.text
  });
  //console.log(req.body);

todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
}) ;
});

// GET /todos   

app.get('/todos', (req, res) => {
  Todo.find().then((todo)=>{
    res.send({todo});
  }, (error) => {
    res.status(400).send(error);
  })
});

//GET /todos/id

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
   if (!ObjectID.isValid(id))
   {
     return res.status(404).send();
   }

  Todo.findById(id).then((todo) => {
     if (!todo) 
     {
       return res.status(404).send();
     }
     return res.status(200).send({todo});
  }, (err) => {
     return res.status(400).send();
  })
});





app.listen(3000, () => {
  console.log('Started at poer 3000');
});
