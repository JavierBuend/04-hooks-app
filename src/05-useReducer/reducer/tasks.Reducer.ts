import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


interface TaskState{
    todos: Todo[];
    length: number;
    completed:number;
    pending: number;
}

export type TaskAction=
| {type:'ADD_TODO', payload: string}
| {type:'TOGGLE_TODO', payload: number}
| {type:'DELETE_TODO', payload: number}

//objeto de validación con zod de todo

const TodoSchema=z.object({
    id:z.number(),
    text:z.string(),
    completed:z.boolean(),
})
//objeto de validación con zod del estado
const TaskStateSchema=z.object({

todos:z.array(TodoSchema),
length:z.number(),
completed:z.number(),
pending:z.number(),
})

//validar mediante zod





export const getTasksInitialState=():TaskState=>{
// Intenta obtener los datos guardados en el navegador
    const localStorageState= localStorage.getItem('tasks-state')
    // Si no hay nada guardado (primera vez o caché limpia), retorna el estado inicial vacío
    if(!localStorageState){
    return{
        todos:[],
        completed:0,
        pending:0,
        length:0,
    }
    }
    const result=TaskStateSchema.safeParse(JSON.parse(localStorageState));

    if(result.error){
        console.log(result.error);
            return{
        todos:[],
        completed:0,
        pending:0,
        length:0,
    }
    }
    
    // Si existen datos, convierte el string de JSON a un objeto de TypeScript
    //! el objeto puede haber sido manipulado
    return result.data;


}


export const taskReducer=(state:TaskState, action:TaskAction):TaskState=>{

    switch(action.type){
case "ADD_TODO":{

        const newTodo: Todo = {
      id: Date.now(),
      text: action.payload,
      completed: false,
    };

    //función para agregar todos

    return {...state,
        todos:[...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending +1,
    };
}
case "DELETE_TODO":{
    const currentTodos=state.todos.filter((todo) => todo.id != action.payload)

    return {...state,
        todos:currentTodos,
        length:currentTodos.length,
        completed:currentTodos.filter(todo=>todo.completed).length,
        pending:currentTodos.filter(todo=>!todo.completed).length
    };}

case "TOGGLE_TODO":{
        const updatedTodos = state.todos.map((todo) => {
      if (todo.id === action.payload) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    return{
        ...state,
        todos:updatedTodos,
        completed:updatedTodos.filter(todo=>todo.completed).length,
        pending:updatedTodos.filter(todo=>!todo.completed).length
    }
}


    }
}