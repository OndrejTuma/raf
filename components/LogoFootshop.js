import React, { Component } from 'react'
import SVG from 'react-svg'

import {nextConnect} from '../store'
import {setActiveSlide} from '../redux/actions'

class LogoFootshop extends Component {

	_handleClick (e) {
		e.preventDefault()
		this.props.dispatch(setActiveSlide(0))
	}

	render() {
		return (
			<a className={`LogoFootshop`} href="#" onClick={e => this._handleClick(e)}><SVG path="static/svg/logo-footshop.svg" /></a>
		)
	}
}

export default nextConnect()(LogoFootshop)