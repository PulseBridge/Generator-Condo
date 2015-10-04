'use strict';

var util = (function () {
	var yo = require('yeoman-generator');
	var path = require('path');

	var test;
	var assert;

	function app(options, args, prompts, generator) {
		if (options === undefined || options === null) {
			options = [];
		}

		if (args === undefined || args === null) {
			args = [];
		}

		if (prompts === undefined || prompts === null) {
			prompts = {
				"src": "src",
				"test": "test",
				"project": "test-app",
				"version": "1.2.3",
				"company": "My Company",
				"runtime": "coreclr",
				"includes": [
					"solution",
					"resharper",
					"editorconfig",
					"vscode",
					"gitignore",
					"gitattributes",
					"jshint"
				]
			};
		}

		if (generator === undefined || generator === null) {
			generator = 'app';
		}

		assert = yo.assert;
		test = yo.test;

		before(function(done) {
			test.run(path.join(__dirname, '../' + generator))
				.withArguments(args)
				.withOptions(options)
				.withPrompts(prompts)
				.on('end', done);
		});
	}

	function created(path) {
		it('created:' + path, function() {
			assert.file(path);
		});
	}

	function contains(path, content) {
		it('created:' + path + ':contains:' + content, function() {
			assert.fileContent(path, content);
		});
	}

	function notCreated(path) {
		it('not-created:' + path, function() {
			assert.noFile(path);
		});
	}

	var methods = {
		app: app,
		created: created,
		notCreated: notCreated,
		contains: contains
	}

	return methods;
})();

module.exports = util;