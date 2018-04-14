import React from 'react'

export default ({ Server, Router }) => {
	Router.get.foo = (args) => {
		console.log('in app router', args)
	}
}
