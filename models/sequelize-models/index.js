const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE

});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);


//---------^^^---------  your code above  ---------^^^----------

Task.clearCompleted = async function() {
  let cleared = await this.destroy({
    where: {
      complete: true
    }
  })
  return cleared;
}

Task.completeAll = async function() {
  let completed = await this.update(
    {complete: true}, {
      where: {
        complete: false
      }
    }
  )
  return completed;
}

Task.prototype.getTimeRemaining = function (){
  if (!this.due) {
    return Infinity;
  } else {
  return (this.due) - (new Date)
  }
}

Task.prototype.isOverdue = function(){
  if (((this.due - new Date) < 0) && (this.complete === false)) {
    return true;
  } else {
    return false;
  }
}

Task.prototype.assignOwner = function(person){
  let assigned = this.setOwner(person);
  return assigned;
}

Owner.getOwnersAndTasks = async function(){
  let everyThing = await this.findAll( {include: Task});
  return everyThing;
}

Owner.prototype.getIncompleteTasks = async function() {
  let allTasks = await this.getTasks();
  return allTasks
    .filter(
      (task) =>
          task.complete === false
    )}

Owner.beforeDestroy((person) => {
  if (person.name === 'Grace Hopper') {
    let err = Error('Cannot detroy owners with name Grace Hopper');
    throw err;
  }
})

module.exports = {
  Task,
  Owner,
};
