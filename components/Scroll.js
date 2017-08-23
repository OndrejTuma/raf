import React, { Component } from 'react'
import ReactSVG from 'react-svg'

class Scroll extends Component {
	componentDidMount() {
		window.addEventListener('scroll', this._handleScroll.bind(this))

		this._handleScroll()
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
			<div className="scroll" ref={elm => this.wrapper = elm} style={{ display: 'none' }}>
				<p>{scroll}</p>
				<ReactSVG path="static/svg/mouse.svg" className="mouse"/>
				<ReactSVG path="static/svg/mouse-down.svg" className="arrow"/>
			</div>
		)
	}
}

export default Scroll