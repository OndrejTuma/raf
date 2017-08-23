import React, { Component } from 'react'

import Carousel from './Carousel'

class Signature extends Component {

	componentWillMount() {
		const { translations: { key1, key2, key3, key4, fact1, fact2, fact3, fact4 } } = this.props

		this.slides = [
			{ key: key1, text: fact1, image: 'static/images/ozweego-bunny.jpg' },
			{ key: key2, text: fact2, image: 'static/images/ozweego-bunny.jpg' },
			{ key: key3, text: fact3, image: 'static/images/ozweego-bunny.jpg' },
			{ key: key4, text: fact4, image: 'static/images/ozweego-bunny.jpg' },
		]
	}

	render() {
		const { translations: { heading } } = this.props

		return (
			<div className={`Signature`}>
				<h2 className="heading">{heading}</h2>
				<Carousel slides={this.slides} reversed={true} />
			</div>
		)
	}
}

export default Signature