import React, { Component } from 'react'

import Carousel from './Carousel'

class Signature extends Component {

	render() {
		let { translations: { heading, key1, key2, key3, key4, fact1, fact2, fact3, fact4 } } = this.props
		let slides = [
			{ key: key1, text: fact1, image: 'static/images/signature/ozweego.jpg' },
			{ key: key2, text: fact2, image: 'static/images/signature/bunny.jpg' },
			{ key: key3, text: fact3, image: 'static/images/signature/perry.jpg' },
			{ key: key4, text: fact4, image: 'static/images/signature/boots.jpg' },
		]

		return (
			<div className={`Signature`}>
				<h2 className="animate-heading">{heading}</h2>
				<div className="animate-content">
					<Carousel slides={slides} reversed={true} />
				</div>
			</div>
		)
	}
}

export default Signature