import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import store from './store/index'
import Container from './container'

export default ()=> (
  <Provider store={store}>
    <Container/>
  </Provider>
)
