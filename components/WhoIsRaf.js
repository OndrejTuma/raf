import React from 'react'

import {nextConnect} from '../store'

import Cites from './Cites'

const WhoIsRaf = ({
	activeSlide,
	cites,
	translations: { heading, about, interview },
}) => {
	return (
		<div className="who-is-raf">
			<h2 className="animate-heading">{heading}</h2>
			<div className="info">
				<div className="animate-image">
					<img src={`static/images/raf-bio.jpg`} alt="Raf Simons"/>
				</div>
				<div className="animate-content">
					<p>
						{about}<br/>
						<a href="https://www.nytimes.com/2016/03/06/t-magazine/raf-simons-interview.html?mcubz=0" target="_blank" className="link">{interview}</a>
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