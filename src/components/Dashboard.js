import React, { useEffect, useState } from "react";
import axios from "axios";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";


export const TodoContext = React.createContext();

const Dashboard = () => {

    const [todosState, setTodosState] = useState([]);
    const [temp, setTemp] = useState(null);
  
    const fetchTodos = async() => {
        const result = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
        setTodosState(result.data);
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleUndo = async() => {
        console.log("undo clicked");
        if(todosState.length > 0){
            const lastTodo = todosState[todosState.length - 1];
            try {
                setTemp(lastTodo);
                await axios.delete("https://jsonplaceholder.typicode.com/todos/"+lastTodo.id);
                fetchTodos();
            } catch (error) {
                console.error("Error undoing: \n"+error);
            }
        }
    }

    const handleRedo = async() => {
        console.log("redo clicked");
        if(temp){
            try {
                await axios.post("https://jsonplaceholder.typicode.com/todos/", temp);
                setTemp(null);
                fetchTodos();
            } catch (error) {
                console.error("Error redoing: \n"+error);
            }
        }
    }

    return ( 
        <TodoContext.Provider value={todosState}>
            <div>
                <h2>Welcome to Todo App</h2>
                <br />
                <button onClick={handleUndo}>Undo</button> &nbsp;
                <button onClick={handleRedo}>Redo</button>
                <br /><br />
                {/* <Link to='/new-todo'>New todo</Link> */}
                <NewTodo/>
                <br />
                {/* <Link to='/todos'>Todo list</Link> */}
                {todosState && <TodoList setTodo={setTodosState}/>}
                <br />
            </div>
        </TodoContext.Provider>
     );
}
 
export default Dashboard;