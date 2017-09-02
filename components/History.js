import React, {Component} from 'react'

import Carousel from './Carousel'

class History extends Component {

	render() {
		let { translations: { heading, fact1, fact2, fact3, fact4, fact5 } } = this.props
		let slides = [
			{ key: 1989, text: fact1, image: 'static/images/history/1989.jpg', responsive: {
				mobile: 'static/images/history/1989_m.jpg',
				tablet: 'static/images/history/1989_t.jpg',
				desktop: 'static/images/history/1989_d.jpg',
			} },
			{ key: 1995, text: fact2, image: 'static/images/history/1995.jpg', responsive: {
				mobile: 'static/images/history/1995_m.jpg',
				tablet: 'static/images/history/1995_t.jpg',
				desktop: 'static/images/history/1995_d.jpg',
			} },
			{ key: 2001, text: fact3, image: 'static/images/history/2001.jpg', responsive: {
				mobile: 'static/images/history/2001_m.jpg',
			} },
			{ key: 2006, text: fact4, image: 'static/images/history/2006.jpg', responsive: {
				mobile: 'static/images/history/2006_m.jpg',
				tablet: 'static/images/history/2006_t.jpg',
				desktop: 'static/images/history/2006_d.jpg',
			} },
			{ key: 2013, text: fact5, image: 'static/images/history/2013.jpg', responsive: {
				mobile: 'static/images/history/2013_m.jpg',
				tablet: 'static/images/history/2013_t.jpg',
				desktop: 'static/images/history/2013_d.jpg',
			} },
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