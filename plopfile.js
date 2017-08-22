const paths = {
	sass: 'styles/',
	components: 'styles/components/',
	pages: 'styles/pages/',
}

module.exports = function (plop) {

	plop.addHelper('dashAround', (text) => '---- ' + text + ' ----');
	plop.addHelper('upperCase', (text) => text.toUpperCase());
	plop.addHelper('lowerCase', (text) => text.toLowerCase());

	plop.setGenerator('sass', {
		description: 'Nova sass komponenta',
		prompts: [{
			type: 'input',
			name: 'component',
			message: 'Nazev komponenty:',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'Nejak se jmenovat musi';
			}
		}],
		actions: [{
			type: 'add',
			path: `${paths.components}/{{component}}.scss`,
			templateFile: 'plop-templates/component.txt',
		},{
			type: 'modify',
			path: `${paths.sass}/index.scss`,
			pattern: /(\/\/#generated-components)/gi,
			template: `$1\n@import "components/{{component}}";`
		}]
	});
	plop.setGenerator('page', {
		description: 'Nova sass stranka',
		prompts: [{
			type: 'input',
			name: 'page',
			message: 'Nazev stranky:',
			validate: function (value) {
				if ((/.+/).test(value)) { return true; }
				return 'Nejak se jmenovat musi';
			}
		}],
		actions: [{
			type: 'add',
			path: `${paths.pages}/{{page}}.scss`,
			templateFile: 'plop-templates/page.txt',
		},{
			type: 'modify',
			path: `${paths.sass}/index.scss`,
			pattern: /(\/\/#generated-pages)/gi,
			template: `$1\n@import "pages/{{page}}";`
		}]
	});
};