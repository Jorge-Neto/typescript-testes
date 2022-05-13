"use strict";
(function () {
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = '';
            this.dateCreated = new Date();
            this.dateUpdated = new Date();
            this.description = '';
            this.date = new Date();
            this.notifications = ['EMAIL'];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = '';
            this.dateCreated = new Date();
            this.dateUpdated = new Date();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Todo;
    }());
    var todo = new Todo("Class Todo");
    var reminder = new Reminder("Class Reminder", new Date(), ['Email']);
    var taskView = {
        render: function (tasks) {
            var tasksList = document.getElementById('tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('LI');
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        }
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
