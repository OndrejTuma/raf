import React from 'react'
import SVG from 'react-svg'
import Link from 'next/link'

export default () =>
	<div className="header">
		<Link href="/">
			<a><SVG path="static/svg/logo-footshop.svg" className="logo-footshop" /></a>
		</Link>
		<SVG path="static/svg/logo-raf.svg" className="logo-raf" />
	</div>