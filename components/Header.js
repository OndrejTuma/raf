import React from 'react'
import ReactSVG from 'react-svg'

import Hamburger from './Hamburger'

export default () =>
	<div className="header">
		<ReactSVG path="static/svg/footshop.svg" className="logo-footshop" />
		<Hamburger/>
		<ReactSVG path="static/svg/raf.svg" className="logo-raf" />
	</div>