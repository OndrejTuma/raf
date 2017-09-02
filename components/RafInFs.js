import React, { Component } from 'react'
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image'

import {nextConnect} from '../store'
import {paths} from '../configs'

class RafInFs extends Component {

	render() {
		const { translations: { heading, collection, collectionLink, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="animate-heading">{heading}</h2>
				<figure className="collection">
					<div className="animate-image">
						<ResponsiveImage alt={heading}>
							<ResponsiveImageSize
								default
								minWidth={0}
								path={`${paths.images}new-collection_v400.jpg`}
							/>
							<ResponsiveImageSize
								minWidth={450}
								path={`${paths.images}new-collection_v500.jpg`}
							/>
							<ResponsiveImageSize
								minWidth={1100}
								path={`${paths.images}new-collection.jpg`}
							/>
						</ResponsiveImage>
					</div>
					<figcaption className="animate-content">
						<a href={collectionLink}>
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