/**
 * @author Aura
 */
;(function () {

    /**
     *
     * The Tasks Object
     */
    var tasks = {
        /**
         * Reset the form inputs
         */
        resetForm: function () {
            $('#task').val('');
            $('#task_id').val(-1);
        },
        /**
         * create the element in the task list from the task object
         *
         * @param task { id : (int) the task id, task : (string) the task description}
         */
        createTask: function (task) {
            var $li = tasks.createElemnt(task);
            $('#tasklist').append($li);
            tasks.resetForm();

        },
        /**
         * remove a task from it's id
         *
         * @param id
         */
        remove: function (id) {
            var taskId = $('#task_id').val();
            if (taskId === id) {
                tasks.resetForm();
            }
            $('#' + id).remove();
        },
        /**
         * Edit a task, fill the form inputs from the Dom Element
         * @param spanEl
         */
        edit: function (spanEl) {
            var $li = $(spanEl).parent();
            var taskId = $(spanEl).parent().attr('id');
            var $taskElement = $('#task');
            $taskElement.val($(spanEl).text()).focus();
            $('#task_id').val(taskId);
            $li.addClass("edited");
        },
        /**
         * Replace a task by another (used in edit)
         * @param task
         */
        replace: function (task) {
            var $li = tasks.createElemnt(task);
            $('#' + task.id).replaceWith($li);
            tasks.resetForm();
        },
        /**
         * Reset the list (empty the list container)
         */
        reset:function(){
            $("#tasklist").html('');
        },
        /**
         * Create the li element to add or replace in the Task List
         * @param task
         * @returns {*|jQuery|HTMLElement}
         */
        createElemnt:function(task){
            return $('<li id="' + task.id + '"><div>' + task.task + '</div><span><a href="#" class="delete">delete</a></span></li>');
        }
    };


    /**
     * Generate a unique String based on timestamp
     * @returns {string}
     */
    function createUniqId() {

        return '_' + (new Date().getTime()).toString(16);
    }

    /**
     * The init function, that will load form events.
     * And manage interaction between user interface and server.
     *
     * @param taskList The array of tasks
     */
    function init(taskList) {

        /**
         Manage the Form Submission
         For Adding or editing task
         */
        $("#taskform").submit(function (e) {
            e.preventDefault();
            var task = $('#task').val();
            var taskId = $('#task_id').val();
            var taskObj = {id: taskId, task: task};
            if (taskObj.id == -1) {
                // This is a new task submited
                taskObj.id = createUniqId();
                tasks.createTask(taskObj);
            } else {
                // this is an existing task
                tasks.replace(taskObj);
            }
        });

        /**
         * Click On the Reset Button
         */
        $('#reset').click(function () {
            tasks.reset();
        });


        var $taskList =$("#tasklist");

        /**
         * Click on a delete Link to delete list item
         */
        $taskList.on('click', 'a.delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('li').attr('id');
            tasks.remove(id);;
        });

        /**
         * DblClick on a Task Link to edit the list item
         */
        $taskList.on('dblclick', 'li > div', function() {
            tasks.edit(this);
        });


        /**
         * Initialise the list with the initial (from parameter) tasklist array
         */
        for (var i = 0; i < taskList.length; i++) {
            tasks.createTask(taskList[i]);
        }
    }


    /**
     Run the Application  with empty Task list
     */
    init([]);
})();
