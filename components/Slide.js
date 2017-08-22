import React from 'react'

const Slide = props =>  {
	return (
		<div className={'Slide'.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)}>
			<p>Component Slide</p>
		</div>
	)
}

export default Slide