class Todo {
  constructor(text, priority = 'medium', dueDate = null, category = 'default') {
    this.id = Date.now();
    this.text = text;
    this.completed = false;
    this.priority = priority;
    this.dueDate = dueDate;
    this.category = category;
    this.createdAt = new Date();
  }
}

class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.categories = new Set(['default']);
    this.initializeElements();
    this.setupEventListeners();
    this.render();
  }

  initializeElements() {
    this.todoInput = document.getElementById('todoInput');
    this.todoList = document.getElementById('todoList');
    this.searchInput = document.getElementById('searchTodos');
    this.priorityFilter = document.getElementById('priorityFilter');
    this.categoryFilter = document.getElementById('categoryFilter');
    this.todoPriority = document.getElementById('todoPriority');
    this.todoDueDate = document.getElementById('todoDueDate');
    this.todoCategory = document.getElementById('todoCategory');
    this.clearCompletedBtn = document.getElementById('clearCompleted');
    this.exportTodosBtn = document.getElementById('exportTodos');
    this.importTodosBtn = document.getElementById('importTodos');
    this.totalTasksSpan = document.getElementById('totalTasks');
    this.completedTasksSpan = document.getElementById('completedTasks');
    this.completionRateSpan = document.getElementById('completionRate');
  }

  setupEventListeners() {
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.todoInput.value.trim()) {
        this.addTodo();
      }
    });

    this.searchInput.addEventListener('input', () => this.render());
    this.priorityFilter.addEventListener('change', () => this.render());
    this.categoryFilter.addEventListener('change', () => this.render());
    this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    this.exportTodosBtn.addEventListener('click', () => this.exportTodos());
    this.importTodosBtn.addEventListener('click', () => this.importTodos());
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    const priority = this.todoPriority.value;
    const dueDate = this.todoDueDate.value || null;
    const category = this.todoCategory.value.trim() || 'default';

    const todo = new Todo(text, priority, dueDate, category);
    this.todos.push(todo);
    this.categories.add(category);
    this.updateCategoryFilter();
    this.save();
    this.render();

    // Clear inputs
    this.todoInput.value = '';
    this.todoPriority.value = 'medium';
    this.todoDueDate.value = '';
    this.todoCategory.value = '';
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.save();
    this.render();
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.save();
    this.render();
  }

  exportTodos() {
    const dataStr = JSON.stringify(this.todos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importTodos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const importedTodos = JSON.parse(event.target.result);
          this.todos = importedTodos;
          this.updateCategories();
          this.save();
          this.render();
        } catch (error) {
          alert('Error importing todos: Invalid file format');
        }
      };
      
      reader.readAsText(file);
    });

    input.click();
  }

  updateCategories() {
    this.categories = new Set(['default']);
    this.todos.forEach(todo => this.categories.add(todo.category));
    this.updateCategoryFilter();
  }

  updateCategoryFilter() {
    this.categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    [...this.categories].sort().forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      this.categoryFilter.appendChild(option);
    });
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const rate = total ? Math.round((completed / total) * 100) : 0;

    this.totalTasksSpan.textContent = total;
    this.completedTasksSpan.textContent = completed;
    this.completionRateSpan.textContent = `${rate}%`;
  }

  createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item${todo.completed ? ' completed' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
    
    const content = document.createElement('div');
    content.className = 'todo-content';
    
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    
    const meta = document.createElement('span');
    meta.className = 'todo-meta';
    meta.textContent = `${todo.priority} priority${todo.dueDate ? ` • Due: ${todo.dueDate}` : ''} • ${todo.category}`;
    
    content.appendChild(text);
    content.appendChild(meta);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

    div.appendChild(checkbox);
    div.appendChild(content);
    div.appendChild(deleteBtn);

    return div;
  }

  filterTodos() {
    let filtered = [...this.todos];
    
    // Search filter
    const searchTerm = this.searchInput.value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm) ||
        todo.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Priority filter
    const priority = this.priorityFilter.value;
    if (priority !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priority);
    }
    
    // Category filter
    const category = this.categoryFilter.value;
    if (category !== 'all') {
      filtered = filtered.filter(todo => todo.category === category);
    }
    
    return filtered;
  }

  render() {
    this.todoList.innerHTML = '';
    const filteredTodos = this.filterTodos();
    
    filteredTodos.forEach(todo => {
      this.todoList.appendChild(this.createTodoElement(todo));
    });
    
    this.updateStats();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}

// Initialize TodoList
const todoList = new TodoList(); 