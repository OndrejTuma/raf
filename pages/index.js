import React, { Component } from 'react'
import Head from 'next/head'

import { nextConnect } from '../store'

import Header from '../components/Header'
import stylesheet from '../styles/index.scss'

class Index extends Component {
    render () {
        return (
            <div>
                <Head>
                    <title>RAF</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Header/>
            </div>
        )
    }
}


export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
}))(Index)