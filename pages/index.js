import React, {Component} from 'react'
import Head from 'next/head'
import {addTranslation, getActiveLanguage, getTranslate, setActiveLanguage, setLanguages} from 'react-localize-redux'
import FacebookProvider, { Like } from 'react-facebook'

import {nextConnect} from '../store'
import {setIsMobile} from '../redux/actions'

import Footer from '../components/Footer'
import GoogleTagManager from '../components/GoogleTagManager'
import Header from '../components/Header'
import History from '../components/History'
import Languages from '../components/Languages'
import Lyrics from '../components/Lyrics'
import Menu from '../components/Menu'
import RafInFs from '../components/RafInFs'
import Signature from '../components/Signature'
import Slider from '../components/Slider'
import Socials from '../components/Socials'
import TurnDevice from '../components/TurnDevice'
import Youtube from '../components/Youtube'
import WhoIsRaf from '../components/WhoIsRaf'

import stylesheet from '../styles/index.scss'

import {defaultLang, langs, strings} from '../translations'

class Index extends Component {

	constructor(props) {
		super(props)

		this._setIsMobile = this._setIsMobile.bind(this)

		this.mobileBreakpoint = 1000
	}
	componentWillMount() {
		const { dispatch, url: { query: { lang } } } = this.props

		dispatch(setLanguages(langs, lang === 'en' ? lang : defaultLang))
		dispatch(addTranslation(strings))
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
		let heads = {
			title: translate('head.title'),
			url: "https://raf.footshop.cz/",
			img: "https://raf.footshop.cz/static/images/og-image.jpg",
		}

		return (
			<div>
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<meta property="og:title" content={`Raf Simons sneakers`} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={heads.url} />
					<meta property="og:image" content={heads.img} />
					<style dangerouslySetInnerHTML={{__html: stylesheet}}/>
					<title>{heads.title}</title>
					<meta name="description" content={translate('head.desc')}/>
					<meta name="keywords" content={translate('head.keywords')}/>
					<link rel='icon' href='/static/favicon.ico' />
				</Head>

				<GoogleTagManager gtmId={`GTM-594JXKN`} />

				<Header/>

				<Lyrics/>

				<Menu items={[
					{name: translate('menu.first'), anchor: 'slide0'},
					{name: translate('menu.second'), anchor: 'slide1'},
					{name: translate('menu.third'), anchor: 'slide2'},
					{name: translate('menu.fourth'), anchor: 'slide3'},
					{name: translate('menu.fifth'), anchor: 'slide4'},
				]} />

				<TurnDevice text={translate('turnDevice')}/>

				<Slider translations={{ scroll: translate('slides.home.scroll') }}>
					<div className="intro">
						<Languages translations={{
							lang: translate('slides.home.lang'),
						}}/>
						<FacebookProvider appId="737738779689385">
							<Like className="facebook-like" href={heads.url} layout="button"/>
						</FacebookProvider>
						<Youtube translations={{
							loud: translate('slides.home.loud'),
							mute: translate('slides.home.mute'),
							raf: translate('slides.home.raf'),
						}}/>
					</div>
					<div>
						<WhoIsRaf heading={translate('slides.who.heading')} translations={{
							about: translate('slides.who.about'),
							interview: translate('slides.who.interview'),
						}} cites={[
							{ text: translate('slides.who.cites.first.text'), author: translate('slides.who.cites.first.author') },
							{ text: translate('slides.who.cites.second.text'), author: translate('slides.who.cites.second.author') },
						]}/>
					</div>
					<div>
						<History heading={translate('slides.history.heading')} translations={{
							carousel1: { key: 1989, text: translate('slides.history.carousel.first.text') },
							carousel2: { key: 1995, text: translate('slides.history.carousel.second.text') },
							carousel3: { key: 2001, text: translate('slides.history.carousel.third.text') },
							carousel4: { key: 2006, text: translate('slides.history.carousel.fourth.text') },
							carousel5: { key: 2013, text: translate('slides.history.carousel.fifth.text') },
						}}/>
					</div>
					<div>
						<Signature heading={translate('slides.signature.heading')} translations={{
							carousel1: { key: translate('slides.signature.carousel.first.key'), text: translate('slides.signature.carousel.first.text') },
							carousel2: { key: translate('slides.signature.carousel.second.key'), text: translate('slides.signature.carousel.second.text') },
							carousel3: { key: translate('slides.signature.carousel.third.key'), text: translate('slides.signature.carousel.third.text') },
							carousel4: { key: translate('slides.signature.carousel.fourth.key'), text: translate('slides.signature.carousel.fourth.text') },
						}}/>
					</div>
					<div>
						<RafInFs heading={translate('slides.rafInFs.heading')} translations={{
							collection: translate('slides.rafInFs.collection'),
							collectionLink: translate('slides.rafInFs.collectionLink'),
							inFs: translate('slides.rafInFs.inFs'),
						}}/>
						<Socials translations={{
							linkFb: translate('Socials.facebook'),
							linkTw: translate('Socials.twitter'),
							linkIt: translate('Socials.instagram'),
							linkSc: translate('Socials.snapchat'),
							linkYt: translate('Socials.youtube'),
						}}/>
					</div>
					<div>
						<Footer translations={{
							footshopUrl: translate('slides.footer.logoUrl'),
							link: translate('slides.footer.textLinkUrl'),
							linkText: translate('slides.footer.textLink'),
							text: translate('slides.footer.text'),
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