import React from 'react'
import ReactSVG from 'react-svg'
import Link from 'next/link'

import Hamburger from './Hamburger'

export default () =>
	<div className="header">
		<Link href="/">
			<a><ReactSVG path="static/svg/footshop.svg" className="logo-footshop" /></a>
		</Link>
		<Hamburger/>
		<ReactSVG path="static/svg/raf.svg" className="logo-raf" />
	</div>