import React, { Component } from 'react'
import ga from 'react-google-analytics'

import {nextConnect} from '../store'

class RafInFs extends Component {

	render() {
		const { translations: { heading, collection, collectionLink, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="animate-heading">{heading}</h2>
				<figure className="collection">
					<div className="animate-image">
						<img src="static/images/new-collection.jpg" alt={heading} />
					</div>
					<figcaption className="animate-content">
						<a href={collectionLink} onClick={() => ga('send', 'event', 'collection-cta', 'click')}>
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
}))(RafInFs)