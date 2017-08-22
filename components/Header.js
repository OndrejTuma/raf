import React, { Component } from 'react'
import ReactSVG from 'react-svg'

import Hamburger from './Hamburger'

export default class Header extends Component {
	render () {
		return (
			<div className="header">
				<ReactSVG path="static/svg/footshop.svg" className="logo-footshop" />
				<Hamburger/>
				<ReactSVG path="static/svg/raf.svg" className="logo-raf" />
			</div>
		)
	}
}