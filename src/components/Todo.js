const Todo = ({todo}) => {
    return ( 
        <>
            <h3>Single Todo</h3>
            <p>ID: {todo.id}</p>
            <p>Title: {todo.title}</p>
            <p>Completed: {todo.completed}</p>
        </>
     );
}
 
export default Todo;