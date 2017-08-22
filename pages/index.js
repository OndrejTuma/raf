import React, { Component } from 'react'
import Head from 'next/head'
import { addTranslation, getTranslate, setLanguages, getActiveLanguage } from 'react-localize-redux'

import { nextConnect } from '../store'

import Header from '../components/Header'
import Languages from '../components/Languages'
import Scroll from '../components/Scroll'
import Youtube from '../components/Youtube'
import stylesheet from '../styles/index.scss'
import { defaultLang, langs, strings } from '../translations'

class Index extends Component {

    constructor(props) {
    	super(props)
		this.props.dispatch( setLanguages( langs, defaultLang  ) )
		this.props.dispatch( addTranslation( strings ) )
	}

    render () {
        return (
            <div>
                <Head>
                    <title>RAF</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                	<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>
                <Header/>
				<Languages/>
				<Youtube/>
				<Scroll/>
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