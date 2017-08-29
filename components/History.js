import React, {Component} from 'react'

import Carousel from './Carousel'

class History extends Component {

	render() {
		let { translations: { heading, fact1, fact2, fact3, fact4, fact5 } } = this.props
		let slides = [
			{ key: 1989, text: fact1, image: 'static/images/history/1989.jpg' },
			{ key: 1995, text: fact2, image: 'static/images/history/1995.jpg' },
			{ key: 2001, text: fact3, image: 'static/images/history/2001.jpg' },
			{ key: 2006, text: fact4, image: 'static/images/history/2006.jpg' },
			{ key: 2013, text: fact5, image: 'static/images/history/2013.jpg' },
		]

		return (
			<div className={`History`}>
				<h2 className="animate-heading">{heading}</h2>
				<div className="animate-content">
					<Carousel slides={slides} hasCounter="1" />
				</div>
			</div>
		)
	}
}

export default History