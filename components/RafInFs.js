import React, { Component } from 'react'

class RafInFs extends Component {

	render() {
		const { translations: { heading, collection, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="heading">{heading}</h2>
				<figure className="collection">
					<img src="static/images/new-collection.jpg" alt={heading}/>
					<figcaption>
						<strong>{collection}</strong> <span>{inFs}</span>
					</figcaption>
				</figure>
			</div>
		)
	}
}

export default RafInFs