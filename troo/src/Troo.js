import React from 'react'
import ReactDOM from 'react-dom'
import { pure, toClass } from 'recompose'
import { isFunction } from 'lodash'
import ImmutableStore from 'immutable-js-store'
import page from 'page'
import Wrapper from './Wrapper'

class Cone {
  constructor() {
  	const self = this
  	// const getRoutes = {}
    this._Actions = {};
    this.Routes = {
    	get: [],
    	post: [],
    }
    const getProxy = (method) => {
    	const setter = (obj, prop, callback) => {
		    // this.Routes[method][prop] = callback;
		    this.Routes[method].push({ route: prop,  callback });
		    return true;
		}
		return new Proxy({}, { set: setter });
    }
    this.Router = {
    	get: getProxy('get'),
    	post: getProxy('post'),
    }

    this.initStore = this.initStore.bind(this);
    this.store = null;

	this.Actions = new Proxy(this._Actions, {
	    set: function(obj, prop, callback) {
	    	obj[prop] = (args = {}) => {
	    		callback(self.store, args)
	    	};
	    	return true;
	    }
	});
  }
  initStore(initialData) {
    this.store = new ImmutableStore(initialData);
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
