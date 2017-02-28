module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single",
			{ "allowTemplateLiterals": true }
		],
		"semi": [
			"error",
			"always"
		]
	},
	"globals": {
		"Backbone": false,
		"chrome": false,
		"App": false
	}
};
