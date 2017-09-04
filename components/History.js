import React, {Component} from 'react'

import Carousel from './Carousel'

class History extends Component {

	render() {
		let { heading, translations: { carousel1, carousel2, carousel3, carousel4, carousel5 } } = this.props
		let slides = [
			{ key: carousel1.key, text: carousel1.text, image: 'static/images/history/1989.jpg', responsive: {
				mobile: 'static/images/history/1989_m.jpg',
				tablet: 'static/images/history/1989_t.jpg',
				desktop: 'static/images/history/1989_d.jpg',
			} },
			{ key: carousel2.key, text: carousel2.text, image: 'static/images/history/1995.jpg', responsive: {
				mobile: 'static/images/history/1995_m.jpg',
				tablet: 'static/images/history/1995_t.jpg',
				desktop: 'static/images/history/1995_d.jpg',
			} },
			{ key: carousel3.key, text: carousel3.text, image: 'static/images/history/2001.jpg', responsive: {
				mobile: 'static/images/history/2001_m.jpg',
			} },
			{ key: carousel4.key, text: carousel4.text, image: 'static/images/history/2006.jpg', responsive: {
				mobile: 'static/images/history/2006_m.jpg',
				tablet: 'static/images/history/2006_t.jpg',
				desktop: 'static/images/history/2006_d.jpg',
			} },
			{ key: carousel5.key, text: carousel5.text, image: 'static/images/history/2013.jpg', responsive: {
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