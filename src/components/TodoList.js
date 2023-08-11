import { useContext, useState } from "react";
import { TodoContext } from "./Dashboard";
import Todo from "./Todo";
import axios from "axios";

const TodoList = () => {
    const todos = useContext(TodoContext);

    const [singleTodo, setSingleTodo] = useState();

    const viewDetails = async(id) => {
        console.log('view clicked');
        const res = await axios.get("https://jsonplaceholder.typicode.com/todos/"+id);
        setSingleTodo(res.data);
    }

    return ( 
        <>
        <div className="container">
            <h3>All Todos</h3>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos && todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.completed.toString()}</td>
                                <td><button onClick={() => viewDetails(todo.id)}>view</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <br />
        <div className="container todo-view">
            {singleTodo && <Todo todo={singleTodo}/>}
        </div>
        </>
     );
}
 
export default TodoList;