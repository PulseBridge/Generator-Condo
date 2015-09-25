# generator-condo [![Build Status](https://img.shields.io/travis/PulseBridge/Generator-Condo.svg)](https://travis-ci.org/PulseBridge/Generator-Condo) [![NPM Version](https://img.shields.io/npm/v/generator-condo.svg)](https://www.npmjs.org/package/generator-condo)

> A Yeoman Generator for [Condo](http://open.pulsebridge.com/condo)

## Getting Started

### What is Condo?

Condo is a cross-platform command line interface (CLI) build system for projects using the .NET Core Framework. It is capable of automatically detecting and executing all of the steps
necessary to make a DNX project function correctly, including, but not limited to:

* Automatic semantic versioning
* Restoring package manager dependencies (NuGet, NPM, Bower)
* Executing default task runner commands (Grunt, Gulp)
* Compiling projects and test projects
* Executing unit tests
* Packing NuGet packages
* Pushing (Publishing) NuGet packages

These are just some of the most-used features of the build system. For more information, please refer to the [official documentation](http://open.pulsebridge.com/condo).

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-condo from npm, run:

```bash
npm install -g generator-condo
```

Finally, initiate the generator:

```bash
yo condo
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)