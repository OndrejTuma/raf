import React from 'react'
import Head from 'next/head'

import Header from '../components/Header'
import stylesheet from '../styles/index.scss'

export default () =>
    <div>
        <Head>
            <title>RAF</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Header/>
    </div>
