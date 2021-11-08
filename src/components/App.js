import React, { Component } from 'react'
import Header from './Header'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Login from './Login'
import Search from './Search'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Routes>
            <Route exact path='/' render={() => <Navigate to='/new/1' />} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Routes>
        </div>
      </div>
    )
  }  
  
}

export default App