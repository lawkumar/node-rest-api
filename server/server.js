var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {ObjectID} = require('mongodb'); 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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

// DELETE todos/id
app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;
   if (!ObjectID.isValid(id))
   {
     return res.status(404).send();
   }

   Todo.findByIdAndDelete(id).then((todo)=> {
     if (!todo)
     {
       return res.status(404).send();
     }
     return res.status(200).send({todo});
   }, (err) => {
     return res.status(400).send();
   })
});

// PATCH /todos/id

app.patch('/todos/:id', (req, res)=> {
var id = req.params.id;
var body = _.pick(req.body, ['text', 'completed']);

if (_.isBoolean(body.completed) && body.completed)
{
  body.completedAt = new Date().getTime();
}
else
{
  body.completedAt = null;
  body.completed = false;
}
if (!ObjectID.isValid(id))
{
  return res.status(404).send();
}

Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=> {
if (!todo)
{
  return res.status(404).send();
}
res.send({todo});

}).catch((e) => {
  res.status(400).send();
})

}, (err) => {
   return res.status(400).send();
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
