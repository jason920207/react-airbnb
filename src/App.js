import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import Header from './shared/Header'
import RentalList from './components/rental/RentalList'
import RentalDetail from './components/rental/RentalDetail'

import Login from './components/login/Login'
import Register from './components/register/Register'

import { init } from './reducers'
const store = init()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter >
          <div className="App">
          <Header />
            <div className='container'>
              <Route exact path='/' render={() => { return <Redirect to='/rentals' /> }} />
              <Route exact path='/rentals' component= {RentalList} />
              <Route exact path='/rentals/:id' component= {RentalDetail} />
              <Route exact path='/login' component= {Login} />
              <Route exact path='/register' component= {Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
