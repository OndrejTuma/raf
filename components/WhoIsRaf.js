import React from 'react'
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image'

import {nextConnect} from '../store'
import {paths} from '../configs'

import Cites from './Cites'

const WhoIsRaf = ({
	activeSlide,
	cites,
	heading,
	translations: { about, interview },
}) => {
	return (
		<div className="who-is-raf">
			<h2 className="animate-heading">{heading}</h2>
			<div className="info">
				<div className="animate-image">
					<ResponsiveImage alt="Raf Simons">
						<ResponsiveImageSize
							default
							minWidth={0}
							path={`${paths.images}raf-bio_w300.jpg`}
						/>
						<ResponsiveImageSize
							minWidth={500}
							path={`${paths.images}raf-bio_w500.jpg`}
						/>
						<ResponsiveImageSize
							minWidth={1300}
							path={`${paths.images}raf-bio.jpg`}
						/>
					</ResponsiveImage>
				</div>
				<div className="animate-content">
					<p>
						{about}<br/>
						<a href="https://www.nytimes.com/2016/03/06/t-magazine/raf-simons-interview.html?mcubz=0" target="_blank" className="link">{interview}</a>
					</p>
				</div>
				{activeSlide === 1 ? (
					<Cites data={cites}/>
				) : ''}
			</div>
		</div>
	)
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
}))(WhoIsRaf)