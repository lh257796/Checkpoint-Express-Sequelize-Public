let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },

  add: function (name, task) {
    let total;
    if (tasks[name]) {
      total = tasks[name].length;
      tasks[name].push(task);
      if (!(tasks[name][total].complete)) {
        tasks[name][total].complete = false;
      }
    } else {
      tasks[name] = [];
      tasks[name].push(task);
      if (!(tasks[name][0].complete)) {
        tasks[name][0].complete = false;
      }
    }
  },

  list: function (name) {
    // returns tasks for specified person
    if (Object.keys(tasks).includes(name)) {
      return tasks[name];
    }
  },

  complete: function (name, idx) {
    tasks[name][idx].complete = true;
},

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx,1)
  },
};
