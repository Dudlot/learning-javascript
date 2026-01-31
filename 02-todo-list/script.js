document.addEventListener('DOMContentLoaded', function() {
    
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    
    // CHARGER LES TÂCHES SAUVEGARDÉES
    loadTasks();
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Écris quelque chose ! 📝');
            return;
        }
        
        // Créer la tâche visuellement
        createTaskElement(taskText, false);
        
        // Sauvegarder dans le navigateur
        saveTasks();
        
        // Vider le champ
        taskInput.value = '';
    }
    
    // CRÉER L'ÉLÉMENT VISUEL
    function createTaskElement(text, completed) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (completed) {
            li.classList.add('completed');
        }
        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';

        span.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks(); 
        });

        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks(); 
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
    
    // SAUVEGARDER TOUTES LES TÂCHES
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(function(item) {
            const text = item.querySelector('.task-text').textContent;
            const completed = item.classList.contains('completed');
            
            tasks.push({
                text: text,
                completed: completed
            });
        });
        
        // Convertir en texte et sauvegarder
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // CHARGER LES TÂCHES SAUVEGARDÉES
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(function(task) {
                createTaskElement(task.text, task.completed);
            });
        }
    }
    
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
});
