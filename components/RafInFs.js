import React, { Component } from 'react'

class RafInFs extends Component {

	render() {
		const { translations: { heading, collection, inFs } } = this.props

		return (
			<div className={`RafInFs`}>
				<h2 className="heading">{heading}</h2>
				<div className="collection">
					<strong>{collection}</strong> {inFs}
				</div>
			</div>
		)
	}
}

export default RafInFs