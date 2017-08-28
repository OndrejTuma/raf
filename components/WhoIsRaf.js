import React from 'react'
import {Motion, spring} from 'react-motion'

import {nextConnect} from '../store'

import Cites from './Cites'

const WhoIsRaf = ({
	activeSlide,
	cites,
	translations: { heading, about, interview },
}) => {
	return (
		<div className="who-is-raf">
			<h2 className="heading">{heading}</h2>
			<div className="relative">
				<img src={`static/images/raf-bio.jpg`} alt="Raf Simons" className="image"/>
				<div className="content">
					<p>
						{about}<br/>
						<a href="#" className="link">{interview}</a>
					</p>

					{activeSlide === 1 ? (
						<Cites data={cites}/>
					) : ''}
				</div>
			</div>
		</div>
	)
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
}))(WhoIsRaf)