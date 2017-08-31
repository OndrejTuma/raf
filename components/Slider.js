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
	}
	componentDidMount() {
		const { children } = this.props

		this.lastScrollTop = this._getScrollTop()
		this.duration = 1000
		this.scrollerSettings = {
			duration: this.duration,
			ignoreCancelEvents: true,
			smooth: true,
		}
		this.slides = children.length
		this.slidingTimeout = 0

		Events.scrollEvent.register('begin', (to, element) => {} )
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
	_getScrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}
	_getViewportHeight() {
		return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
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
				const { dispatch, activeSlide } = this.props
				let slide = keyCode === 35 ? this.slides - 1 : 0

				this.slideTo(slide)
				dispatch(setActiveSlide(slide, activeSlide))
			}
		}
	}
	_handleResize(e) {
		const { activeSlide } = this.props

		this.slideTo(activeSlide)
	}
	_handleScroll(e) {
		let scrollDown = e.deltaY > 0

		if (!this.props.isSliding) {
			this._nextSlide(scrollDown)
		}
	}
	_handleTouch(e) {
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
	_handleScrollEnd(to, element) {
		let { dispatch, isSliding, previousSlide } = this.props,
			slide = to.match(/\d+/) ? parseInt(to.match(/\d+/)[0]) : null

		if (slide >= 0) {
			element.classList.add('active')

			let oldElement = document.getElementById(`slide${previousSlide}`)
			if (oldElement) {
				oldElement.classList.remove('active')
			}
		}
		if ( ! this.slidingTimeout) {
			this.slidingTimeout = setTimeout(() => {
				clearTimeout(this.slidingTimeout)
				this.lastTouchY = null
				this.slidingTimeout = 0
				if (isSliding) {
					dispatch(setIsSliding(false))
				}
				this._activateScrollListening()
			}, 500)
		}
	}
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
			this.slideTo(nextSlide)
			dispatch(setActiveSlide(nextSlide, activeSlide))
		}
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
		const { children, activeSlide, translations: { scroll } } = this.props

		this.slideTo(activeSlide)

		return (
			<div>
				<div style={{position: 'relative', zIndex: 2}} onClick={ e => this._handleScrollClick(e) }>
					<ScrollDown translations={{ scroll }} />
				</div>
				<div className={`Slider`}>
					{children.map((slide, i) => {
						return (
							<div className={`slide`} id={`slide${i}`} key={i}>
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
	previousSlide: state.global.slider.previousSlide,
}))(Slider)