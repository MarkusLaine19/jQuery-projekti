$(document).ready(function() {
    // Ladataan tehtävät Local Storagesta
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    // Tallennetaan tehtävät Local Storageen
    function saveTasks() {
        const tasks = [];
        $('#task-list li').each(function() {
            const task = {
                text: $(this).find('.task-text').text(),
                completed: $(this).hasClass('completed')
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Lisätään tehtävä DOM:iin
    function addTaskToDOM(taskText, completed = false) {
        const newTask = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
        const taskSpan = $('<span class="task-text"></span>').text(taskText);
        if (completed) {
            newTask.addClass('completed');
        }
        const deleteButton = $('<button class="btn btn-danger btn-sm">Poista</button>');
        const completeButton = $('<button class="btn btn-success btn-sm ml-2">Valmis</button>');

        deleteButton.click(function() {
            newTask.fadeOut(function() {
                $(this).remove();
                saveTasks();
            });
        });

        completeButton.click(function() {
            newTask.toggleClass('completed');
            saveTasks();
        });

        newTask.append(taskSpan).append(completeButton).append(deleteButton);
        $('#task-list').append(newTask.hide().fadeIn());
    }

    // Lisätään tehtävä listaan napilla
    $('#add-task').click(function() {
        const taskText = $('#new-task').val();
        if (taskText) {
            addTaskToDOM(taskText);
            $('#new-task').val('');
            saveTasks();
        }
    });

    // Lisätään tehtävä listaan enter-näppäimellä
    $('#new-task').keypress(function(e) {
        if (e.which == 13) {
            $('#add-task').click();
        }
    });

    // lista liukuu näkyviin tai pois näkyvistä
    $('#toggle-list').click(function() {
        $('#task-list').slideToggle();
    });

    // Lataa tallennetut tehtävät sivun latauksen yhteydessä
    loadTasks();
});




