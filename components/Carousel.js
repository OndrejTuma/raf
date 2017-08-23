import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import CountUp from 'countup.js'

class Carousel extends Component {
	componentWillMount() {
		const { slides } = this.props

		this.sliderSettings = {
			beforeChange: (oldIndex, newIndex) => {
				if (slides[oldIndex] && slides[newIndex]) {
					let numAnim = new CountUp(
						this.selectedYear,
						slides[oldIndex].year,
						slides[newIndex].year,
						0, 1,
						{ separator: '' }
					)
					numAnim.start();
				}
				this.timeline.className = `timeline active${newIndex}`
			},
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	render() {
		const { slides } = this.props

		return (
			<div className={`Carousel`}>
				<Slider {...this.sliderSettings} ref={elm => this.slider = elm}>
					{slides.map((slide, i) => (
						<div key={i}>
							{slide.image && <img src={slide.image} alt={`${slide.year}`} className="image"/>}
							<p>{slide.text}</p>
						</div>
					))}
				</Slider>
				<div className="slider-controls">
					<ul className="timeline active0" ref={elm => this.timeline = elm}>
						{slides && slides.map((slide, i) => (
							<li key={i} onClick={() => this.slider.slickGoTo(i)}>{slide ? slide.year : i+1}</li>
						))}
					</ul>
					<div className="step">
						<div className="prev" onClick={() => this.slider.slickPrev()}>
							<ReactSVG path="static/svg/arrow-up.svg"/>
						</div>
						<div className="next" onClick={() => this.slider.slickNext()}>
							<ReactSVG path="static/svg/arrow-down.svg"/>
						</div>
					</div>
					<span ref={elm => this.selectedYear = elm} className="current">{slides[0].year}</span>
				</div>
			</div>
		)
	}
}

export default Carousel