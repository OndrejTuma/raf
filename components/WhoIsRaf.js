import React from 'react'

const WhoIsRaf = ({
	translations: { heading, about, interview, cite }
}) => {
	return (
		<div className="who-is-raf">
			<h2 className="heading">{heading}</h2>
			<img src={`static/images/raf-bio.jpg`} alt="Raf Simons" className="image"/>
			<p>{about}</p>
			<a href="#">{interview}</a>
			<blockquote>{cite}</blockquote>
		</div>
	)
}

export default WhoIsRaf