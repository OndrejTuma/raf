import React from 'react'
import SVG from 'react-svg'

const Socials = props =>  {
	const socials = [
		{ name: 'Facebook', url: 'https://www.facebook.com', svg: 'social-facebook' },
		{ name: 'Twitter', url: 'https://www.twitter.com', svg: 'social-twitter' },
		{ name: 'Instagram', url: 'https://www.instagram.com', svg: 'social-instagram' },
		{ name: 'Pinterest', url: 'https://www.pinterest.com', svg: 'social-pinterest' },
		{ name: 'YouTube', url: 'https://www.youtube.com', svg: 'social-youtube' },
	];
	return (
		<ul className={`Socials`}>
			{socials.map((service, i) => (
				<li>
					<a href={service.url} title={service.name}>
						<SVG path={`static/svg/${service.svg}.svg`} />
					</a>
				</li>
			))}
		</ul>
	)
}

export default Socials