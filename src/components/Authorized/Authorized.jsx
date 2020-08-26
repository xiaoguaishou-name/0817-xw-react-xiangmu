import React, { Component } from 'react'
import{getUserInfo,getUserMenu} from './redux'
import {connect} from 'react-redux'

@connect(state=>({usr:state.user}),{getUserInfo,getUserMenu})
class Authorized extends Component {
  async componentDidMount(){
    await Promise.all([this.props.getUserInfo,this.props.getUserMenu])
  }
  render() {
    return this.props.render(this.props.user)
  }
}
export default Authorized

