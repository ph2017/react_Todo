import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './Welcome';
import Todo from './js/Todo/components/Todo';

import ToDoContainer from './js/Todo/components/ToDoContainer'
import './css/media.scss'



// ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render( < h1 > Hello, world! < /h1> , document.getElementById('root'));
        registerServiceWorker();*/

// ReactDOM.render( <Welcome name="react component!"/> , document.getElementById('root'));

// ReactDOM.render( <Todo /> , document.getElementById('root'));



ReactDOM.render( <ToDoContainer /> , document.getElementById('root'));