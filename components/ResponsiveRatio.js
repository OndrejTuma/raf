import React, {Component} from 'react'

class ResponsiveRatio extends Component {

	constructor (props) {
		super(props)

		this.updateRatio = this.updateRatio.bind(this)

		this.state = {
			width: null,
		}
	}
	componentDidMount() {
		const { ratio, width } = this.props
		let { offsetHeight, offsetWidth } = this.wrapper

		this.ratio = ratio || (offsetWidth / offsetHeight)
		this.setState({
			width: width || offsetWidth
		})

		window.addEventListener('resize', this.updateRatio)
	}
	componentWillUnmount () {
		window.removeEventListener('resize', this.updateRatio)
	}

	updateRatio () {
		this.setState({
			width: this.wrapper.offsetWidth
		})
	}

	render() {
		const {children, className} = this.props
		const {width} = this.state

		return (
			<div className={`responsive-ratio${className ? ` ${className}` : ``}`} ref={elm => this.wrapper = elm} style={{ height: this.ratio ? Math.round(width / this.ratio) : null }}>
				{children}
			</div>
		)
	}
}

export default ResponsiveRatio