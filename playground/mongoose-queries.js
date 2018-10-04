const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bb6513cfe963e02cc0c48d7';

if (!ObjectID.isValid(id))
{
  console.log("invalid id");
}

// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log('todos', todos)
// }, (e) => {
//   console.log(e);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log("todo", todo);
// });

// Todo.findById(id).then((todo)=>{
//   if (!todo)
//   {
//     console.log("unable to find todo");
//   }
//   console.log("TODO by id", todo);
// }).catch((e) => {
//   console.log(e);
// });

User.findById('5bb39c00d4549c0c0118c075').then((user) => {
  if(!user)
  {
    console.log("unable to find user by given id");
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
