import React, { Component } from 'react'
import { nextConnect } from '../store'
import { getTranslate } from 'react-localize-redux'

import ReactSVG from 'react-svg'


class WhiIsRaf extends Component {

	render() {
		const { translate } = this.props

		return (
			<div className="who-is-raf">
				<p>{translate('who')}</p>
			</div>
		)
	}
}

export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
}))(WhiIsRaf)