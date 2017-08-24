import React, { Component } from 'react'
import Head from 'next/head'
import Scroll from 'react-scroll'
import SVG from 'react-svg'
import { addTranslation, getTranslate, setLanguages, getActiveLanguage } from 'react-localize-redux'

import { nextConnect } from '../store'

import Header from '../components/Header'
import History from '../components/History'
import Languages from '../components/Languages'
import RafInFs from '../components/RafInFs'
import ScrollDown from '../components/ScrollDown'
import Signature from '../components/Signature'
import Socials from '../components/Socials'
import Youtube from '../components/Youtube'
import WhoIsRaf from '../components/WhoIsRaf'

import stylesheet from '../styles/index.scss'

import { defaultLang, langs, strings } from '../translations'

class Index extends Component {

    constructor(props) {
    	super(props)
		this.props.dispatch( setLanguages( langs, defaultLang  ) )
		this.props.dispatch( addTranslation( strings ) )
	}
	componentWillMount() {
		this.slides = {}
	}
	componentDidMount() {
		this.vh = this._getViewportHeight()
		this.scrollTop = this._getScrollTop()
		this.sliding = false
		this.duration = 1000

		Scroll.Events.scrollEvent.register('begin', function(to, element) {
			console.log("Scroll Event begin", arguments);
		});

		window.removeEventListener('scroll', this._handleScroll.bind(this))
		window.addEventListener('scroll', this._handleScroll.bind(this))
	}

	_preventDefault(e) {
		e.preventDefault()
		e.returnValue = false
	}
	_preventDefaultForScrollKeys(e) {
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		const keys = {37: 1, 38: 1, 39: 1, 40: 1}

		if (keys[e.keyCode]) {
			e.preventDefault()
			return false
		}
	}
	_getScrollTop() {
    	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}
	_getViewportHeight() {
    	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	}
	_handleScroll () {
		let scrollTop = this._getScrollTop()

		if (!this.sliding) {
			let nextSlide = scrollTop / this.vh

			if (nextSlide < 5 && nextSlide >= 0) {
				this.disableScrolling()
				this.sliding = true

				if (scrollTop > this.scrollTop) {
					this._slideTo(Math.ceil(nextSlide))
				}
				else {
					this._slideTo(Math.floor(nextSlide) ? Math.floor(nextSlide) - 1 : 0)
				}

				setTimeout(() => {
					this.sliding = false
					this.enableScrolling()
				}, this.duration + 1000)
			}
		}

		this.scrollTop = scrollTop
	}
	_slideTo (slide) {
    	console.log('sliding to', slide);
    	if ( ! this.slides[`slide${ slide + 1 }`]) {
    		return
		}

		const { animateScroll: scroll } = Scroll

		scroll.scrollTo(this.slides[`slide${ slide + 1 }`].offsetTop, {
			duration: this.duration
		})
	}

	disableScrolling () {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', this._preventDefault, false)
		}
		window.onwheel = this._preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = this._preventDefault; // older browsers, IE
		window.ontouchmove  = this._preventDefault; // mobile
		document.onkeydown  = this._preventDefaultForScrollKeys
	}
	enableScrolling () {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', this._preventDefault, false)
		}
		window.onmousewheel = document.onmousewheel = null
		window.onwheel = null
		window.ontouchmove = null
		document.onkeydown = null
	}
    render () {
    	const { translate } = this.props
		const { animateScroll: scroll } = Scroll

        return (
            <div>
                <Head>
                    <title>{translate('title')}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                	<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>
                <Header/>
				<div style={{ position: 'relative', zIndex: 2 }} onClick={() => { scroll.scrollTo(this.slides.slide2.offsetTop) }}>
					<ScrollDown translations={{
						scroll: translate('scroll'),
					}}/>
				</div>
				<div>
					<div className="Slide" ref={elm => this.slides.slide1 = elm}>
						<Languages/>
						<Youtube translations={{
							loud: translate('loud'),
							mute: translate('mute'),
							raf: translate('raf'),
						}}/>
					</div>
					<div className="Slide" ref={elm => this.slides.slide2 = elm}>
						<WhoIsRaf translations={{
							heading: translate('who'),
							about: translate('about'),
							interview: translate('interview'),
							cite: translate('cite1'),
						}}/>
					</div>
					<div className="Slide" ref={elm => this.slides.slide3 = elm}>
						<History translations={{
							heading: translate('history'),
							fact1: translate('1989'),
							fact2: translate('1995'),
							fact3: translate('2001'),
							fact4: translate('2006'),
							fact5: translate('2013'),
						}}/>
					</div>
					<div className="Slide" ref={elm => this.slides.slide4 = elm}>
						<Signature translations={{
							heading: translate('signature'),
							key1: translate('signKey1'),
							key2: translate('signKey2'),
							key3: translate('signKey3'),
							key4: translate('signKey4'),
							fact1: translate('sign1'),
							fact2: translate('sign2'),
							fact3: translate('sign3'),
							fact4: translate('sign4'),
						}}/>
					</div>
					<div className="Slide" ref={elm => this.slides.slide5 = elm}>
						<RafInFs translations={{
							heading: translate('RafInFs'),
							collection: translate('collection'),
							inFs: translate('inFs'),
						}}/>
						<Socials/>
						<p className="fst tac" style={{ width: '80%', lineHeight: 1, margin: '0 auto 2em' }}>{translate('foot')}</p>
						<div className="tac mbs">
							<SVG path="static/svg/logo-footshop.svg" className="logo-footshop bigger" />
						</div>
					</div>
				</div>
            </div>
        )
    }
}


export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
	currentLanguage: (state.locale && state.locale.languages.length) ? getActiveLanguage(state.locale) : '',
}))(Index)