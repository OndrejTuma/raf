import {spring} from 'react-motion'

const animations = {
	slideLeft: {
		before: {
			scale: 3,
			left: 60,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
			left: spring(0, { stiffness: 200 }),
		},
	},
	slideRight: {
		before: {
			scale: 3,
			left: -60,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
			left: spring(0, { stiffness: 200 }),
		},
	},
	slideTop: {
		before: {
			scale: 3,
			top: -30,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
			top: spring(0, { stiffness: 200 }),
		},
	},
	slideBottom: {
		before: {
			scale: 3,
			top: 30,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
			top: spring(0, { stiffness: 200 }),
		},
	},
	zoomIn: {
		before: {
			scale: 6,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
		},
	},
	zoomOut: {
		before: {
			scale: 0,
		},
		after: {
			scale: spring(1, { stiffness: 200 }),
		},
	},
}
export const lines = {
	iDont: ['I', 'done', 'came', 'up'],
	bustin: ['Bustin\'', 'down', 'a', 'whole', 'bag'],
	broke: ['Broke', 'nigga,', 'step','back'],
	peep: ['Why', 'don\'t', 'you', 'peep', 'a', 'nigga\'s', 'swag'],
	dontAsk: ['You', 'ain\'t', 'even', 'gotta', 'ask'],
	what: ['What', 'are', 'those?', 'What', 'is', 'that?'],
	raf: [
		{ text: 'Please', animation: animations.zoomOut },
		'don\'t', 'touch', 'my', 'Raf'
	],
	step: ['Ho', 'don\'t', 'step', 'on', 'my', 'Raf', 'Simons'],
	spending: ['Do', 'you', 'know', 'how', 'much', 'I\'m', 'spendin\'?'],
	milli: ['My', 'closet', 'it', 'worth', '\'bout', 'a', 'milli'],
	runway: ['Took', 'the', 'lil\'', 'bitch', 'out', 'the', 'runway'],
	naked: ['Now', 'she', 'naked', 'in', 'the', 'kitchen'],
}

