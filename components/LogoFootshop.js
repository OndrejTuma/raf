import React, { Component } from 'react'

import {nextConnect} from '../store'
import {setActiveSlide} from '../redux/actions'

import FootLogo from '../static/svg/logo-footshop.svg'

class LogoFootshop extends Component {

	_handleClick (e) {
		e.preventDefault()
		const { activeSlide, dispatch } = this.props

		if (activeSlide !== 0) {
			dispatch(setActiveSlide(0))
		}
	}

	render() {
		const { className, link } = this.props

		return (
			<a className={`LogoFootshop${className ? ` ${className}` : ''}`} href={link || `#`} onClick={e => this._handleClick(e)}>
				<FootLogo/>
			</a>
		)
	}
}

export default nextConnect(state => ({
	activeSlide: state.global.slider.activeSlide,
}))(LogoFootshop)