import { Component } from 'react'
import Typist from 'react-typist'

class Cites extends Component {
	render () {
		const { data } = this.props

		return (
			<div className={`Cites`}>
				{data.map((cite, i) => {
					console.log(cite.text);
					return cite.text ? <Typist show={false} startDelay={2000} key={i}>{cite.text}</Typist> : false
				})}
			</div>
		)
	}
}

export default Cites