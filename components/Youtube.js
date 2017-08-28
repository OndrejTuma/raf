import React, {Component} from 'react'
import SVG from 'react-svg'
import YouTube from 'react-youtube'
import classNames from 'classnames'

import {nextConnect} from '../store'
import {setYoutubeState} from '../redux/actions'

import ResponsiveRatio from './ResponsiveRatio'

import lyrics from '../karaoke-lyrics'


class Youtube extends Component {

	constructor(props) {
		super(props)

		this.setCurrentKaraokeTexts = this.setCurrentKaraokeTexts.bind(this)
		this._setTitlesHeight = this._setTitlesHeight.bind(this)
		this._ytStateChange = this._ytStateChange.bind(this)
		this._ytReady = this._ytReady.bind(this)

		this.state = {
			isMuted: true
		}
		this.karaoke = null
		this.karaokeInterval = 0
	}
	componentDidMount() {
		window.addEventListener('resize', this._setTitlesHeight)
		this._setTitlesHeight()
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this._setTitlesHeight)
	}

	_setTitlesHeight() {
		clearInterval(this.titleInterval)
		this.titleInterval = setInterval(() => {
			if ( !this.titleLeft || !this.titleRight || !this.videoWrapper) {
				return
			}
			if (this.videoWrapper.offsetHeight) {
				let fontSize = parseInt(this.titleLeft.style.fontSize) || 10,
					tolerance = 20,
					zooming = Math.abs(this.titleLeft.offsetWidth - this.videoWrapper.offsetHeight) > tolerance,
					zoomIn = this.titleLeft.offsetWidth + tolerance < this.videoWrapper.offsetHeight

				if (zooming) {
					this.titleLeft.style.fontSize = `${zoomIn ? fontSize + 10 : fontSize - 10}px`
					this.titleRight.style.fontSize = `${zoomIn ? fontSize + 10 : fontSize - 10}px`
				}
				else {
					clearInterval(this.titleInterval)
				}
			}

		}, 10)
	}
	_ytEnded() {
		this.youtube.playVideo()
	}
	_ytStateChange(e) {
		const { dispatch } = this.props
		const { isMuted } = this.state

		dispatch(setYoutubeState(e.data))

		// video playing
		if (e.data === 1) {
			let isVideoMuted = this.youtube.isMuted()
			if (isVideoMuted != isMuted) {
				if (isMuted) {
					this.youtube.mute()
				}
				else {
					this.youtube.unMute()
				}
			}
			if (!this.karaokeInterval) {
				this.karaokeInterval = setInterval(this.setCurrentKaraokeTexts, 200)
			}
		}
		else {
			clearInterval(this.karaokeInterval)
			this.karaokeInterval = 0
		}
	}
	_ytReady(event) {
		this.youtube = event.target

		this.youtube.playVideo()
	}

	muteToggle () {
		let isMuted = this.youtube.isMuted()

		if (isMuted) {
			this.youtube.unMute()
		}
		else {
			this.youtube.mute()
		}
		this.setState({ isMuted: !isMuted })
	}
	setCurrentKaraokeTexts () {
		if (this.youtube) {
			let currentTime = this.youtube.getCurrentTime()

			if (currentTime) {
				this.karaoke = lyrics.reduce((res, line, i) => {
					if (line.words && line.words.length) {
						line.words.map(word => {
							if (currentTime >= line.duration.from && line.duration.to >= currentTime) {
								return <span key={i} style={word.css} className={word.class}>{word.text}</span>
							}
						})
					}
					return res
				}, [])
			}
		}
	}

	render() {
		const { translations: { mute, loud, raf } } = this.props
		let { isMuted } = this.state

		return (
			<div className="Youtube">
				<div className={classNames('mute', { 'is-muted': isMuted })} onClick={() => this.muteToggle()}>
					<p>{isMuted ? loud : mute}</p>
					<SVG path={`static/svg/${isMuted ? 'unmute' : 'mute'}.svg`}/>
				</div>
				<div className="video-wrapper" ref={elm => this.videoWrapper = elm}>
					<ResponsiveRatio className="video" ratio={16/8}>
						<p ref={elm => this.titleLeft = elm} className="title left">{raf}</p>
						<p ref={elm => this.titleRight = elm} className="title right">{raf}</p>
						<p className="karaoke">{this.karaoke}</p>
						<YouTube
							videoId={`_eLryuBCO-M`}
							opts={{
								height: '100%',
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
							onReady={this._ytReady}
							onEnd={this._ytEnded}
							onStateChange={this._ytStateChange}
						/>
					</ResponsiveRatio>
				</div>
			</div>
		)
	}
}

export default nextConnect(state => ({
	ytState: state.global.youtube.state,
}))(Youtube)