import React, { Component } from 'react'
import {Motion, spring, StaggeredMotion} from 'react-motion'
import classNames from 'classnames'

import {nextConnect} from '../store'
import {setActiveSlide} from '../redux/actions'


class Menu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false,
		}
	}

	handleClick(e, index) {
		e.preventDefault()

		const { activeSlide, dispatch } = this.props

		dispatch(setActiveSlide(index, activeSlide))
		this.setState({ open: false })
	}
	render() {
		let { activeSlide, isMobile, translations: { item1, item2, item3, item4, item5 } } = this.props
		let { open } = this.state

		let isOpened = isMobile ? open : true

		let menuItems = [
			{ name: item1, anchor: 'slide0' },
			{ name: item2, anchor: 'slide1' },
			{ name: item3, anchor: 'slide2' },
			{ name: item4, anchor: 'slide3' },
			{ name: item5, anchor: 'slide4' },
		]
		let hamburgerClass = classNames('hamburger', {
			'active': this.state.open
		})

		return (
			<div className={`Menu`}>
				{isMobile && (
					<div className={hamburgerClass} onClick={() => this.setState({ open: !this.state.open })}>
						<span className="lines"></span>
					</div>
				)}
				<Motion style={{
					left: spring( isOpened ? 0 : 100, { stiffness: 200 } )
				}}>
					{style => (
						<div className="items" style={{ left: `${style.left}%` }}>
							<StaggeredMotion
								defaultStyles={menuItems.map(item => ({ left: isOpened ? 0 : 100, opacity: 0 }))}
								styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
									return i === 0
										? { left: spring(isOpened ? 0 : 100, { stiffness: 100, damping: 10 }), opacity: spring(isOpened ? 1 : 0) }
										: prevInterpolatedStyles[i - 1]
								})}
							>
								{interpolatingStyles => (
									<ul>
										{interpolatingStyles.map((style, i) =>
											<li key={i} style={style} className={classNames({ active: activeSlide === i })}>
												<a href={`#${menuItems[i].anchor}`} onClick={e => this.handleClick(e, i)}>{menuItems[i].name}</a>
											</li>
										)}
									</ul>
								)}
							</StaggeredMotion>
						</div>
					)}
				</Motion>
			</div>
		)
	}
}

export default nextConnect(state => ({
	isMobile: state.global.isMobile,
	activeSlide: state.global.slider.activeSlide,
	previousSlide: state.global.slider.previousSlide,
}))(Menu)