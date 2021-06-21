// Ctrl-shift-k borra la linea en la que estas sin copiarla
import './styles.css';

// Si no se aclara que archivo en particular buscar, busca el index.js por defecto
import { Todo, TodoList } from './js/classes'
import { createTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// Esto funciona perfecto, pero se puede escribir mas corto
// todoList.todos.forEach(todo => {
// 	createTodoHtml(todo);
// });

// Si solo se tiene un argumento, se puede escribir asi
todoList.todos.forEach(createTodoHtml);