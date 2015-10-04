'use strict';

var assert = require('yeoman-generator').assert;
var test = require('./util');

describe('condo:app', function () {
  it('importable', function () {
    var app = require('../app');
    assert.notEqual(app, undefined);
  });

  test.app();

  test.created('build.cmd');
  test.created('build.ps1');
  test.created('build.sh');

  test.created('src/.yo-rc.json');
  test.created('test/.yo-rc.json');

  test.created('global.json');
  test.contains('global.json', 'src');
  test.contains('global.json', 'test');
  test.contains('global.json', '"coreclr"');

  test.created('make.shade');
  test.contains('make.shade', ' = \'test-app\'');
  test.contains('make.shade', ' = \'1.2.3\'');
  test.contains('make.shade', ' = \'My Company\'');
  test.contains('make.shade', '©. My Company.');
  test.contains('make.shade', ' = \'src\'');
  test.contains('make.shade', ' = \'test\'');

  test.created('test-app.sln');
  test.created('test-app.sln.DotSettings');
  test.contains('test-app.sln.DotSettings', 'My Company');

  test.created('.editorconfig');
  test.created('.vscode/settings.json');

  test.created('.gitattributes');
  test.created('.gitignore');

  test.created('.jshintrc');
});

describe('condo:app:no-includes', function () {
  var prompts = {
    "src": "bob-src",
    "test": "bob-test",
    "project": "test-app2",
    "version": "3.2.1",
    "company": "Sweet",
    "runtime": "mono",
    "includes": [ ]
  };

  test.created('build.cmd');
  test.created('build.ps1');
  test.created('build.sh');

  test.created('bob-src/.yo-rc.json');
  test.created('bob-test/.yo-rc.json');

  test.created('global.json');
  test.contains('global.json', 'bob-src');
  test.contains('global.json', 'bob-test');
  test.contains('global.json', '"mono"');

  test.created('make.shade');
  test.contains('make.shade', ' = \'test-app2\'');
  test.contains('make.shade', ' = \'3.2.1\'');
  test.contains('make.shade', ' = \'Sweet\'');
  test.contains('make.shade', '©. Sweet.');
  test.contains('make.shade', ' = \'bob-src\'');
  test.contains('make.shade', ' = \'bob-test\'');

  test.notCreated('test-app.sln');
  test.notCreated('test-app.sln.DotSettings');

  test.notCreated('.editorconfig');
  test.notCreated('.vscode');
  test.notCreated('.vscode/settings.json');

  test.notCreated('.gitattributes');
  test.notCreated('.gitignore');

  test.notCreated('.jshintrc');

  test.app(null, null, prompts);

});