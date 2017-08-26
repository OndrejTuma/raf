import React, {Component} from 'react'
import Head from 'next/head'
import SVG from 'react-svg'
import {addTranslation, getTranslate, setLanguages, getActiveLanguage} from 'react-localize-redux'

import {nextConnect} from '../store'
import {setIsMobile} from '../redux/actions'

import Header from '../components/Header'
import History from '../components/History'
import Languages from '../components/Languages'
import Menu from '../components/Menu'
import RafInFs from '../components/RafInFs'
import Signature from '../components/Signature'
import Slider from '../components/Slider'
import Socials from '../components/Socials'
import Youtube from '../components/Youtube'
import WhoIsRaf from '../components/WhoIsRaf'

import stylesheet from '../styles/index.scss'

import {defaultLang, langs, strings} from '../translations'

class Index extends Component {

	constructor(props) {
		super(props)
		this.props.dispatch(setLanguages(langs, defaultLang))
		this.props.dispatch(addTranslation(strings))

		this._setIsMobile = this._setIsMobile.bind(this)

		this.mobileBreakpoint = 1000
	}
	componentDidMount() {
		this._setIsMobile()

		window.addEventListener('resize', this._setIsMobile)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this._setIsMobile)
	}

	_setIsMobile () {
		const { isMobile } = this.props

		let currentIsMobile = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < this.mobileBreakpoint

		if (isMobile != currentIsMobile) {
			this.props.dispatch(setIsMobile(currentIsMobile))
		}
	}

	render() {
		const {translate, activeSlide} = this.props

		return (
			<div>
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<title>{translate('title')}</title>
				</Head>

				<Header/>

				<Menu translations={{
					item1: translate('menu1'),
					item2: translate('menu2'),
					item3: translate('menu3'),
					item4: translate('menu4'),
					item5: translate('menu5'),
				}} />

				<Slider translations={{ scroll: translate('scroll') }}>
					<div className="relative">
						<Languages/>
						<Youtube translations={{
							loud: translate('loud'),
							mute: translate('mute'),
							raf: translate('raf'),
						}}/>
					</div>
					<div>
						<WhoIsRaf activeSlide={activeSlide} translations={{
							heading: translate('who'),
							about: translate('about'),
							interview: translate('interview'),
						}} cites={[
							{ text: translate('cite1'), author: translate('author1') },
							{ text: translate('cite2'), author: translate('author2') },
						]}/>
					</div>
					<div>
						<History translations={{
							heading: translate('history'),
							fact1: translate('1989'),
							fact2: translate('1995'),
							fact3: translate('2001'),
							fact4: translate('2006'),
							fact5: translate('2013'),
						}}/>
					</div>
					<div>
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
					<div>
						<RafInFs translations={{
							heading: translate('RafInFs'),
							collection: translate('collection'),
							inFs: translate('inFs'),
						}}/>
						<Socials/>
						<p className="fst tac" style={{width: '80%', lineHeight: 1, margin: '0 auto 2em'}}>{translate('foot')}</p>
						<div className="tac mbs">
							<SVG path="static/svg/logo-footshop.svg" className="logo-footshop bigger"/>
						</div>
					</div>
				</Slider>
			</div>
		)
	}
}


export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {},
	currentLanguage: (state.locale && state.locale.languages.length) ? getActiveLanguage(state.locale) : '',
}))(Index)