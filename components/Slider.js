import React, { Component } from 'react'
import { Events, scrollSpy, scroller } from 'react-scroll'
import classNames from 'classnames'

import {setActiveSlide} from '../redux/actions'
import {nextConnect} from '../store'

import ScrollDown from './ScrollDown'

class Slider extends Component {

	constructor (props) {
		super(props)

		this._handleScroll = this._handleScroll.bind(this)
		this._handleTouch = this._handleTouch.bind(this)
		this._handleScrollEnd = this._handleScrollEnd.bind(this)
	}
	componentDidMount() {
		const { children } = this.props

		this.isSliding = false
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
	}
	componentWillUnmount() {
		Events.scrollEvent.remove('begin')
		Events.scrollEvent.remove('end')

		this._deactivateScrollListening()
	}

	_activateScrollListening() {
		if (typeof window !== 'undefined') {
			//window.addEventListener('scroll', this._handleScroll, true)
			window.addEventListener('touchmove', this._handleTouch)
			window.addEventListener('wheel', this._handleScroll)
		}
	}
	_deactivateScrollListening() {
		if (typeof window !== 'undefined') {
			//window.removeEventListener('scroll', this._handleScroll)
			window.removeEventListener('touchmove', this._handleTouch)
			window.removeEventListener('wheel', this._handleScroll)
		}
	}
	_getScrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}
	_getViewportHeight() {
		return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	}
	_handleTouch(e) {
		if (e.touches.length && !this.isSliding) {
			let touch = e.touches[0]

			if (this.lastTouchY) {
				let scrollDown = this.lastTouchY > touch.clientY
				this._nextSlide(scrollDown)
			}
			this.lastTouchY = touch.clientY
		}
	}
	_handleScroll(e) {
		console.log(e)
		let scrollDown = e.deltaY > 0

		if (!this.isSliding) {
			this._nextSlide(scrollDown)
		}
	}
	_nextSlide(scrollDown = true) {
		if (this.isSliding) {
			return
		}

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
	_handleScrollClick(e) {
		e.preventDefault()
		const {activeSlide, dispatch} = this.props

		dispatch(setActiveSlide(1, activeSlide))
	}
	_handleScrollEnd(to, element) {
		if (!to) {
			return
		}

		let { previousSlide } = this.props,
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
				this.isSliding = false
				this.lastTouchY = null
				this._activateScrollListening()
				clearTimeout(this.slidingTimeout)
				this.slidingTimeout = 0
			}, 500)
		}
	}

	slideTo(slide) {
		// client-side only
		if (typeof window !== 'undefined' && ! this.isSliding) {
			this.isSliding = true
			this._deactivateScrollListening()
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
	activeSlide: state.global.slider.activeSlide,
	previousSlide: state.global.slider.previousSlide,
}))(Slider)