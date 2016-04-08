'use strict';

var assert = require('yeoman-generator').assert;
var test = require('./util');
var os = require('os');
var fs = require('fs');

describe('condo:app', function () {
  test.app();

  it('importable', function () {
    var app = require('../app');
    assert.notEqual(app, undefined);
  });

  test.created('condo.cmd');
  test.created('condo.ps1');
  test.created('condo.sh');
  test.created('condo.msbuild');
  test.hasMode('condo.sh', 33256);

  test.created('src/.yo-rc.json');
  test.created('test/.yo-rc.json');

  test.created('global.json');
  test.contains('global.json', 'src');
  test.contains('global.json', 'test');
  test.contains('global.json', '"coreclr"');

  test.created('condo.shade');
  test.contains('condo.shade', ' = \'test-app\'');
  test.contains('condo.shade', ' = \'1.2.3\'');
  test.contains('condo.shade', ' = \'My Company\'');
  test.contains('condo.shade', '©. My Company.');
  test.contains('condo.shade', ' = \'src\'');
  test.contains('condo.shade', ' = \'test\'');

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

  test.app(null, null, prompts);

  it('importable', function () {
    var app = require('../app');
    assert.notEqual(app, undefined);
  });

  test.created('condo.cmd');
  test.created('condo.ps1');
  test.created('condo.sh');
  test.hasMode('condo.sh', 33256);

  test.created('bob-src/.yo-rc.json');
  test.created('bob-test/.yo-rc.json');

  test.created('global.json');
  test.contains('global.json', 'bob-src');
  test.contains('global.json', 'bob-test');
  test.contains('global.json', '"mono"');

  test.created('condo.shade');
  test.contains('condo.shade', ' = \'test-app2\'');
  test.contains('condo.shade', ' = \'3.2.1\'');
  test.contains('condo.shade', ' = \'Sweet\'');
  test.contains('condo.shade', '©. Sweet.');
  test.contains('condo.shade', ' = \'bob-src\'');
  test.contains('condo.shade', ' = \'bob-test\'');

  test.notCreated('condo.msbuild');
  test.notCreated('test-app.sln');
  test.notCreated('test-app.sln.DotSettings');

  test.notCreated('.editorconfig');
  test.notCreated('.vscode');
  test.notCreated('.vscode/settings.json');

  test.notCreated('.gitattributes');
  test.notCreated('.gitignore');

  test.notCreated('.jshintrc');

});