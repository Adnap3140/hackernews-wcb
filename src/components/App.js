import React, { Component } from 'react'
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import CreateImage from './CreateImage'
import Login from './Login'
import Search from './Search'
import Hi from './Hi.js'
import LinkSort from './LinkSort'
import UserList from './UserList'
import ImageList from './ImageList'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/createImage' component={CreateImage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/sort' component={LinkSort} />
            <Route exact path='/users' component={UserList} />
            <Route exact path='/images' component={ImageList} />
            <Route exact path='/new/:page' component={LinkList} />
            <Route exact path='hi' component={Hi} />
          </Switch>
        </div>
      </div>
    )
  }  
  
}

export default App