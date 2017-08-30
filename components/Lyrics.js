import React, {Component} from 'react'
import Typist from 'react-typist'

import {lines} from '../karaoke-lyrics'

class Lyrics extends Component {
	constructor(props) {
		super(props)

		this.lines = Object.keys(lines).reduce((res, key) => {
			res.push(lines[key])
			return res
		}, [])
		this.state = {
			active: 0,
			position: {
				left: 0,
				top: 0,
			}
		}
	}
	componentWillUnmount () {
		clearTimeout(this.timeoutInterval)
	}

	_typingFinished() {
		const {active} = this.state
		let newActive = active < this.lines.length - 1 ? active + 1 : 0

		this.timeoutInterval = setTimeout(() => this.setState({
			active: newActive,
			position: {
				left: `${Math.random() * 50}%`,
				top: `${Math.random() * 80}%`,
			}
		}), 5000)
	}

	render() {
		const {active, position} = this.state

		return (
			<div className={`Lyrics`}>
				{this.lines.map((line, i) => {
					if (active === i) {
						return (
							<div key={i} className="text" style={position}>
								<Typist cursor={{show: false}} startDelay={5000} onTypingDone={() => this._typingFinished()}>
									"{line.reduce((res, word, i) => {
										res += `${i > 0 ? ' ' : ''}${word.text || word}`
										return res
								}, '')}"
								</Typist>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

export default Lyrics