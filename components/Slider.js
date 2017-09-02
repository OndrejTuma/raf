import React, { Component } from 'react'
import { Events, scrollSpy, scroller } from 'react-scroll'
import classNames from 'classnames'

import {setActiveSlide,setIsSliding} from '../redux/actions'
import {nextConnect} from '../store'

import ScrollDown from './ScrollDown'

class Slider extends Component {

	constructor (props) {
		super(props)

		this._handleKeyDown = this._handleKeyDown.bind(this)
		this._handleResize = this._handleResize.bind(this)
		this._handleScroll = this._handleScroll.bind(this)
		this._handleTouch = this._handleTouch.bind(this)
		this._handleScrollEnd = this._handleScrollEnd.bind(this)
		this._handleScrollStart = this._handleScrollStart.bind(this)

		this.duration = 1000
		this.scrollerSettings = {
			duration: this.duration,
			ignoreCancelEvents: true,
			smooth: true,
		}
	}
	componentDidMount() {
		this.slides = this.props.children.length

		Events.scrollEvent.register('begin', this._handleScrollStart)
		Events.scrollEvent.register('end', this._handleScrollEnd)
		scrollSpy.update()

		this._activateScrollListening()

		window.addEventListener('resize', this._handleResize)
	}
	componentWillUnmount() {
		Events.scrollEvent.remove('begin')
		Events.scrollEvent.remove('end')

		this._deactivateScrollListening()

		window.removeEventListener('resize', this._handleResize)
	}

	_activateScrollListening() {
		if (typeof window !== 'undefined') {
			//window.addEventListener('scroll', this._handleScroll, true)
			window.addEventListener('touchmove', this._handleTouch)
			window.addEventListener('wheel', this._handleScroll)
			window.addEventListener('keydown', this._handleKeyDown)
		}
	}
	_deactivateScrollListening() {
		if (typeof window !== 'undefined') {
			//window.removeEventListener('scroll', this._handleScroll)
			window.removeEventListener('touchmove', this._handleTouch)
			window.removeEventListener('wheel', this._handleScroll)
			window.removeEventListener('keydown', this._handleKeyDown)
		}
	}
	_handleKeyDown(e) {
		let keyCode = e.keyCode

		// spacebar, page down, arrow down
		if ([32, 34, 40].indexOf(keyCode) >= 0) {
			this._nextSlide(true)
		}
		// page up, arrow up
		else if ([33, 38].indexOf(keyCode) >= 0) {
			this._nextSlide(false)
		}
		else {
			// home, end
			if ([35, 36].indexOf(keyCode) >= 0) {
				let slide = keyCode === 35 ? this.slides - 1 : 0

				this._setSlide(slide)
			}
		}
	}
	_handleResize() {
		const { activeSlide } = this.props

		this.slideTo(activeSlide)
	}
	_handleScroll(e) {
		e.preventDefault()
		let scrollDown = e.deltaY > 0

		if (!this.props.isSliding) {
			this._nextSlide(scrollDown)
		}
	}
	_handleTouch(e) {
		e.preventDefault()
		if (e.touches.length && !this.props.isSliding) {
			let touch = e.touches[0]

			if (this.lastTouchY) {
				let scrollDown = this.lastTouchY > touch.clientY
				this._nextSlide(scrollDown)
			}
			this.lastTouchY = touch.clientY
		}
	}
	_handleScrollClick(e) {
		e.preventDefault()

		this._nextSlide(true)
	}
	_handleScrollEnd() {
		let { dispatch, isSliding } = this.props

		if (isSliding) {
			dispatch(setIsSliding(false))
		}
		this._activateScrollListening()
		this.lastTouchY = null
	}
	_handleScrollStart() {}
	_nextSlide(scrollDown = true) {
		let { activeSlide, dispatch } = this.props,
			nextSlide

		if (scrollDown && activeSlide < this.slides - 1) {
			nextSlide = activeSlide + 1
		}
		else if (!scrollDown && activeSlide > 0) {
			nextSlide = activeSlide - 1
		}

		if (nextSlide >= 0) {
			this._setSlide(nextSlide)
		}
	}
	_setSlide(slide) {
		this.slideTo(slide)
		this.props.dispatch(setActiveSlide(slide))
	}


	slideTo(slide) {
		const { activeSlide, dispatch, isSliding } = this.props

		// client-side only
		if (typeof window !== 'undefined') {
			let willBeSliding = slide != activeSlide

			if (typeof isSliding === 'undefined') {
				dispatch(setIsSliding(willBeSliding))
			}
			else if (!isSliding && willBeSliding) {
				dispatch(setIsSliding(true))
				this._deactivateScrollListening()
			}

			scroller.scrollTo(`slide${slide}`, this.scrollerSettings)
		}
	}
	render() {
		const { children, activeSlide, isSliding, translations: { scroll } } = this.props

		this.slideTo(activeSlide)

		return (
			<div>
				<div style={{position: 'relative', zIndex: 2}} onClick={ e => this._handleScrollClick(e) }>
					<ScrollDown translations={{ scroll }} />
				</div>
				<div className={`Slider`}>
					{children.map((slide, i) => {
						return (
							<div className={classNames('slide', { active: activeSlide === i && !isSliding })} id={`slide${i}`} key={i}>
								{slide}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isSliding: state.global.isSliding,
	activeSlide: state.global.slider.activeSlide,
}))(Slider)