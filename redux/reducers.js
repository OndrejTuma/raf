import { combineReducers } from 'redux'
import { localeReducer as locale } from 'react-localize-redux'

const authReducer = (state = {
	user: {
		id: 0,
		name: '',
	},
	isLogged: false,
}, action) => {
	switch (action.type) {
		case 'AUTH_USER': return Object.assign({}, state, {
			user: action.payload
		})
		case 'LOG_IN': return Object.assign({}, state, {
			isLogged: true
		})
		case 'LOG_OUT': return Object.assign({}, state, {
			isLogged: false
		})
		default: return state
	}
}
const globalReducer = (state = {
	fetching: false,
}, action) => {
	switch (action.type) {
		case 'IS_FETCHING':  return Object.assign({}, state, {
			fetching: action.payload,
		})
		default: return state
	}
}


export default combineReducers({
	locale,
	auth: authReducer,
	global: globalReducer,
})