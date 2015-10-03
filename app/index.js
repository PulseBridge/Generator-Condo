'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdir = require('mkdirp');
var path = require('path');
var inquirer = require('inquirer');

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

  prompting: function () {
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
      default: 'PulseBridge, Inc'
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

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('build.cmd'),
        this.destinationPath('build.cmd')
      );

      this.fs.copy(
        this.templatePath('build.ps1'),
        this.destinationPath('build.ps1')
      );

      this.fs.copy(
        this.templatePath('build.sh'),
        this.destinationPath('build.sh')
      );

      this.fs.copyTpl(
        this.templatePath('global.json'),
        this.destinationPath('global.json'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('make.shade'),
        this.destinationPath('make.shade'),
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
    },

    projectfiles: function () {
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

      if (this.props.includes.indexOf('jsint') > -1) {
        this.fs.copy(
          this.templatePath('jshintrc'),
          this.destinationPath('.jshintrc')
        );
      }
    }
  },

  end: function() {
    this.log('\r\n');
    this.log('Your solution structure is now created. Use the following commands to get started.');
    this.log(chalk.green('     ./build.sh verify'));
    this.log('\r\n');
  }
});
