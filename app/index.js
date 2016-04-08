'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdir = require('mkdirp');
var path = require('path');
var inquirer = require('inquirer');
var q = require('q');

var Download = require('download');

var baseUri = 'https://raw.githubusercontent.com/pulsebridge/condo/develop/src/template/';

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.option('includes', {
            type: Boolean,
            alias: 'i',
            defaults: true,
            desc: 'Enable optional includes by default.'
        });
    },

    init: function() {
        this.config.save();
        this.cwd = this.env.cwd.split(path.sep).pop();
    },

    prompting: function() {
        var done = this.async();
        var checked = this.options.includes !== "false" && this.options.includes !== false;

        this.log(yosay('Welcome to the remarkable ' + chalk.red('Condo') + ' generator!'));

        var prompts = [{
            type: 'input',
            name: 'src',
            message: 'Source folder name (location where projects will be created)',
            default: 'src'
        }, {
                type: 'input',
                name: 'test',
                message: 'Test folder name (location where test projects will be created)',
                default: 'test'
            }, {
                type: 'input',
                name: 'project',
                message: 'Project name',
                default: this.cwd
            }, {
                type: 'input',
                name: 'version',
                message: 'Simple version',
                default: '1.0.0'
            }, {
                type: 'input',
                name: 'company',
                message: 'Company name',
                default: 'My Company'
            }, {
                type: 'list',
                name: 'runtime',
                message: 'Runtime (global.json)',
                default: 'coreclr',
                choices: [{
                    name: 'Common Lanuage Runtime (CLR)',
                    value: 'clr'
                }, {
                        name: 'Core Common Language Runtime (CoreCLR)',
                        value: 'coreclr'
                    }, {
                        name: 'Mono Framework (Mono)',
                        value: 'mono'
                    }]
            }, {
                type: 'checkbox',
                name: 'includes',
                message: 'Optional inclusions',
                choices: [{
                    name: 'MSBuild Support',
                    value: 'msbuild',
                    checked: checked
                }, {
                    name: 'Solution File',
                    value: 'solution',
                    checked: checked
                }, {
                    name: 'ReSharper Settings',
                    value: 'resharper',
                    checked: checked
                }, {
                    name: 'Editor configuration (.editorconfig)',
                    value: 'editorconfig',
                    checked: checked
                }, {
                    name: 'Visual Studio Code settings (settings.json)',
                    value: 'vscode',
                    checked: checked
                }, {
                    name: 'Git ignore (.gitignore)',
                    value: 'gitignore',
                    checked: checked
                }, {
                    name: 'Git attributes (.gitattributes)',
                    value: 'gitattributes',
                    checked: checked
                }, {
                    name: 'JSHint (.jshintsrc)',
                    value: 'jshint',
                    checked: checked
                }]
            }];

        this.prompt(prompts, function(props) {
            this.props = props;
            this.log('');
            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            var done = this.async();
            var log = this.log;

            var unix = q.defer();

            new Download({ mode: '750' })
                .get(baseUri + 'condo.sh')
                .dest(this.destinationRoot())
                .use(function(res, url) {
                    res.on('end', function() {
                        log(chalk.green('   fetch  ') + url.substr(url.lastIndexOf('/') + 1));
                    });
                })
                .run(function(err, files) {
                    if (err) {
                        unix.reject(err);
                        return;
                    } else {
                        unix.resolve(files);
                    }
                });

            var windows = q.defer();

            new Download()
                .get(baseUri + 'condo.cmd')
                .get(baseUri + 'condo.ps1')
                .dest(this.destinationRoot())
                .use(function(res, url) {
                    res.on('end', function() {
                        log(chalk.green('   fetch  ') + url.substr(url.lastIndexOf('/') + 1));
                    });
                })
                .run(function(err, files) {
                    if (err) {
                        windows.reject(err);
                        return;
                    } else {
                        windows.resolve(files);
                    }
                });

            var msbuild = q.defer();

            if (this.props.includes !== undefined && this.props.includes.indexOf('msbuild') > -1) {
                new Download()
                    .get(baseUri + 'condo.msbuild')
                    .dest(this.destinationRoot())
                    .use(function(res, url) {
                        res.on('end', function() {
                            log(chalk.green('   fetch  ') + url.substr(url.lastIndexOf('/') + 1));
                        });
                    })
                    .run(function(err, files) {
                        if (err) {
                            msbuild.reject(err);
                            return;
                        } else {
                            msbuild.resolve(files);
                        }
                    });
            } else {
                msbuild.resolve();
            }

            this.fs.copyTpl(
                this.templatePath('global.json'),
                this.destinationPath('global.json'),
                this.props
            );

            this.fs.copyTpl(
                this.templatePath('condo.shade'),
                this.destinationPath('condo.shade'),
                this.props
            );

            mkdir(this.destinationPath(this.props.src));
            mkdir(this.destinationPath(this.props.test));

            this.fs.copy(
                this.templatePath('yo-rc.json'),
                this.destinationPath(this.props.src + '/.yo-rc.json')
            );

            this.fs.copy(
                this.templatePath('yo-rc.json'),
                this.destinationPath(this.props.test + '/.yo-rc.json')
            );

            q.all(windows.promise, unix.promise, msbuild.promise).then(function() {
                done();
            }, function(err) {
                done(err);
            });
        },

        projectfiles: function() {
            if (this.props.includes === undefined) {
                return;
            }

            if (this.props.includes.indexOf('solution') > -1) {
                var sln = 'solution.sln';

                if (this.props.includes.indexOf('resharper') > -1) {
                    sln = 'resharper.sln';

                    this.fs.copyTpl(
                        this.templatePath('solution.sln.DotSettings'),
                        this.destinationPath(this.props.project + '.sln.DotSettings'),
                        this.props
                    );
                }

                this.fs.copyTpl(
                    this.templatePath(sln),
                    this.destinationPath(this.props.project + '.sln'),
                    this.props
                );
            }

            if (this.props.includes.indexOf('editorconfig') > -1) {
                this.fs.copy(
                    this.templatePath('editorconfig'),
                    this.destinationPath('.editorconfig')
                );
            }

            if (this.props.includes.indexOf('vscode') > -1) {
                this.fs.copy(
                    this.templatePath('settings.json'),
                    this.destinationPath('.vscode/settings.json')
                );
            }

            if (this.props.includes.indexOf('gitignore') > -1) {
                this.fs.copy(
                    this.templatePath('gitignore'),
                    this.destinationPath('.gitignore')
                );
            }

            if (this.props.includes.indexOf('gitattributes') > -1) {
                this.fs.copy(
                    this.templatePath('gitattributes'),
                    this.destinationPath('.gitattributes')
                );
            }

            if (this.props.includes.indexOf('jshint') > -1) {
                this.fs.copy(
                    this.templatePath('jshintrc'),
                    this.destinationPath('.jshintrc')
                );
            }
        }
    },

    end: function() {
        this.log('');
        this.log('Your solution structure has now been created. Use one of the following commands to get started:');
        this.log('');
        this.log(chalk.green('   *nix   ') + './condo.sh');
        this.log(chalk.green('   win    ') + 'condo');
        this.log(chalk.green('   posh   ') + './condo.ps1');
    }
});