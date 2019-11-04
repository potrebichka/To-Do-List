$(document).ready(function() {

  var listOfTasks = new ListOfTasks();

  $("#formOne").submit(function(event) {
    event.preventDefault();
    var taskInput = $("#inputTask").val();

    listOfTasks.addTask(new Task(taskInput));
    $("#resultList").empty();
    for (var idx = 0; idx < listOfTasks.list.length; idx ++) {
        var task = listOfTasks.list[idx];
        if (task) {
        $("#resultList").append(
          "<div class='form-check'>" +
              "<input class='form-check-input' type='radio' name='tasks' id=" + task.id +">" +
              "<label class='form-check-label' for=" + idx + "exampleRadios1'>" +
                task.name  +
              "</label>" +
          "</div>");
        }
    };
    console.log(listOfTasks.list);

    $(".results").show();

  });

  $("#resultForm").submit(function(event) {
    event.preventDefault();
    var checkedItem = $("input:radio[name=tasks]:checked");
    checkedItem.parent().remove();
    listOfTasks.deleteTask(checkedItem[0].id)
  })




});
// Business logic for Spots
function ListOfTasks() {
  this.list = [],
  this.currentId = 0
}
ListOfTasks.prototype.addTask= function(task) {
  task.id = this.assignId();
  this.list.push(task);
}
ListOfTasks.prototype.assignId = function() {
  this.currentId++;
  return this.currentId;
}

ListOfTasks.prototype.deleteTask = function(id) {
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i]) {
      if (this.list[i].id == id) {
        delete this.list[i];
        return true;
      }
    }
  }
  return false;
}

ListOfTasks.prototype.findTask = function(id) {
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i]) {
      if (this.list[i].id == id) {
        return this.list[i];
      }
    }
  }
  return false;
}

function Task(name) {
  this.name = name;
}
