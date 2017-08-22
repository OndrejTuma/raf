import React, { Component } from 'react'
import { nextConnect } from '../store'
import { getTranslate } from 'react-localize-redux'

import ReactSVG from 'react-svg'
import YouTube from 'react-youtube'


class Youtube extends Component {

	_ytReady (event) {
		const { translate } = this.props

		this.youtube = event.target
		event.target.playVideo()

		if (this.youtube.isMuted()) {
			this.mute.innerHTML = translate('loud')
		}
		else {
			this.mute.innerHTML = translate('mute')
		}
	}

	render() {
		const { translate } = this.props

		return (
			<div className="youtube">
				<div className="mute" onClick={() => {
					if (this.youtube.isMuted()) {
						this.youtube.unMute()
						this.mute.innerHTML = translate('mute')
					}
					else {
						this.youtube.mute()
						this.mute.innerHTML = translate('loud')
					}
				}}>
					<p ref={elm => this.mute = elm}>{translate('loud')}</p>
					<ReactSVG path="static/svg/mute.svg" />
				</div>
				<YouTube
					videoId={`_eLryuBCO-M`}
					opts={{
						height: '200',
						width: '100%',
						playerVars: {
							autoplay: 1,
						},
					}}
					onReady={this._ytReady.bind(this)}
				/>
			</div>
		)
	}
}

export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
}))(Youtube)