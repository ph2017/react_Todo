import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './Welcome';
import Todo from './js/Todo/Todo';

// ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render( < h1 > Hello, world! < /h1> , document.getElementById('root'));
        registerServiceWorker();*/

// ReactDOM.render( <Welcome name="react component!"/> , document.getElementById('root'));

ReactDOM.render( <Todo /> , document.getElementById('root'));