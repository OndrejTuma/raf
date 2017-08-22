import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { getTranslate } from 'react-localize-redux'

import { nextConnect } from '../store'

class Scroll extends Component {
	render() {
		const { translate } = this.props

		return (
			<div className="scroll">
				<p>{translate('scroll')}</p>
				<ReactSVG path="static/svg/mouse.svg" className="mouse" />
				<ReactSVG path="static/svg/mouse-down.svg" className="arrow" />
			</div>
		)
	}
}

export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
}))(Scroll)