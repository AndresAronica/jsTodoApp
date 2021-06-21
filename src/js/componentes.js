import { todoList } from "..";
import { Todo } from "./classes";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const createTodoHtml = (todo) => {

	const htmlTodo = 
	`<li class="${todo.completed ? 'completed' : ''}" data-id=${todo.id}>
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
			<label>${todo.task}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

	// Se crea un div para funcionar como contenedor del li, por tema class, id, etc.
	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	// Como no es bueno insertar un div dentro de un ul, sino que lo mejor es insertar li, toma el primer hijo del div, que en este caso es siempre el li
	divTodoList.append(div.firstElementChild);

	return div.firstElementChild;
}

// Eventos

txtInput.addEventListener('keyup', (event) => {
	// La condicion de que no sea vacio tambien podria ser txtInput.value.length > 0
	if (event.keyCode === 13 && txtInput.value !== '') {
		const newTodo = new Todo(txtInput.value);
		todoList.newTodo(newTodo);
		createTodoHtml(newTodo);
		txtInput.value = '';
	}
});

divTodoList.addEventListener('click', (event) => {
	// Guardo el nombre del elemento html que estoy seleccionando
	const elementName = event.target.localName;
	const todoElement = event.target.parentElement.parentElement;
	// getAttribute trae algun atributo especifico del elemento
	const todoId = todoElement.getAttribute('data-id');

	// Hizo click en el checkbox
	if (elementName.includes('input')) {
		todoList.toggleTodoComplete(todoId);

		// Hace toggle de alguna clase para este elemento
		todoElement.classList.toggle('completed');
	}

	if (elementName.includes('button')) {
		todoList.deleteTodo(todoId);
		divTodoList.removeChild(todoElement);
	}
});

btnClearCompleted.addEventListener('click', () => {
	todoList.deleteCompleted();

	for (let i = divTodoList.children.length-1; i >= 0 ;i--) {
		const todo = divTodoList.children[i];
		if (todo.classList.contains('completed')) {
			todo.remove();
		}
	}
});

ulFilters.addEventListener('click', (event) => {
	const filter = event.target.text;

	if (!filter) {return;}

	anchorFilters.forEach( element => element.classList.remove('selected'));
	event.target.classList.add('selected');
	
	for (const e of divTodoList.children) {
		e.classList.remove('hidden');
		const isCompleted = e.classList.contains('completed');

		switch(filter) {
			case 'Pendientes':
				if (isCompleted)
					e.classList.add('hidden');
				break;
			case 'Completados':
				if (!isCompleted)
					e.classList.add('hidden');
				break;
		}
	}
});