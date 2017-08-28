import { Component } from 'react'
import Typist from 'react-typist'
import {Motion, spring} from 'react-motion'

class Cites extends Component {
	constructor (props) {
		super(props)

		this.state = {
			activeCite: 0,
			citeFinished: false,
		}
	}
	componentWillUnmount() {
		clearTimeout(this.typingTimeout)
	}

	_typingFinished () {
		let { activeCite } = this.state
		let { data } = this.props

		let newCite = activeCite === data.length - 1 ? 0 : activeCite + 1

		this.setState({ citeFinished: true })

		this.typingTimeout =  setTimeout(() => this.setState({
			activeCite: newCite,
			citeFinished: false,
		}), 2000)
	}

	render () {
		const { data } = this.props
		const { activeCite, citeFinished } = this.state

		return (
			<div className={`Cites`}>
				{data.map((cite, i) => {
					if (activeCite === i) {
						return (
							<div key={i} className="cite">
								<Typist cursor={{ show: false }} startDelay={2000} onTypingDone={() => this._typingFinished()}>
									<blockquote>"{cite.text}"</blockquote>
								</Typist>
								<Motion style={{
									opacity: spring( citeFinished ? 1 : 0 ),
									right: spring( citeFinished ? 0 : -20 ),
								}}>
									{style => (
										<small style={style}>{cite.author}</small>
									)}
								</Motion>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

export default Cites