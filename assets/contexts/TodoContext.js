import React, {createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{task:'do something'}]
        }
    }

    createTodo() {

    }

    render() {
        return (
           <TodoContext.Provider value={{
               ...this.state,
               createTodo: this.createTodo.bind(this)
           }}>
               {this.props.children}
           </TodoContext.Provider>
        )
    }
}

export default TodoContext