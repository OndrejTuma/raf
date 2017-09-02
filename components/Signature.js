import React, { Component } from 'react'

import Carousel from './Carousel'

class Signature extends Component {

	render() {
		let { translations: { heading, key1, key2, key3, key4, fact1, fact2, fact3, fact4 } } = this.props
		let slides = [
			{ key: key1, text: fact1, image: 'static/images/signature/ozweego.jpg', responsive: {
				mobile: 'static/images/signature/ozweego_m.jpg',
				tablet: 'static/images/signature/ozweego_t.jpg',
				desktop: 'static/images/signature/ozweego_d.jpg',
			} },
			{ key: key2, text: fact2, image: 'static/images/signature/bunny.jpg', responsive: {
				mobile: 'static/images/signature/bunny_m.jpg',
				tablet: 'static/images/signature/bunny_t.jpg',
				desktop: 'static/images/signature/bunny_d.jpg',
			} },
			{ key: key3, text: fact3, image: 'static/images/signature/perry.jpg', responsive: {
				mobile: 'static/images/signature/perry_m.jpg',
			} },
			{ key: key4, text: fact4, image: 'static/images/signature/boots.jpg', responsive: {
				mobile: 'static/images/signature/boots_m.jpg',
			} },
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