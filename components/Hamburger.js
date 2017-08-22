import React, { Component } from 'react'

export default class Hamburger extends Component {
	render () {
		return (
			<div ref={elm => this.hamburger = elm} className="hamburger" onClick={() => {
				let className = (this.hamburger.className == 'hamburger') ? 'hamburger active' : 'hamburger'
				this.hamburger.className = className
			}}>
				<span className="lines"></span>
			</div>
		)
	}
}