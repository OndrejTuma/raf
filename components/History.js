import React, {Component} from 'react'
import Slider from 'react-slick'

class History extends Component {

	componentWillMount() {
		const { translations: { fact1, fact2, fact3, fact4, fact5 } } = this.props

		this.slides = [
			{ year: 1989, text: fact1 },
			{ year: 1995, text: fact2 },
			{ year: 2001, text: fact3 },
			{ year: 2006, text: fact4 },
			{ year: 2013, text: fact5 },
		]

		this.sliderSettings = {
			customPaging: (i) => <span>{this.slides[i] ? this.slides[i].year : i+1}</span>,
			dots: true,
			dotsClass: 'slick-dots slick-thumb',
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}

	render() {
		const { translations: { heading } } = this.props

		return (
			<div className={`History`}>
				<h2 className="heading">{heading}</h2>
				<img src={`static/images/1989.jpg`} alt="1989" className="image"/>
				<Slider {...this.sliderSettings}>
					{this.slides.map((slide, i) => (
						<div key={i}>
							<p>{slide.text}</p>
						</div>
					))}
				</Slider>
			</div>
		)
	}
}

export default History