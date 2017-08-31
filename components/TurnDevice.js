import React from 'react'

import Device from '../static/svg/turn-device.svg'


const TurnDevice = ({ text }) =>  {
	return (
		<div className={`TurnDevice`}>
			<div>
				<Device/>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default TurnDevice