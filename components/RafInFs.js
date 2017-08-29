import React, { Component } from 'react'
import {Motion, spring} from 'react-motion'

import {nextConnect} from '../store'

class RafInFs extends Component {

	render() {
		const { activeSlide, translations: { heading, collection, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="heading">{heading}</h2>
				<figure className="collection">
					<Motion style={{ top: spring(activeSlide === 4 ? 0 : -100, { stiffness: 40 }) }}>
						{style => (
							<img style={style} src="static/images/new-collection.jpg" alt={heading} />
						)}
					</Motion>
					<a href="#">
						<figcaption>
							<strong>{collection}</strong> <span>{inFs}</span>
						</figcaption>
					</a>
				</figure>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
}))(RafInFs)