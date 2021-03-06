import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Signup from './components/auth/signup';
import Feature from './containers/feature';
import RequireAuth from './components/auth/require_auth';
import Profile from './containers/profile';
import ProfileEdit from './containers/profile-edit';
import ProfileOther from './containers/profile-other';
import TodayDrop from './containers/todaydrop';
import Letter from './containers/letter';
import Contact from './containers/contact';
import UserRemove from './containers/user-remove';


import reducers from './reducers';
import { AUTH_USER } from './actions/type';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if(token){
  // we need to update application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout}/>
        <Route path="signup" component={Signup}/>
        <Route path="user-remove" component={RequireAuth(UserRemove)}/>

        <Route path="feature" component={RequireAuth(Feature)}/>

        <Route path="profile" component={RequireAuth(Profile)}/>
        <Route path="profile-edit" component={RequireAuth(ProfileEdit)}/>
        <Route path="profile/:id" component={ProfileOther}/>

        <Route path="todaydrop" component={RequireAuth(TodayDrop)}/>
        <Route path="letter" component={RequireAuth(Letter)}/>
        <Route path="contact" component={RequireAuth(Contact)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
//Magic!! -> higher order component.
