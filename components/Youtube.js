import React, {Component} from 'react'

import ReactSVG from 'react-svg'
import YouTube from 'react-youtube'

import lyrics from '../karaoke-lyrics'


class Youtube extends Component {

	constructor(props) {
		super(props)

		clearInterval(this.karaokeInterval)

		this.state = {
			karaoke: ''
		}
	}

	_ytStateChange(e) {
		if (e.data === 1) {
			this.karaokeInterval = setInterval(this.setCurrentKaraokeTexts.bind(this), 100)
		}
		else {
			clearInterval(this.karaokeInterval)
		}
	}
	_ytReady(event) {
		const { translations: { mute, loud } } = this.props

		this.youtube = event.target

		this.youtube.playVideo()
		this.youtube.mute()

		if (this.youtube.isMuted()) {
			this.mute.innerHTML = loud
		}
		else {
			this.mute.innerHTML = mute
		}
	}

	setCurrentKaraokeTexts() {
		if (this.youtube) {
			let currentTime = this.youtube.getCurrentTime()

			if (window) {
				this.setState(prevState => ({
					karaoke: lyrics.map((lyric, i) => {
						if (currentTime >= lyric.duration.from && lyric.duration.to >= currentTime) {
							return <span key={i} style={lyric.css} className={lyric.class}>{lyric.text}</span>
						}
					}),
				}))
			}
		}
	}

	render() {
		const { translations: { mute, loud, raf } } = this.props
		const { karaoke } = this.state

		return (
			<div className="youtube">
				<div className="mute" onClick={() => {
					if (this.youtube.isMuted()) {
						this.youtube.unMute()
						this.mute.innerHTML = mute
					}
					else {
						this.youtube.mute()
						this.mute.innerHTML = loud
					}
				}}>
					<p ref={elm => this.mute = elm}>{loud}</p>
					<ReactSVG path="static/svg/mute.svg"/>
				</div>
				<div className="video">
					<p className="title left">{raf}</p>
					<p className="title right">{raf}</p>
					<p className="karaoke">{karaoke}</p>
					<YouTube
						videoId={`_eLryuBCO-M`}
						opts={{
							height: '180',
							width: '100%',
							//https://developers.google.com/youtube/player_parameters
							playerVars: {
								autoplay: 1,
								controls: 0,
								disablekb: 1,
								iv_load_policy: 3,
								loop: 1,
								modestbranding: 1,
								showinfo: 0,
							},
						}}
						onReady={this._ytReady.bind(this)}
						onStateChange={this._ytStateChange.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default Youtube