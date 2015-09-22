'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('condo:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'build.cmd',
      'build.ps1',
      'build.sh',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'global.json',
      '.jshintrc',
      'make.shade',
      '.vscode/settings.json'
    ]);
  });
});