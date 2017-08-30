import React, {Component} from 'react'
import Head from 'next/head'
import {addTranslation, getTranslate, setLanguages, getActiveLanguage} from 'react-localize-redux'

import {nextConnect} from '../store'
import {setIsMobile} from '../redux/actions'

import Footer from '../components/Footer'
import Header from '../components/Header'
import History from '../components/History'
import Languages from '../components/Languages'
import Lyrics from '../components/Lyrics'
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
		const {translate, activeSlide, isMobile} = this.props

		return (
			<div>
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<title>{translate('title')}</title>
					<meta name="description" content={translate('desc')}/>
					<meta name="keywords" content={translate('keywords')}/>
					<link rel='icon' href='/static/favicon.ico' />
				</Head>

				<Header/>

				<Lyrics/>

				<Menu items={[
					{name: translate('menu1'), anchor: 'slide0'},
					{name: translate('menu2'), anchor: 'slide1'},
					{name: translate('menu3'), anchor: 'slide2'},
					{name: translate('menu4'), anchor: 'slide3'},
					{name: translate('menu5'), anchor: 'slide4'},
				]} />

				<Slider translations={{ scroll: translate('scroll') }}>
					<div className="intro">
						<Languages translations={{
							lang: translate('lang'),
						}}/>
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
							collectionLink: translate('collectionLink'),
							inFs: translate('inFs'),
						}}/>
						<Socials translations={{
							linkFb: translate('linkFb'),
							linkTw: translate('linkTw'),
							linkIt: translate('linkIt'),
							linkSc: translate('linkSc'),
							linkYt: translate('linkYt'),
						}}/>
					</div>
					<div>
						<Footer translations={{
							footshoUrl: translate('footLogoUrl'),
							link: translate('footLinkUrl'),
							linkText: translate('footLink'),
							text: translate('foot'),
						}}/>
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