import React, { Component } from 'react'
import {Motion, spring} from 'react-motion'

import {nextConnect} from '../store'

class RafInFs extends Component {

	render() {
		const { activeSlide, translations: { heading, collection, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="animate-heading">{heading}</h2>
				<figure className="collection">
					<div className="animate-image">
						<img src="static/images/new-collection.jpg" alt={heading} />
					</div>
					<figcaption className="animate-content">
						<a href="#" >
							<strong>{collection}</strong> <span>{inFs}</span>
						</a>
					</figcaption>
				</figure>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
}))(RafInFs)