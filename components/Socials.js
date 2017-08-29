import React from 'react'

import Facebook from '../static/svg/social-facebook.svg'
import Twitter from '../static/svg/social-twitter.svg'
import Instagram from '../static/svg/social-instagram.svg'
import Pinterest from '../static/svg/social-pinterest.svg'
import Youtube from '../static/svg/social-youtube.svg'


const Socials = props =>  {
	const socials = [
		{ name: 'Facebook', url: 'https://www.facebook.com', svg: <Facebook/> },
		{ name: 'Twitter', url: 'https://www.twitter.com', svg: <Twitter/> },
		{ name: 'Instagram', url: 'https://www.instagram.com', svg: <Instagram/> },
		{ name: 'Pinterest', url: 'https://www.pinterest.com', svg: <Pinterest/> },
		{ name: 'YouTube', url: 'https://www.youtube.com', svg: <Youtube/> },
	];
	return (
		<div className={`Socials`}>
			<ul>
				{socials.map((service, i) => (
					<li key={i}>
						<a href={service.url} title={service.name}>
							{service.svg}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Socials