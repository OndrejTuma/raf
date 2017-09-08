import React, { Component } from 'react'
import { setActiveLanguage } from 'react-localize-redux'

import {nextConnect} from '../store'

import { langsMap } from '../translations'

class Languages extends Component {
	render() {
		const { dispatch, translations: { lang } } = this.props

		return (
			<div className="languages">
				<p>{lang}</p>
				<ul className="slash-list">
					{Object.keys(langsMap).map((iso, i) => {
						return (
							<li key={i} onClick={() => dispatch(setActiveLanguage(iso))}>
								{langsMap[iso].name}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default nextConnect()(Languages)