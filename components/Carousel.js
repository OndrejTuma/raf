import React, { Component } from 'react'
import SVG from 'react-svg'
import Slider from 'react-slick'
import CountUp from 'countup.js'

class Carousel extends Component {
	componentWillMount() {
		const { hasCounter, slides } = this.props

		this.sliderSettings = {
			beforeChange: (oldIndex, newIndex) => {
				if (hasCounter && slides[oldIndex] && slides[newIndex]) {
					let numAnim = new CountUp(
						this.selectedYear,
						slides[oldIndex].key,
						slides[newIndex].key,
						0, 1.5,
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
		const { className, hasCounter, reversed, slides } = this.props

		let step = <div className="step">
			<div className="prev" onClick={() => this.slider.slickPrev()}>
				<SVG path="static/svg/arrow-up.svg"/>
			</div>
			<div className="next" onClick={() => this.slider.slickNext()}>
				<SVG path="static/svg/arrow-down.svg"/>
			</div>
		</div>
		let timeline = <ul className="timeline active0" ref={elm => this.timeline = elm}>
			{slides && slides.map((slide, i) => (
				<li key={i} onClick={() => this.slider.slickGoTo(i)}>{slide ? slide.key : i+1}</li>
			))}
		</ul>

		return (
			<div className={`Carousel${className ? ` ${className}` : ``}${reversed ? ` reversed` : ``}`}>
				<Slider {...this.sliderSettings} ref={elm => this.slider = elm}>
					{slides.map((slide, i) => (
						<div key={i}>
							{slide.image && <img src={slide.image} alt={`${slide.key}`} className="image"/>}
							<p>{slide.text}</p>
						</div>
					))}
				</Slider>
				{reversed ? (
					<div className="slider-controls">
						{step}{timeline}
					</div>

				) : (
					<div className="slider-controls">
						{timeline}{step}
					</div>
				)}
				{hasCounter && <span ref={elm => this.selectedYear = elm} className="current">{slides[0].key}</span>}
			</div>
		)
	}
}

export default Carousel