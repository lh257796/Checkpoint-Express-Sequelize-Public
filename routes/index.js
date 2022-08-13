const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

router.get('/users/', async(req, res, next)=> {
    try {
        const list = todos.listPeople();
	    res.send(list);
    } catch (e) {
        next(e);
    }
})

router.get('/users/:name/tasks', async (req, res, next) => {
    try {
    let person = req.params.name;
    let list = todos.listPeople();
    if (list.indexOf(person) === -1) {
        res.status(404).send();
    }
    res.send(todos.list(person));
}
    catch (e) {
        next(e)
    }
})

router.post('/users/:name/tasks', async (req, res, next) => {
    try {
    let person = req.params.name;
    if (person == undefined) {
        res.status(404).send();
    };
    Object.values(req.body).forEach(function (value) {
        if (value === '') {
            res.status(400).send();
    }
  });
  let complete = req.body.complete;
    if (!complete){
        complete = false;
    }
    let todo = {
        content: req.body.content,
        complete: complete,
    };
    todos.add(person, todo);
    res.status(201).send(todo);
}
    catch (e) {
        next(e)
    }
  });


router.put('/users/:name/tasks/:index', async (req, res) => {
    todos.complete(req.params.name, req.params.index)
    res.status(200).send();
})

router.delete('/users/:name/tasks/:index', async (req, res) => {
    todos.remove(req.params.name, req.params.index)
    res.status(204).send();
})
