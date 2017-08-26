import React from 'react'
import SVG from 'react-svg'

import LogoFootshop from './LogoFootshop'

export default () =>
	<div className="header">
		<LogoFootshop/>
		<SVG path="static/svg/logo-raf.svg" className="logo-raf" />
	</div>