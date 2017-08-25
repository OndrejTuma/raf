import React, { Component } from 'react'
import classNames from 'classnames'
import { Events, scrollSpy, scroller } from 'react-scroll'

import {setActiveSlide} from '../redux/actions'
import {nextConnect} from '../store'

import ScrollDown from './ScrollDown'

class Slider extends Component {

	componentDidMount() {
		this.scroller.vh = this._getViewportHeight()
		this.scroller.scrollTop = this._getScrollTop()
		this.scroller.activeSlide = Math.round(this.scroller.scrollTop / this.scroller.vh)

		Events.scrollEvent.register('begin', (to, element) => {

		})
		Events.scrollEvent.register('end', (to, element) => {
			if (!to) {
				return
			}

			let slide = to.match(/\d+/) ? parseInt(to.match(/\d+/)[0]) : null

			if (slide >= 0) {
				let oldSlide = this.scroller.direction > 0 ? slide + 1 : slide - 1,
					oldElement = document.getElementById(`slide${oldSlide}`)

				element.classList.add('active')

				if (oldElement) {
					oldElement.classList.remove('active')
				}
			}
			setTimeout(() => this.scroller.isSliding = false, 100)
		})
		scrollSpy.update()

		//window.addEventListener('scroll', this._handleScroll.bind(this))
	}
	componentWillMount() {
		this.scroller = {
			isSliding: false,
			direction: 0,
			duration: 1000,
			prevSlide: null,
			slides: 0,
		}
		this.scroller.settings = {
			duration: this.scroller.duration,
			ignoreCancelEvents: true,
			smooth: true,
		}
	}
	componentWillUnmount() {
		Events.scrollEvent.remove('begin')
		Events.scrollEvent.remove('end')
		//window.removeEventListener('scroll', this._handleScroll.bind(this))
	}

	_getScrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}
	_getViewportHeight() {
		return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	}
	_handleScroll() {
		let scrollTop = this._getScrollTop()

		if (!this.scroller.isSliding) {
			let currentSlide = Math.round(scrollTop / this.scroller.vh)

			// scroll down
			if (scrollTop > this.scroller.scrollTop) {
				this.scroller.direction = -1

				if (this.scroller.activeSlide < this.scroller.slides - 1) {
					this.scroller.isSliding = true
					this.scroller.activeSlide = currentSlide + 1
					this.slideTo(this.scroller.activeSlide)
				}
			}
			// scroll up
			else {
				this.scroller.direction = 1

				if (this.scroller.activeSlide > 0) {
					this.scroller.isSliding = true
					this.scroller.activeSlide = currentSlide - 1
					this.slideTo(this.scroller.activeSlide)
				}
			}

console.log('scrolling', scrollTop, this.scroller.scrollTop, this.scroller.direction > 0 ? 'up' : 'down');
		}
		this.scroller.scrollTop = scrollTop
	}
	_handleScrollClick(e) {
		const { global: { slider: { activeSlide } } } = this.props
		e.preventDefault()
		this.props.dispatch(setActiveSlide(1, activeSlide))
	}

	slideTo(slide) {
		scroller.scrollTo(`slide${slide}`, this.scroller.settings)
	}
	render() {
		const { children, global: { slider: { activeSlide } }, translations: { scroll } } = this.props
		this.scroller.slides = children.length

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
	global: state.global
}))(Slider)