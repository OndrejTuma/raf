import { combineReducers } from 'redux'
import { localeReducer as locale } from 'react-localize-redux'

import actions from './action-types'

const authReducer = (state = {
	user: {
		id: 0,
		name: '',
	},
	isLogged: false,
}, action) => {
	switch (action.type) {
		case actions.AUTH_USER: return Object.assign({}, state, {
			user: action.payload
		})
		case actions.LOG_IN: return Object.assign({}, state, {
			isLogged: true
		})
		case actions.LOG_OUT: return Object.assign({}, state, {
			isLogged: false
		})
		default: return state
	}
}
const globalReducer = (state = {
	slider: {
		activeSlide: 0,
		previousSlide: null,
	},
	youtube: {
		state: null,
	},
	isMobile: null,
}, action) => {
	switch (action.type) {
		case actions.SET_ACTIVE_SLIDE:  return Object.assign({}, state, {
			slider: {
				...state.slider,
				activeSlide: action.payload,
			},
		})
		case actions.SET_PREVIOUS_SLIDE:  return Object.assign({}, state, {
			slider: {
				...state.slider,
				previousSlide: action.payload,
			},
		})
		case actions.SET_YOUTUBE_STATE:  return {
			...state,
			youtube: {
				...state.youtube,
				state: action.payload
			}
		}
		case actions.SET_IS_MOBILE:  return {
			...state,
			isMobile: action.payload,
		}
		default: return state
	}
}


export default combineReducers({
	locale,
	auth: authReducer,
	global: globalReducer,
})