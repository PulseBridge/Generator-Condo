'use strict';

var util = (function() {
    var yo = require('yeoman-generator');
    var path = require('path');
    var fs = require('fs');

    var platform = require('os').platform();
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
                    "msbuild",
                    "solution",
                    "resharper",
                    "editorconfig",
                    "vscode",
                    "gitignore",
                    "gitattributes",
                    "jshint",
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

    function hasMode(path, mode) {
        it('created:' + path + ':hasMode:' + mode, function(done) {
            fs.stat(path, function(err, stats) {
                if (err) {
                    done(err);
                } else {
                    if (platform.indexOf('win32') == -1) {
                        assert.equal(mode, stats.mode, stats.mode);
                    }
                    done();
                }
            });
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
        contains: contains,
        hasMode: hasMode
    };

    return methods;
})();

module.exports = util;