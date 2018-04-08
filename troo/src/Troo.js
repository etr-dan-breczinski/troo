import React from 'react'
import ReactDOM from 'react-dom'
import { pure, toClass } from 'recompose'
import { isFunction } from 'lodash'
import ImmutableStore from 'immutable-js-store'
import page from 'page'
// import queryString from 'query-string'

import Wrapper from './Wrapper'

// console.log('window', window)

class Cone {
  constructor() {
    this.Actions = {};
    this.initStore = this.initStore.bind(this);
    this.AddAction = this.AddAction.bind(this);
    // page.start();
  }
  initStore(initialData) {
    this.store = new ImmutableStore(initialData);
  }
  AddAction(actionName, action) {
    this.Actions[actionName] = (data = {}) => {
      action(data, this.store);
    }
  }
  Component(componentFunction) {
    const componentClass = toClass(componentFunction);
    componentClass.shouldComponentUpdate = (nextProps) => {
      nextProps.forEach((value, key) => {
        if (!isFunction(value) &&
          componentClass.props[key] !== value) {

          return true;
        }
      });
      return false;
    }
    return componentClass;
  }
  // Route = {
  //   get: (path, cb) => {
  //     page(path, ({ params }) => {
  //       const queryParams = queryString.parse(location.search)
  //       const mergedParams = Object.assign({}, params, queryParams)
  //       cb(mergedParams, this.store)
  //     })
  //   }
  // }
  Root(element, componentFunction, initialData = {}) {
    const Root = pure(componentFunction);
    this.initStore(initialData);
    const store = this.store;
    document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
          <Wrapper initialData={initialData} root={Root} store={store} />,
          element
        );
    });
  }
}



export default Cone
