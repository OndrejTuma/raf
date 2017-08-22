import React, { Component } from 'react'
import { nextConnect } from '../store'
import { getTranslate, setActiveLanguage, getActiveLanguage } from 'react-localize-redux'

import { langs } from '../translations'

class Languages extends Component {
	render() {
		const { currentLanguage, dispatch, translate } = this.props

		return (
			<div className="languages">
				<p>{translate('lang')}</p>
				<ul className="slash-list">
					{langs.map((lang, i) => {
						if (lang != currentLanguage.code) {
							return <li key={i} onClick={() => dispatch(setActiveLanguage(lang))}>{lang}</li>
						}
					})}
				</ul>
			</div>
		)
	}
}

export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
	currentLanguage: (state.locale && state.locale.languages.length) ? getActiveLanguage(state.locale) : '',
}))(Languages)