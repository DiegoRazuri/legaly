



import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route, IndexRoute
} from 'react-router-dom'



import App from './components/app'


const routes = (<Router>

                   
                {<App/>}


             
            </Router>);


ReactDOM.render(
  routes,
  document.getElementById('container')
);

