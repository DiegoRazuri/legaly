



import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'

import {
  BrowserRouter as Router,
  Route, IndexRoute
} from 'react-router-dom'

import ReactGA from 'react-ga'

import App from './components/app'

ReactGA.initialize('UA-101594950-1');


function logPageView(){
	//ReactGA.set({page : window.location.pathname });
    //ReactGA.pageview(window.location.pathname);
    //ReactGA.set({ page: window.location.pathname + window.location.search });
    //ReactGA.pageview(window.location.pathname + window.location.search);
    
}

const history = createHistory()
history.listen((location, action)=>{
	ReactGA.set({page : location.pathname });
    ReactGA.pageview(location.pathname);
})




const routes = (<Router history={history}>

                   
                {<App/>}


             
            </Router>);




ReactDOM.render(
  routes,
  document.getElementById('container')
);

