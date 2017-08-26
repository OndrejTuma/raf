import { Component } from 'react'
import Typist from 'react-typist'

class Cites extends Component {
	constructor (props) {
		super(props)

		this.state = {
			activeCite: 0
		}
	}
	render () {
		const { data } = this.props
		const { activeCite } = this.state

		return (
			<div className={`Cites`}>
				{data.map((cite, i) => {
					if (activeCite === i) {
						return (
							<div className="cite">
								<Typist cursor={{ show: false }} startDelay={2000} key={i}>
									<blockquote>"{cite.text}"</blockquote>
								</Typist>
								<small>{cite.author}</small>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

export default Cites