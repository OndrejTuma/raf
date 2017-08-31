import React, {Component} from 'react'
import YouTube from 'react-youtube'
import classNames from 'classnames'
import {Motion} from 'react-motion'

import {nextConnect} from '../store'
import {setYoutubeState} from '../redux/actions'

import Mute from '../static/svg/mute.svg'
import Unmute from '../static/svg/unmute.svg'

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
			isMuted: false,
			karaoke: null,
		}
		this.karaokeInterval = 0
	}
	componentDidMount() {
		window.addEventListener('resize', this._setTitlesHeight)
		this._setTitlesHeight()
	}
	componentWillUnmount() {
		clearInterval(this.karaokeInterval)
		clearInterval(this.titleInterval)
		window.removeEventListener('resize', this._setTitlesHeight)
	}

	_setTitlesHeight() {
		this.titleInterval = setInterval(() => {
			if ( !this.titleLeft || !this.titleRight || !this.videoWrapper) {
				return
			}
			if (this.videoWrapper.offsetHeight) {
				let fontSize = parseInt(this.titleLeft.style.fontSize) || 10,
					tolerance = 5,
					changeBy = 5,
					zooming = Math.abs(this.titleLeft.offsetWidth - this.videoWrapper.offsetHeight) > tolerance,
					zoomIn = this.titleLeft.offsetWidth + tolerance < this.videoWrapper.offsetHeight

				if (zooming) {
					this.titleLeft.style.fontSize = `${zoomIn ? fontSize + changeBy : fontSize - changeBy}px`
					this.titleRight.style.fontSize = `${zoomIn ? fontSize + changeBy : fontSize - changeBy}px`
				}
				else {
					clearInterval(this.titleInterval)
				}
			}

		}, 10)
	}
	_ytEnded(e) {
		e.target.playVideo()
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
		if (this.youtube && this.props.activeSlide === 0) {
			let currentTime = this.youtube.getCurrentTime(),
				newKaraoke = lyrics.reduce((res, line, i) => {
					if (currentTime >= line.duration.from && line.duration.to >= currentTime) {
						let classes = classNames('words', `words${i}`, line.className)
						res.push(<div key={i} className={classes}>{
							line.words.reduce((words, word, i) => {
								if (currentTime >= line.duration.from + line.duration.words * i) {
									let animationSource = word.animation || line.animation,
										text = word.text || word

									words.push(<Motion key={i} defaultStyle={animationSource.before} style={animationSource.after}>{
										style => (
											<span style={{
												...style,
												transform: `${typeof style.rotate !== 'undefined' ? `rotate(${style.rotate}deg)` : ``}${typeof style.scale !== 'undefined' ? ` scale(${style.scale})` : ``}`,
											}}>{text}</span>
										)
									}</Motion>)
								}
								return words
							}, [])
						}</div>)
					}
					return res
				}, [])

			this.setState({
				karaoke: newKaraoke
			})
		}
	}

	render() {
		const { translations: { mute, loud, raf }, ytState } = this.props
		let { isMuted, karaoke } = this.state

		return (
			<div className="Youtube">
				<div className={classNames('mute', { 'is-muted': isMuted })} onClick={() => this.muteToggle()}>
					<p>{isMuted ? loud : mute}</p>
					{isMuted ? <Unmute/> : <Mute/>}
				</div>
				{0 && this.youtube ? (
					<div style={{ position: 'absolute', zIndex: 2, bottom: '100%', backgroundColor: 'black', padding: 20, width: '100%', textAlign: 'center' }}>
						<span style={{ padding: 10 }}>{this.youtube && Math.round(this.youtube.getCurrentTime() * 100)/100}</span>
						<span onClick={() => this.youtube.pauseVideo()} style={{ padding: 10 }}>pause</span>
						<span onClick={() => this.youtube.playVideo()} style={{ padding: 10 }}>play</span>
						<span onClick={() => this.youtube.seekTo(32)} style={{ padding: 10 }}>seek</span>
					</div>
				) : ''}
				<div className="video-wrapper" ref={elm => this.videoWrapper = elm}>
					<ResponsiveRatio className="video" ratio={16/7}>
						<p ref={elm => this.titleLeft = elm} className={classNames('title', 'left')}>{raf}</p>
						<p ref={elm => this.titleRight = elm} className={classNames('title', 'right')}>{raf}</p>
						<div style={{ display: ytState === 1 ? 'block' : 'none' }} className="karaoke">{karaoke}</div>
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
	activeSlide: state.global.slider.activeSlide,
	ytState: state.global.youtube.state,
}))(Youtube)