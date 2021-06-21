import { Todo } from "./todo.class";

export class TodoList {
	
	constructor(){
		this.loadLocalStorage();
	}

	newTodo(todo) {
		this.todos.push(todo);
		this.saveInLocalStorage();
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(todo => todo.id != id);
		this.saveInLocalStorage();
	}

	toggleTodoComplete(id) {
		for (const todo of this.todos) {
			if (todo.id == id) {
				// Simplemente invierte el bool
				todo.completed = !todo.completed;
				this.saveInLocalStorage();
				break;
			}
		}
	}

	deleteCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);
		this.saveInLocalStorage();
	}

	saveInLocalStorage() {
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	loadLocalStorage() {
		// Siempre manejar la posibilidad de que todavia no se haya cargado nada
		// En este caso, si no hay nada en el localStorage con esa key, simplemente lo inicializo como un array vacio.
		this.todos = (localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : [];
		
		this.todos = this.todos.map(Todo.fromJson);
	}
}