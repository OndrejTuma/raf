import React from 'react'

import Cites from './Cites'

const WhoIsRaf = ({
	activeSlide,
	cites,
	translations: { heading, about, interview },
}) => {
	return (
		<div className="who-is-raf">
			<h2 className="heading">{heading}</h2>
			<img src={`static/images/raf-bio.jpg`} alt="Raf Simons" className="image"/>
			<div className="content">
				<p>
					{about}<br/>
					<a href="#">{interview}</a>
				</p>

				{activeSlide === 1 ? (
					<Cites data={cites}/>
				) : ''}
			</div>
		</div>
	)
}

export default WhoIsRaf