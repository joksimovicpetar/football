import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { createBrowserHistory } from 'history';
import{Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router'
import App from './components/App';
import LoginForm from './components/LoginForm';
import {
  Router,
  Switch,
  Link,
  BrowserRouter
} from "react-router-dom";
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'
import { tokenMiddleware } from './middleware';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, tokenMiddleware));

const history = createBrowserHistory();

// import { TodoContext } from './contexts/TodoContext';
// import TodoContextProvider from './contexts/TodoContext';
// import TodoTable from './components/TodoTable';
// class App extends React.Component {
//     render() {
//         return (
//             <TodoContextProvider>
//                 <TodoTable/>
//             </TodoContextProvider>
//         )
//     }
// }

ReactDOM.render((
<Provider store={store}>
<BrowserRouter >
{/* <BrowserRouter history={history}> */}


        <Route path="/" component={App}/>
    </BrowserRouter>
</Provider>
), document.getElementById('root'));

// export default App;