import React, { Component } from 'react'
import Head from 'next/head'
import { addTranslation, getTranslate, setLanguages, getActiveLanguage } from 'react-localize-redux'

import { nextConnect } from '../store'

import Header from '../components/Header'
import History from '../components/History'
import Languages from '../components/Languages'
import Scroll from '../components/Scroll'
import Signature from '../components/Signature'
import Slide from '../components/Slide'
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

    render () {
    	const { translate } = this.props

        return (
            <div>
                <Head>
                    <title>RAF</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                	<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>
                <Header/>
				<Scroll translations={{
					scroll: translate('scroll'),
				}}/>
				<div>
					<Slide>
						<Languages/>
						<Youtube translations={{
							loud: translate('loud'),
							mute: translate('mute'),
							raf: translate('raf'),
						}}/>
					</Slide>
					<Slide>
						<WhoIsRaf translations={{
							heading: translate('who'),
							about: translate('about'),
							interview: translate('interview'),
							cite: translate('cite1'),
						}}/>
					</Slide>
					<Slide>
						<History translations={{
							heading: translate('history'),
							fact1: translate('1989'),
							fact2: translate('1995'),
							fact3: translate('2001'),
							fact4: translate('2006'),
							fact5: translate('2013'),
						}}/>
					</Slide>
					<Slide>
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
					</Slide>
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