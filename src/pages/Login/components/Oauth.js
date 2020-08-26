import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginSuccessSync} from '@redux/actions/login'
@connect(null,{loginSuccessSync})
class Oauth extends Component {
  componentDidMount(){
    console.log(this.props.location)
    const token = this.props.location.search.split('=')[1]
    this.props.loginSuccessSync({token})
    localStorage.setItem('user_token',token)
    this.props.history.replace('/')
  }
  render() {
    return (
      <div>
        授权登陆中....
      </div>
    )
  }
}
export default Oauth
