import React from 'react'

import Facebook from '../static/svg/social-facebook.svg'
import Twitter from '../static/svg/social-twitter.svg'
import Snapchat from '../static/svg/social-snapchat.svg'
import Instagram from '../static/svg/social-instagram.svg'
import Youtube from '../static/svg/social-youtube.svg'


const Socials = ({ translations: { linkFb, linkTw, linkYt, linkIt, linkSc } }) =>  {
	const socials = [
		{ name: 'Facebook', url: linkFb, svg: <Facebook/> },
		{ name: 'Twitter', url: linkTw, svg: <Twitter/> },
		{ name: 'Snapchat', url: linkSc, svg: <Snapchat/> },
		{ name: 'Instagram', url: linkIt, svg: <Instagram/> },
		{ name: 'YouTube', url: linkYt, svg: <Youtube/> },
	]

	return (
		<div className={`Socials`}>
			<ul>
				{socials.map((service, i) => (
					<li key={i}>
						<a href={service.url} title={service.name}>{service.svg}</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Socials