const lyrics = [
	// line 1
	{
		animation: animations.slideLeft,
		duration: {
			from: 21.5,
			to: 23,
			words: .25,
		},
		words: lines.iDont
	},
	{
		animation: animations.slideRight,
		duration: {
			from: 23,
			to: 25,
			words: .25,
		},
		words: lines.bustin
	},
	{
		animation: animations.slideTop,
		duration: {
			from: 25,
			to: 26.5,
			words: .20,
		},
		words: lines.broke
	},
	{
		animation: animations.slideRight,
		duration: {
			from: 26.8,
			to: 28,
			words: .1,
		},
		words: lines.peep
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 28.7,
			to: 30,
			words: .15,
		},
		words: lines.dontAsk
	},
	{
		animation: animations.slideTop,
		duration: {
			from: 30.5,
			to: 32,
			words: .15,
		},
		words: lines.what
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 32.5,
			to: 34,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 34,
			to: 35.5,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 35.7,
			to: 37,
			words: .25,
		},
		words: ['I\'m', 'racked up', 'like', 'rappers'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 37.5,
			to: 39,
			words: .25,
		},
		words: ['I\'m', 'Raf\'d up', 'on', 'camera'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 39,
			to: 41,
			words: .25,
		},
		words: ['Get', 'knocked out', 'on', 'camera'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 41,
			to: 42.5,
			words: .25,
		},
		words: ['Squeeze', 'pump', 'like', 'asthma'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 43,
			to: 44.7,
			words: .18,
		},
		words: ['It\'s', 'rare', 'Raf', 'when', 'I', 'wear', 'Raf'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 44.7,
			to: 46,
			words: .18,
		},
		words: ['Bare', 'Raf', 'when', 'I', 'wear', 'Raf'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 46.3,
			to: 48,
			words: .18,
		},
		words: ['Might', 'invest', 'into', 'some', 'Raf', 'shares'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 48.3,
			to: 50,
			words: .25,
		},
		words: ['Lil', 'niggas', 'still', 'share', 'Raf'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 50,
			to: 51.7,
			words: .20,
		},
		words: ['Yeah', 'and I\'m', 'drippin\'', 'on', 'racks'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 51.9,
			to: 53.5,
			words: .20,
		},
		words: ['Rick', 'Owens', 'be', 'the', 'tag'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 53.7,
			to: 55,
			words: .25,
		},
		words: ['Do', 'the', 'digital', 'dash'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 55.5,
			to: 57,
			words: .2,
		},
		words: ['Yeah', 'I\'m', 'boastin\',', 'never', 'brag'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 57.5,
			to: 59,
			words: .2,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 59,
			to: 60.5,
			words: .2,
		},
		words: ['Bought', 'a', 'Kris', 'Van', 'Assche'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 60.8,
			to: 62.5,
			words: .4,
		},
		words: ['Alessandro', 'Gucci', 'glasses'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 62.7,
			to: 64,
			words: .4,
		},
		words: ['J.W.', 'Anderson', 'collab'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 64.5,
			to: 66,
			words: .13,
		},
		words: ['Yeah', 'she', 'pop', 'it', 'like', 'a', 'mac'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 66.5,
			to: 68,
			words: .13,
		},
		words: ['Yeah', 'she', 'drop', 'it', 'on', 'the', 'bag'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 68,
			to: 69.5,
			words: .3,
		},
		words: ['I\'ma', 'buy', 'another', 'bag'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 69.8,
			to: 71.5,
			words: .17,
		},
		words: ['\'Cause', 'she', 'always', 'bring', 'it', 'back'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 71.7,
			to: 73,
			words: .13,
		},
		words: ['Yeah', 'you', 'know', 'how to', 'make it', 'last'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 73.5,
			to: 75,
			words: .22,
		},
		words: ['Plus', 'a nigga', 'keepin\'', 'tabs'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 75.5,
			to: 77,
			words: .15,
		},
		words: ['I\'ma', 'fly', 'first', 'class'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 77,
			to: 78.5,
			words: .15,
		},
		words: ['Quavo', 'hit', '\'em', 'with', 'the', 'dab'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 78.9,
			to: 80.5,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 80.7,
			to: 82,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 82.5,
			to: 84,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 84.3,
			to: 85.5,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 86,
			to: 87.5,
			words: .1,
		},
		words: lines.spending,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 87.7,
			to: 89.5,
			words: .13,
		},
		words: lines.milli
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 89.5,
			to: 91,
			words: .2,
		},
		words: lines.runway
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 91.3,
			to: 93,
			words: .15,
		},
		words: lines.naked
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 93,
			to: 94.3,
			words: .4,
		},
		words: ['Raf', 'Simons'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 94.5,
			to: 96.5,
			words: .4,
		},
		words: ['All', 'kind of', 'crazy', 'colors'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 96.7,
			to: 98,
			words: .4,
		},
		words: ['Livin\'', 'color'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 98,
			to: 100,
			words: .4,
		},
		words: ['Left', 'wrist,', 'Rollie', 'butters'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 100.3,
			to: 102,
			words: .15,
		},
		words: ['Maison', 'Margiela', 'my', 'sweater'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 102,
			to: 104,
			words: .15,
		},
		words: ['Mama', 'told', 'me', 'never', 'settle'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 104,
			to: 105.5,
			words: .2,
		},
		words: ['Raf', 'Simons,', 'don\'t', 'lace', '\'em'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 105.7,
			to: 107.5,
			words: .15,
		},
		words: ['Got', 'your', 'bitch', 'wanna', 'date', 'him'],
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 107.5,
			to: 109,
			words: .25,
		},
		words: lines.iDont,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 109,
			to: 111,
			words: .25,
		},
		words: lines.bustin
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 111,
			to: 112.5,
			words: .20,
		},
		words: lines.broke
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 112.8,
			to: 114,
			words: .1,
		},
		words: lines.peep
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 114.7,
			to: 116,
			words: .15,
		},
		words: lines.dontAsk
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 116.5,
			to: 118,
			words: .15,
		},
		words: lines.what
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 118.5,
			to: 120,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 120,
			to: 121.5,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 121.7,
			to: 123,
			words: .15,
		},
		words: lines.raf,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 123.5,
			to: 125,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 125,
			to: 126.5,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 126.8,
			to: 128.5,
			words: .1,
		},
		words: lines.step,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 129,
			to: 130.5,
			words: .1,
		},
		words: lines.spending,
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 130.7,
			to: 132.5,
			words: .13,
		},
		words: lines.milli
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 132.5,
			to: 134,
			words: .2,
		},
		words: lines.runway
	},
	{
		animation: animations.slideLeft,
		duration: {
			from: 134.3,
			to: 136,
			words: .15,
		},
		words: lines.naked
	},
]

export default lyrics