class Todo {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
    this.completed = false;
    this.createdAt = new Date();
  }
}

class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.initializeElements();
    this.setupEventListeners();
    this.render();
  }

  initializeElements() {
    this.todoInput = document.getElementById('todoInput');
    this.todoList = document.getElementById('todoList');
  }

  setupEventListeners() {
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.todoInput.value.trim()) {
        this.addTodo();
      }
    });
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    const todo = new Todo(text);
    this.todos.push(todo);
    this.save();
    this.render();

    // Clear input
    this.todoInput.value = '';
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

  createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item${todo.completed ? ' completed' : ''}`;
    div.setAttribute('role', 'listitem');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`);
    checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
    
    const content = document.createElement('div');
    content.className = 'todo-content';
    
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    
    content.appendChild(text);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.setAttribute('aria-label', `Delete "${todo.text}"`);
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      this.deleteTodo(todo.id);
    });

    div.appendChild(checkbox);
    div.appendChild(content);
    div.appendChild(deleteBtn);

    return div;
  }

  render() {
    this.todoList.innerHTML = '';
    
    if (this.todos.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'No tasks yet. Add one above!';
      emptyMessage.style.textAlign = 'center';
      emptyMessage.style.padding = '2rem';
      emptyMessage.style.opacity = '0.7';
      emptyMessage.style.fontStyle = 'italic';
      this.todoList.appendChild(emptyMessage);
      return;
    }
    
    this.todos.forEach(todo => {
      this.todoList.appendChild(this.createTodoElement(todo));
    });
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}

// Initialize TodoList
const todoList = new TodoList(); 