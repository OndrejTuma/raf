import React from 'react'
import SVG from 'react-svg'
import Link from 'next/link'

import Hamburger from './Hamburger'

export default () =>
	<div className="header">
		<Link href="/">
			<a><SVG path="static/svg/logo-footshop.svg" className="logo-footshop" /></a>
		</Link>
		<Hamburger/>
		<SVG path="static/svg/logo-raf.svg" className="logo-raf" />
	</div>