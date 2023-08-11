import axios from "axios";
import { useState } from "react";

const NewTodo = () => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState('');

    const saveTodo = async(e) => {
        e.preventDefault();
        try {
            await axios.post("https://jsonplaceholder.typicode.com/todos", {title, completed});
            console.log("todo added");
        } catch (error) {
            console.log("error adding todo: ");
            console.error(error);
        }
    }

    return ( 
        <div className="container">
            <h3>New Todo</h3>
            <form onSubmit={saveTodo}>
                <label htmlFor="title">Title</label><br />
                <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} />

                <br /><br />

                <label htmlFor="completed">Completed</label><br />
                <input type="text" name="completed" id="completed" onChange={e => setCompleted(e.target.value)} />

                <br /><br />
                <button type="submit">Add Todo</button>
            </form>
        </div>
     );
}
 
export default NewTodo;