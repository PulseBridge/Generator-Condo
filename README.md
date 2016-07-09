# generator-condo

> A Yeoman Generator for [Condo][condo-url]

[![][screen-image]][npm-url]

## Vitals

Info          | Badges
--------------|--------------
Version       | [![Version][npm-v-image]][npm-url]
License       | [![License][license-image]][license]
Downloads     | [![NPM Downloads][npm-d-image]][npm-url]
Build Status  | [![Travis Build Status][travis-image]][travis-url]
Chat          | [![Join Chat][gitter-image]][gitter-url]

## Getting Started

### What is Condo?

Condo is a cross-platform command line interface (CLI) build system for projects using NodeJS, CoreCLR, .NET Framework, or... well, anything.
It is capable of automatically detecting and executing all of the steps necessary to make <any> project function correctly, including, but not limited to:

* Automatic semantic versioning
* Restoring package manager dependencies (NuGet, NPM, Bower)
* Executing default task runner commands (Grunt, Gulp)
* Compiling projects and test projects (package.json and msbuild)
* Executing unit tests (xunit, mocha, jasmine, karma, protractor)
* Packing NuGet packages
* Pushing (Publishing) NuGet packages

These are just some of the most-used features of the build system. For more information, please refer to the [official documentation][condo-url].

### Using Condo

1. Make sure that you have [Yeoman][yo-url] installed:

	```bash
	npm install -g yo
	```

2. Install the Condo generator:

	```bash
	npm install -g generator-condo
	```

3. Initiate the generator:

	```bash
	yo condo
	```

4. Run the build:

	OS X / Linux:

	```bash
	./condo.sh
	```

	Windows (CLI):

	```cmd
	condo
	```

	Windows (PoSH):
	```posh
	./condo.ps1
	```

### Options

The generator allows you to specify several options, which results in a customized experience.

#### Source Folder Name

The name of the folder where you intend to add one or more projects to your "solution".

`Default Value: (src)`

This value is used to set the `projects` property in the resulting `global.json` file.

#### Test Folder Name

The name of the folder where you intend to add one or more test projects to your "solution".

`Default Value: (test)`

This value is used to set the `projects` property in the resulting `global.json` file.

#### Project Name

The name of your project.

`Default Value: name of the folder in which the generator was executed`

This value is set in the resulting `make.shade` file, which is subsequently used to set the project name in assemblies built by condo.
It is also used as the name of the solution and ReSharper settings files (if included).

#### Simple Version

`Default Value: 1.0.0`

This value is set in the resulting `make.shade` file, which is subsequently used to generate and set the semantic version in assemblies built by condo.

#### Company Name

`Default Value: My Company`

This value is set in the resulting `make.shade` file, which is subseqently used to generate and set the company name in assemblies built by condo.
It is also used to set the name of the company in the file header template within the ReSharper settings file (if included).

#### Runtime

`Default Value: CoreCLR`

This value is used to set the `sdk` property in the resulting `global.json` file.

#### Inclusions

All of the inclusions identified below are enabled by default to make it as easy as possible to get started with a new project. That being said,
we are fully aware that most of these inclusions are highly subjective. For the control freaks among us (ourselves included), you can inverse this
situation (all includes off by default) when you execute the condo generator:

```bash
yo condo --includes false
```

* **Solution File**: A solution file (sln) used to open the project in Visual Studio on Windows.
* **ReSharper Settings**: Settings file (sln.DotSettings) used to configure ReSharper on Windows with some basic recommendations.
* **Editor Configuration**: A configuration file (.editorconfig) used to configure plain-text editors that support the standard.
* **Visual Studio Code Settings**: A settings file (.vscode/settings.json) used to configure Visual Studio Code.
* **Git Ignore**: An ignore file (.gitignore) used to ignore artifacts created by condo in addition to many other build-time artifacts.
	- This is based on the [gitignore project][gitignore-url].
* **Git Attributes**: An attributes file (.gitattributes) used to configure cross-platform management of file types within a git repository.
* **JSHint**: A hint file (.jshintrc) used to configure JSHint and auto-completion toolsets in various editors.
* **Code Analysis Dictionaries**: A code analysis dictionary using reasonable defaults for both the src and test folders (.NET)
* **StyleCop Settings**: A StyleCop configuration file used for the StyleCop Rosyln Analyzers (.NET).

### CLI Options

* _--includes_ : A value indicating whether or not to enable includes.

## Questions or Comments?

For questions or comments related to the _generator_, please open an issue on the [condo-generator][gh-gen-url] repository on GitHub.

For questions or comments related to _condo_ itself, please open an issue on the [condo][gh-condo-url] repository on GitHub.

## Copyright and License

©. PulseBridge, Inc. and contributors. Distributed under the [APACHE 2.0][license-url] license. See [LICENSE][] and [CREDITS][] for details.

[license-image]: https://img.shields.io/npm/l/generator-condo.svg
[license]: LICENSE
[credits]: CREDITS

[npm-url]: //www.npmjs.com/package/generator-condo
[npm-v-image]: https://img.shields.io/npm/v/generator-condo.svg
[npm-d-image]: https://img.shields.io/npm/dm/generator-condo.svg

[travis-image]: https://img.shields.io/travis/pulsebridge/generator-condo/develop.svg
[travis-url]: //travis-ci.org/pulsebridge/generator-condo

[condo-url]: http://open.pulsebridge.com/condo
[license-url]: http://www.apache.org/licenses/LICENSE-2.0
[yo-url]: //github.com/yeoman/yo
[yo-start-url]: //github.com/yeoman/yeoman/wiki/Getting-Started
[gitignore-url]: //github.com/github/gitignore

[gh-gen-url]: //github.com/pulsebridge/generator-condo
[gh-condo-url]: //github.com/pulsebridge/condo

[screen-image]: https://cloud.githubusercontent.com/assets/1803684/10266071/b6d6f8e6-6a00-11e5-9386-c9da0281f5dd.gif

[gitter-url]: //gitter.im/pulsebridge/generator-condo
[gitter-image]:https://img.shields.io/badge/⊪%20gitter-join%20chat%20→-1dce73.svg