import React, {Component} from 'react'
import ReactSVG from 'react-svg'
import {getTranslate} from 'react-localize-redux'

import {nextConnect} from '../store'

class Scroll extends Component {
	componentDidMount() {
		window.addEventListener('scroll', this._handleScroll.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScroll.bind(this));
	}

	_handleScroll(event) {
		let scrollTop = event.srcElement.body.scrollTop

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
		const {translate} = this.props

		return (
			<div className="scroll" ref={elm => this.wrapper = elm} style={{ display: 'block' }}>
				<p>{translate('scroll')}</p>
				<ReactSVG path="static/svg/mouse.svg" className="mouse"/>
				<ReactSVG path="static/svg/mouse-down.svg" className="arrow"/>
			</div>
		)
	}
}

export default nextConnect(state => ({
	auth: state.auth,
	global: state.global,
	translate: (state.locale && state.locale.languages.length) ? getTranslate(state.locale) : () => {
	},
}))(Scroll)