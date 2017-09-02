import actions from './action-types'

export const setActiveSlide = (payload) => dispatch => dispatch({ type: actions.SET_ACTIVE_SLIDE, payload })

export const setIsMobile = payload => dispatch => dispatch({ type: actions.SET_IS_MOBILE, payload })
export const setIsSliding = payload => dispatch => dispatch({ type: actions.SET_IS_SLIDING, payload })

export const setYoutubeState = payload => dispatch => dispatch({ type: actions.SET_YOUTUBE_STATE, payload })

export const authUser = payload => dispatch => dispatch({ type: actions.AUTH_USER, payload })
export const logInUser = () => dispatch => dispatch({ type: actions.LOG_IN })
export const logOutUser = () => dispatch => dispatch({ type: actions.LOG_OUT })
