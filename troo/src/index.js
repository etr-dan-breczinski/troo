import Troo from './Troo'

const troo = new Troo()

const Actions = troo.Actions
const Router = troo.Router
const Routes = troo.Routes
// const Root = troo.Root.bind(troo)
// const _root = troo._root.bind(troo)
const Root = troo.Root
const _root = troo._root
const getRoot = troo.getRoot

export { Actions, Router, Routes, Root, _root, getRoot }

// 
// import Cone from './Cone'
// const cone = new Cone()
// const AddAction = cone.AddAction.bind(cone)
// const Actions = cone.Actions
// const Component = cone.Component.bind(cone)
// const Route = cone.Route
// const Root = cone.Root.bind(cone)

// export { AddAction, Actions, Component, Root, Route }
// export default cone