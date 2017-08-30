import React, { Component } from 'react'

import {nextConnect} from '../store'

import LogoFootshop from '../components/LogoFootshop'

class Footer extends Component {

	render() {
		const {translations: {footshoUrl, link, linkText, text}} = this.props

		let FootshopLogo = <LogoFootshop link={footshoUrl} className="bigger"/>,
			FootContent = <p>{text} <a href={link}>{linkText}</a></p>

		return (
			<div className={`Footer`}>
				<div>
					{FootContent}
					{FootshopLogo}
				</div>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
}))(Footer)