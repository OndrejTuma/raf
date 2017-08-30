import nextConnectRedux from 'next-connect-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducers from './redux/reducers'

const dev = process.env.NODE_ENV !== 'production'

const loggerMiddleware = createLogger()
const initStore = (initialState) => {
	return createStore(
		reducers,
		initialState,
		dev ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware)
	)
}


export const nextConnect = nextConnectRedux(initStore)