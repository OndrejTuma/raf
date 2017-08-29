import React, { Component } from 'react'

import {nextConnect} from '../store'
import {setActiveSlide} from '../redux/actions'

import FootLogo from '../static/svg/logo-footshop.svg'

class LogoFootshop extends Component {

	_handleClick (e) {
		e.preventDefault()
		this.props.dispatch(setActiveSlide(0))
	}

	render() {
		const { className } = this.props

		return (
			<a className={`LogoFootshop${className ? ` ${className}` : ''}`} href="#" onClick={e => this._handleClick(e)}>
				<FootLogo/>
			</a>
		)
	}
}

export default nextConnect()(LogoFootshop)