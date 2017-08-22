import React from 'react'
import ReactSVG from 'react-svg'

const Scroll = () =>
	<div className="scroll">
		<ReactSVG path="static/svg/mouse.svg" className="mouse" />
		<ReactSVG path="static/svg/mouse-down.svg" className="arrow" />
	</div>

export default Scroll