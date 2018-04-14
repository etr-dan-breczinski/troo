import React from 'react'

export default ({ Server, Router, Root }) => {
	Router.get.foo = (args) => {
		console.log('in app router', args)
	}
	Root(() => {
		// console.log('app/index root called')
		return <div>in an ellement</div>
	})
	// Root(({ data }) => {
	// 	console.log('in app!!!')
	// 	// return <div>asdf</div>
	// }, {foo: 'bar'})
}
