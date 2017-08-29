import React, { Component } from 'react'

import Mouse from '../static/svg/mouse.svg'
import MouseDown from '../static/svg/mouse-down.svg'

class ScrollDown extends Component {

	constructor (props) {
		super(props)

		this._handleScroll = this._handleScroll.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this._handleScroll)

		this._handleScroll()
	}
	componentWillUnmount () {
		window.removeEventListener('scroll', this._handleScroll)
	}

	_handleScroll() {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

		if (scrollTop > 100) {
			this._hide()
		}
		else {
			this._show()
		}
	}
	_hide() {
		if (this.wrapper && this.wrapper.style.display == 'block') {
			this.wrapper.style.display = 'none'
		}
	}
	_show() {
		if (this.wrapper && this.wrapper.style.display == 'none') {
			this.wrapper.style.display = 'block'
		}
	}

	render() {
		const { translations: { scroll } } = this.props

		return (
			<div className="scroll-down" ref={elm => this.wrapper = elm} style={{ display: 'none' }}>
				<p>{scroll}</p>
				<Mouse className="mouse"/>
				<MouseDown className="arrow"/>
			</div>
		)
	}
}

export default ScrollDown