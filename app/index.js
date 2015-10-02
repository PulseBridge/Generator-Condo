'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdir = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.config.save();
    this.cwd = this.env.cwd.split(path.sep).pop();
  },
  
  prompting: function () {
    var done = this.async();

    this.log(yosay('Welcome to the remarkable ' + chalk.red('Condo') + ' generator!'));

    var prompts = [{
      type: 'input',
      name: 'src',
      message: 'Source folder name',
      default: 'src'
    }, {
      type: 'input',
      name: 'test',
      message: 'Test folder name',
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
      default: 'PulseBridge, Inc.'
    }, {
      type: 'list',
      name: 'runtime',
      message: 'Runtime',
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
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      
      this.fs.copy(
        this.templatePath('settings.json'),
        this.destinationPath('.vscode/settings.json')
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
      
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },
  
  end: function() {
    this.log('\r\n');
    this.log('Your solution structure is now created. Use the following commands to get started.');
    this.log(chalk.green('     ./build.sh verify'));
    this.log('\r\n');
  }
});
