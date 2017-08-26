import actions from './action-types'

export const setActiveSlide = (payload, prevousSlide) => dispatch => {
	dispatch({ type: actions.SET_ACTIVE_SLIDE, payload })
	if (prevousSlide >= 0) {
		dispatch(setPreviousSlide(prevousSlide))
	}
}
export const setPreviousSlide = payload => dispatch => dispatch({ type: actions.SET_PREVIOUS_SLIDE, payload })

export const setIsMobile = payload => dispatch => dispatch({ type: actions.SET_IS_MOBILE, payload })

export const setYoutubeState = payload => dispatch => dispatch({ type: actions.SET_YOUTUBE_STATE, payload })

export const authUser = payload => dispatch => dispatch({ type: actions.AUTH_USER, payload })
export const logInUser = () => dispatch => dispatch({ type: actions.LOG_IN })
export const logOutUser = () => dispatch => dispatch({ type: actions.LOG_OUT })
