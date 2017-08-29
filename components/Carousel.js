import React, { Component } from 'react'
import SVG from 'react-svg'
import Slider from 'react-slick'
import CountUp from 'countup.js'
import classNames from 'classnames'
import {Motion, spring, StaggeredMotion} from 'react-motion'

import {nextConnect} from '../store'

class Carousel extends Component {
	constructor (props) {
		super(props)

		this.state = {
			activeSlide: 0
		}
	}
	componentWillMount() {
		const { hasCounter, slides } = this.props

		this.sliderSettings = {
			afterChange: newIndex => {},
			beforeChange: (oldIndex, newIndex) => {
				this.setState({ activeSlide: newIndex })

				if (hasCounter && slides[oldIndex] && slides[newIndex]) {
					new CountUp(
						this.selectedYear,
						slides[oldIndex].key,
						slides[newIndex].key,
						0, 1.5,
						{ separator: '' }
					).start()
				}
			},
			draggable: false,
			fade: true,
			infinite: true,
			lazyLoad: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipe: false,
		}
	}
	render() {
		const { hasCounter, reversed, slides, isMobile } = this.props
		let { activeSlide } = this.state

		let timelineClasses = classNames('timeline', `active${activeSlide}`),
			carouselClasses = classNames('Carousel', {reversed} )

		let slider = <Slider {...this.sliderSettings} ref={elm => this.slider = elm}>
			{slides.map((slide, i) => (
				<div key={i}>
					{activeSlide === i ? (
						<StaggeredMotion
							defaultStyles={[ { top: -20 }, { top: 20 }, { top: 20 } ]}
							styles={prevStyles => prevStyles.map((_, j) => ({
								top: spring( 0, { stiffness: 100, damping: 10 }),
							}))}
						>
							{styles => (
								<div>
									{slide.image && <img src={slide.image} alt={`${slide.key}`} style={styles[0]} />}
									<div className="info">
										{reversed && <h3 style={styles[1]}>{slide.key}</h3>}
										<p style={styles[2]}>{slide.text}</p>
									</div>
								</div>
							)}
						</StaggeredMotion>
					) : (
						<div>
							{slide.image && <img src={slide.image} alt={`${slide.key}`} />}
							<div className="info">
								{reversed && <h3>{slide.key}</h3>}
								<p>{slide.text}</p>
							</div>
						</div>
					)}
				</div>
			))}
		</Slider>
		let step = <div className="step">
			<div className="prev" onClick={() => this.slider.slickPrev()}>
				<SVG path="static/svg/arrow-up.svg"/>
			</div>
			<div className="next" onClick={() => this.slider.slickNext()}>
				<SVG path="static/svg/arrow-down.svg"/>
			</div>
		</div>
		let timeline = <ul className={timelineClasses}>
			{slides && slides.reduce((res, slide, i) => {
				let control = <li key={i} className={classNames({ active: activeSlide === i })} onClick={() => this.slider.slickGoTo(i)}>{slide.key}</li>

				if (isMobile) {
					res.push(control)
				}
				else {
					res.unshift(control)
				}

				return res
			}, [])}
		</ul>

		return isMobile ? (
			<div className={carouselClasses}>
				{slider}
				{reversed ? (
					<div className="slider-controls">
						{step}{timeline}
					</div>
				) : (
					<div className="slider-controls">
						{timeline}{step}
					</div>
				)}
				{hasCounter && <span ref={elm => this.selectedYear = elm} className="counter">{slides[0].key}</span>}
			</div>
		) : (
			<div className={carouselClasses}>
				{timeline}
				{!reversed ? (
					<div className="bundled">
						{step}
						{hasCounter && <span ref={elm => this.selectedYear = elm} className="counter">{slides[0].key}</span>}
					</div>
				) : step}
				{slider}
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
}))(Carousel)