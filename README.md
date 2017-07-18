#  `generator-apiproxy`

[![Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-img]][appveyor-url] [![Test Coverage][coveralls-img]][coveralls-url] [![Quality Gate][codacy-img]][codacy-url] [![Complexity][sonar-complexity-img]][sonar-complexity-url]<br>[![NSP Status][nsp-img]][nsp-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependencies Status][daviddm-dev-image]][daviddm-dev-url]<br>[![NPM version][npm-image]][npm-url] [![License][license-image]][license-url] [![FOSSA Status][fossa-image]][fossa-url] [![Readme Score][readme-score-img]][readme-score-url]

> ![Swagger logo][swagger-logo-20-img] Scaffold an API proxy with quality gates for Swagger, (optional) Javascript callouts, and automated build, lint, test, API documentation, packaging, and deployment to your Apigee EDGE domain of choice.

`generator-apiproxy` creates a base template to start a new API Proxy with optional tools for custom Javascript callouts. It generates a repeatable, testable, and measurable workflow that lets you focus on innovation without sacrificing quality or extensibility.

## Table of contents

<!-- toc -->

- [1. Installation](#1-installation)
- [2. Usage](#2-usage)
  * [2.1. Generate a new API Proxy project](#21-generate-a-new-api-proxy-project)
  * [2.2. Sub-generators](#22-sub-generators)
    + [2.2.1. `apiproxy:boilerplate` sub-generator](#221-apigee-apiproxyboilerplate-sub-generator)
    + [2.2.2. `apiproxy:cli` sub-generator](#222-apigee-apiproxycli-sub-generator)
    + [2.2.3. `apiproxy:editorconfig` sub-generator](#223-apigee-apiproxyeditorconfig-sub-generator)
    + [2.2.4. `apiproxy:eslint` sub-generator](#224-apigee-apiproxyeslint-sub-generator)
    + [2.2.5. `apiproxy:git` sub-generator](#225-apigee-apiproxygit-sub-generator)
    + [2.2.6. `apiproxy:jsc` sub-generator](#226-apigee-apiproxyjsc-sub-generator)
    + [2.2.7. `apiproxy:nsp` sub-generator](#227-apigee-apiproxynsp-sub-generator)
    + [2.2.8. `apiproxy:readme` sub-generator](#228-apigee-apiproxyreadme-sub-generator)
- [3. Automating API Proxy CI/CD workflows](#3-automating-api-proxy-cicd-workflows)
  * [3.1. **Design** your API with Swagger UI](#31-design-your-api-with-swagger-ui)
  * [3.2. **Build**, **lint**, **test**, **document**, and **push** to Git](#32-build-lint-test-document-and-push-to-git)
  * [3.3. **Package** all `apiproxy` artifacts](#33-package-all-apiproxy-artifacts)
  * [3.4. **Deploy** the `apiproxy` package to Apigee EDGE](#34-deploy-the-apiproxy-package-to-apigee-edge)
- [4. Quality gates, reports, and documentation](#4-quality-gates-reports-and-documentation)
  * [4.1. **Validate** Swagger documentation](#41-validate-swagger-documentation)
  * [4.2. **Analyze** Javascript callout source code](#42-analyze-javascript-callout-source-code)
  * [4.3. **Test** Javascript callouts](#43-test-javascript-callouts)
  * [4.4. **Generate** API documentation and complexity reports](#44-generate-api-documentation-and-complexity-reports)
    + [4.4.1. Only generate OpenAPI/Swagger docs](#441-only-generate-openapiswagger-docs)
    + [4.4.2. Only generate `jsc` API docs and complexity reports](#442-only-generate-jsc-api-docs-and-complexity-reports)
- [5. Release management automation](#5-release-management-automation)
- [6. Contributing to `generator-apiproxy`](#6-contributing-to-generator-apiproxy)
- [7. Version and CHANGELOG](#7-version-and-changelog)
- [8. License](#8-license)

<!-- tocstop -->

<!-- tocend -->

## 1. Installation

To install `generator-apiproxy`, open a terminal and run:

```bash

$ npm install generator-apiproxy --global
```

## 2. Usage

> :information_source: `generator-apiproxy` will generate files in the current working directory, so be sure to change to a new directory first if you don't want to overwrite existing files.

`generator-apiproxy` supports CD workflows that can be executed in a command-line interface.

### 2.1. Generate a new API Proxy project

To scaffold a new API Proxy project, open a terminal and create a new, empty directory:

```bash
# Create a new directory
$ mkdir auth-proxy

# Enter your new directory
$ cd auth-proxy
```

Run the `app` generator:

```bash
# Scaffold a new API Proxy project
$ yo apigee-apiproxy
# Answer the prompts till done
```
### 2.2. Sub-generators

If you don't need all the features provided by the main generator, or you're working
with an existing repository, you can still use a limited set of features by running
these sub-generators directly.

> :sos: **Need help with a sub-generator?**
>
> You can view each sub-generator's options by running
>
> ```sh
> # View usage help for a sub-generator
> $ yo apiproxy:<sub-generator-name> --help
> ```

* **`apiproxy:boilerplate`** Generate common directories and files.
* **`apiproxy:cli`** Generate a `lib/cli.js` executable.
* **`apiproxy:editorconfig`** Generate an `.editorconfig` file.
* **`apiproxy:eslint`** Add ESLint with a standard configuration for code quality and vulnerability inspection.
* **`apiproxy:git`** Add `.gitattributes` and `.gitignore` files. (`.gitignore` provides common patterns for Javascript _and_ Java projects.)
* **`apiproxy:jsc`** Stub a Javascript callout and its `jest` test.
* **`apiproxy:nsp`** Add the Node Security Program's `nsp` module to check for known Node.js vulnerabilities.
* **`apiproxy:readme`** Add are README.md to your repository's root.

#### 2.2.1. `apiproxy:boilerplate` sub-generator

Generate common directories and files to facilitate team communication and standardize your CI/CD workflows:

```bash

$ yo apiproxy:boilerplate
# => create package.json
# => create jest.config.json
# => create sonar-project.properties
# => create .assets/README.md
# => create .assets/media/README.md
# => create .assets/media/audio/README.md
# => create .assets/media/img/README.md
# => create .assets/media/video/README.md
# => create .github/CODE_OF_CONDUCT.md
# => create .github/CONTRIBUTING.md
# => create .github/ISSUE_TEMPLATE.md
# => create .github/PULL_REQUEST_TEMPLATE.md
# => create .github/README.md
# => create apiproxy/README.md
# => create apiproxy/policies/README.md
# => create apiproxy/proxies/README.md
# => create apiproxy/resources/jsc/README.md
# => create apiproxy/targets/README.md
# => create openapi/README.md

# Install all dependencies and devDependencies
$ npm install

```

> **:bulb: Don't forget to run `npm install`!**

#### 2.2.2. `apiproxy:cli` sub-generator

This feature has not been implemented yet, but it is available for development.

#### 2.2.3. `apiproxy:editorconfig` sub-generator

> :speech_balloon: [EditorConfig][editorconfig-url] helps developers define and maintain
> consistent coding styles between different editors and IDEs. The EditorConfig
> project consists of a file format for defining coding styles and a collection
> of text editor plugins that enable editors to read the file format and adhere
> to defined styles. EditorConfig files are easily readable and they work nicely
> with version control systems.
>
> Team, E. (n.d.). EditorConfig. Retrieved July 11, 2017, from http://editorconfig.org/

**Add an `.editorconfig` file to your project's root directory:**

```bash
# Run this from your project's root directory
$ yo apiproxy:editorconfig
# => create .editorconfig
```

#### 2.2.4. `apiproxy:eslint` sub-generator

[ESLint][eslint-github-url] is a configurable [linting][lint-def-url] utility
that evaluates Javascript and JSX for code standards compliance and best
practices. ESLint enjoys a wealth of plugins that also analyze source code for
potential security vulnerabilities.

The `apiproxy:eslint` sub-generator

* Updates your project's `package.json`'s `devDependencies` with:
    * [`eslint-plugin-json`](https://github.com/sindresorhus/eslint-json): Reports invalid JSON
	* [`eslint-plugin-no-unsafe-innerhtml`](https://www.npmjs.com/package/eslint-plugin-no-unsafe-innerhtml): Disallows unsafe HTML templating
	* [`eslint-plugin-node`](https://www.npmjs.com/package/eslint-plugin-node): Extends rules specific to Node.js
	* [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise): Enforces best practices for JavaScript promises
	* [`eslint-plugin-scanjs-rules`](https://www.npmjs.com/package/eslint-plugin-scanjs-rules): Supplemental security rules
	* [`eslint-plugin-security`](https://www.npmjs.com/package/eslint-plugin-security): Identifies potential vulnerabilities
	* [`eslint-plugin-standard`](https://www.npmjs.com/package/eslint-plugin-standard): Rules for the [JavaScript Standard Style](https://standardjs.com/)
* Adds an `.eslintignore` pre-configured to exclude third-party dependencies
* Adds an `.eslintrc.yml` file with `strict-standard` rules and plugins enabled.

**Add ESLint to your project:**

```bash
$ yo apiproxy:eslint
# =>  create .eslintignore
# => create .eslintrc.yml

# Install the new devDependencies
$ npm i
```

> **:bulb: Don't forget to run `npm install`!**

#### 2.2.5. `apiproxy:git` sub-generator

Avoid accidentally pushing unnecessary Node.js and Java files to your Git repository
with a `.gitignore` file created on [.gitignore.io](https://www.gitignore.io/api/node,java,java-web,code-java).

**Add `.gitignore` and `.gitattributes` files to your project:**

```bash
$ yo apiproxy:git
# => create .gitattributes
# => create .gitignore
```

#### 2.2.6. `apiproxy:jsc` sub-generator

Apigee lets you add custom JavaScript code that executes within the context of
an API proxy flow. In your custom JavaScript code, you can use the objects,
methods, and properties of the
[Apigee Edge JavaScript object model][apigee-edge-js-url]. The object model lets
you get, set, and remove variables in the proxy flow context. You can also use
basic cryptographic functions that are provided with the object model.

**Create a Javascript callout (`jsc`) source code and `jest` test stubs:**

```bash

# Add a Javascript callout and test stubs
$ yo apiproxy:jsc foo-bar-lib
# => create lib/foo-bar-lib.js
# => create lib/__tests__/fooBarLib.test.js

```

#### 2.2.7. `apiproxy:nsp` sub-generator

The Node Security Platform provides continuous security monitoring for Node.js
applications. These checks also integrate into your GitHub pull request flows.

**Add Node Security Program checks to your project:**

```bash
$ yo apiproxy:nsp
# => force package.json

# Install the nsp tools
$ npm install
```

> **:bulb: Don't forget to run `npm install`!**

#### 2.2.8. `apiproxy:readme` sub-generator

Your repository's "home page" is the README.md file. A good README helps attract
new consumers as well as new contributors. Consequently, this sub-generator's
README template includes a [ScoreMe][scoreme-url] badge to grade your README's
quality based on the same formula that CocaoPods uses to evaluate the quality of
your copy.

**Add a README (with badges) to your project:***

```bash
# Create a README.md (a repository home page)
$ yo apiproxy:readme
// => create README.md

```


```bash
# Create documentation
$ yo apiproxy:docs
// => create package.json
// => create docs/COMPLEXITY.md
// => create docs/JSCS.md
// => create docs/README.md
// => create docs/SWAGGER.md
// => create docs/TERMS_OF_SERVICE.md

```

```bash
# Add code quality and security analysis for Javascript callouts
$ yo apiproxy:eslint
// => create .eslintignore
// => create .eslintrc.yml

```

## 3. Automating API Proxy CI/CD workflows

Projects created with `generator-apiproxy` include `npm-scripts` that
facilitate automated API Proxy design, builds, linting, testing, documentation,
version control, semantic versioning, CHANGELOG generation, packaging, and deployment
to Apigee EDGE.

Here's a recommended sequence of tasks and commands you can incorporate into
your CI/CD value streams.

### 3.1. **Design** your API with Swagger UI

1. Go to the [online Swagger Editor](http://editor.swagger.io/#/).
2. Create a well-formed Swagger document.
3. Copy the Swagger document to your clipboard.
4. Open an IDE and paste the Swagger's YAML into a new file.
5. Save the file to `openapi` directory.

### 3.2. **Build**, **lint**, **test**, **document**, and **push** to Git

If you're a lazy programmer (like me), you can run:

```bash

$ npm run build-test-push
```

Or, if that's too many characters for you, run the abbreviated command:

```bash

$ npm run btp

```

This will execute a:

1. :factory: Build. If the build passes, then it will execute
2. :100: Test, which includes these quality gates:
    1. :bathtub: Lint the
	    * Swagger documents and the
		* Javascript callout source code (if any exists). If all's good, then it will
	2. :school: Test with `jest`. If all tests pass within the coverage threshold, it will check
	3. :lock: Security (with [`nsp`][nsp-url]). If prelimary security checks pass, it'll
3. :page_facing_up: Document your
    * Swagger spec and
	* Javascript callout code (both of which you'll find in the [`docs`](./docs) directory). Finally, it'll
4. :arrow_up: Commit and push to Git.

> **:warning: `npm run btp` generates an automated commit message**
>
> The [`prepend-header.sh`](./.github/assets/prepend-header.sh) shell script will
> use the default message "docs(api): auto-generate api docs and complexity report".
> The script can accept an alternate commit message, but that's not available from
> the `npm-script btp`, yet. If you want add that, submit a pull request :v:.

### 3.3. **Package** all `apiproxy` artifacts

Finally, you can update the repository's `apiproxy` -- your final build -- by running:

```bash

$ npm run apigee:apiproxy:update
```

This uses [`openapi2apigee`][openapi2apigee-url] behind the scenes to update the `apiproxy` artifacts
and generate an `apiproxy.zip` file in your project's root directory.

### 3.4. **Deploy** the `apiproxy` package to Apigee EDGE

Run:

```bash

$ npm run apigee:apiproxy:deploy

```

This not only generates `apiproxy` artifacts, but also deploys to an Apigee EDGE host of your choosing.

## 4. Quality gates, reports, and documentation

`generator-apiproxy` creates a consistent repository with tools that enforce Swagger quality; Javascript quality; and Javascript unit tests and code coverage.

### 4.1. **Validate** Swagger documentation
> :trophy: `generator-apiproxy` validates Swagger docs with [`swagger-cli`][swagger-cli-url].

[`swagger-cli`][swagger-cli-url] validation runs before every test execution:

```bash

$ npm test

```

[`swagger-api/validator-badge`](https://github.com/swagger-api/validator-badge)s display whether there are syntactic issues with you Swagger/OpenAPI 2.0 document:

* **Valid:** [![Swagger Validity][swagger-validity-img]][swagger-validity-url] `cordova-contacts.swagger.yaml`
* **Invalid:** [![Swagger Validity](https://img.shields.io/swagger/valid/2.0/http/api.swindle.net/cordova/v6/contacts/openapi.md.svg)](http://online.swagger.io/validator/debug?url=https://raw.githubusercontent.com/gregswindle/generator-apiproxy/master/README.md)


### 4.2. **Analyze** Javascript callout source code
> :closed_lock_with_key: :bath: :ocean: `generator-apiproxy` lints source code; checks for vulnerabilities; assesses dependency drift; and executes quality gates with `BitHound`, `eslint`, `nsp`, and `SonarQube`/`sonarcloud`.
>
> The results are displayed real-time with README badges.

Code quality analysis runs before every test execution:

```bash

$ npm test

```

If you'd like an `eslint` report in HTML (with links to errors and warnings), run the following command to generate a `eslint-report.html`:

```bash

$ npm run eslint:html

```

### 4.3. **Test** Javascript callouts
> :100: `generator-apiproxy` uses `jest` for BDD spec execution and code coverage analysis.
>
> The results are displayed real-time with README badges.

Run:

```bash

$ npm test

```

This generates:

* Detailed code coverage reports at `coverage/lcov-report/index.html`, as well as
* `lcov.info` and `clover.xml` files, which you can send to CI test coverage services like Coveralls.
* Static markdown API documentation with complexity reports in the `docs/` directory.

### 4.4. **Generate** API documentation and complexity reports
> :page_facing_up: `generator-apiproxy` comes with [`jsdoc-to-markdown`][jsdoc2md-url], [`complexity-report`][complexity-report-url], and [`swagger-markdown`][swagger-markdown-url] that generate static markdown documentation.

To generate API docs, Swagger docs, and complexity reports in the `docs` directory, run:

```bash

$ npm run docs

```

#### 4.4.1. Only generate OpenAPI/Swagger docs

If you want to inspect your static OpenAPI docs before you push to source control or before you release your `apiproxy` to Apigee EDGE, run:

```bash

# Only generate static Swagger API docs (as markdown)
$ npm run docs:swagger:apis

# Generate static Swagger API docs with custom parameters
$ npm run docs:swagger-markdown -- -i /path/to/swagger.yml -o /path/to/swagger-api.md
```

#### 4.4.2. Only generate `jsc` API docs and complexity reports

If your `apiproxy` has Javascript callouts, you can preview your callouts' documentation and complexity reports in the `docs` directory by running:

```bash

$ npm run docs:jsc

# Access jsdoc2md directly, e.g.,
$ npm run docs:jsdoc2md --  --partial .assets/jsdoc2md/*.hbs --files lib/*.js > docs/README.md

```

## 5. Release management automation

If you and your team write commit messages that comply with the the Conventional Commit Message Specification, `generator-apiproxy` can use `standard-version` to automate

* Semantic versioning (with Git tags), and
* CHANGELOG generation

When you're ready to release, run:

```bash

$ npm run release

```

## 6. Contributing to `generator-apiproxy`

[![PRs Welcome][makeapullrequest-image]][makeapullrequest-url] We welcome contributors and pull requests. Check out the guidelines for

* [Contributing to `generator-apiproxy`](./.github/CONTRIBUTING.md) and our
* [Contributor Covenant Code of Conduct][code-of-conduct-url].

Contributions are stories with a beginning, a middle, and an end, all told through issues, comments, commit logs, and pull requests.

 * [Peruse open issues][issues-url] or
 * [Open a new pull request (PR)][pr-url]

## 7. Version and CHANGELOG

`generator-apiproxy`'s latest version is <!-- semver -->[`v0.0.0`][changelog-url]<!-- semverend -->. Please read the [CHANGELOG][changelog-url] for details.

## 8. License

[Apache-2.0][license-url] © [Greg Swindle][author-url]

---

[![License][license-image]][license-url] [![FOSSA Status][fossa-image]][fossa-url] [![Readme Score][readme-score-img]][readme-score-url] [![Greenkeeper][greenkeeper-img]][greenkeeper-url]



[api-docs-url]: https://github.com/gregswindle/generator-apiproxy/docs/API.md
[apigee-edge-js-url]: http://docs.apigee.com/api-services/reference/javascript-object-model
[appveyor-img]: https://ci.appveyor.com/api/projects/status/soifv1lpkf5lxppg/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/gregswindle/generator-apiproxy/branch/master
[author-url]: https://github.com/gregswindle
[changelog-url]: https://github.com/gregswindle/generator-apiproxy/CHANGELOG.md
[codacy-img]: https://api.codacy.com/project/badge/Grade/fa4ade3f68a04b9cad26165a59ceb88e
[codacy-url]: https://www.codacy.com/app/greg_7/generator-apiproxy?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gregswindle/generator-apiproxy&amp;utm_campaign=Badge_Grade
[code-of-conduct-url]: ./.github/CODE_OF_CONDUCT.md
[complexity-report-url]: https://github.com/escomplex/complexity-report
[coveralls-img]: https://coveralls.io/repos/github/gregswindle/generator-apiproxy/badge.svg
[coveralls-url]: https://coveralls.io/r/gregswindle/generator-apiproxy
[daviddm-dev-image]: https://david-dm.org/gregswindle/generator-apiproxy/dev-status.svg
[daviddm-dev-url]: https://david-dm.org/gregswindle/generator-apiproxy?type=dev
[daviddm-image]: https://david-dm.org/gregswindle/generator-apiproxy.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gregswindle/generator-apiproxy
[editorconfig-url]: http://editorconfig.org/
[eslint-github-url]: https://github.com/eslint/eslint
[fossa-image]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgregswindle%2Fgenerator-apiproxy.svg?type=shield
[fossa-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fgregswindle%2Fgenerator-apiproxy?ref=badge_shield
[greenkeeper-img]: https://badges.greenkeeper.io/gregswindle/generator-apiproxy.svg?style=flat-square
[greenkeeper-url]: https://greenkeeper.io/
[issues-url]: https://github.com/gregswindle/generator-apiproxy/issues
[jsdoc2md-url]: https://github.com/jsdoc2md/jsdoc-to-markdown
[license-image]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat
[license-url]: ./LICENSE
[lint-def-url]: https://en.wikipedia.org/wiki/Lint_(software)
[makeapullrequest-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[makeapullrequest-url]: http://makeapullrequest.com
[npm-image]: https://badge.fury.io/js/generator-apiproxy.svg
[npm-url]: https://npmjs.org/package/generator-apiproxy
[nsp-img]: https://nodesecurity.io/orgs/gregswindle/projects/a3912719-529f-457f-9ff6-53fa70d8f475/badge
[nsp-url]: https://nodesecurity.io/orgs/gregswindle/projects/a3912719-529f-457f-9ff6-53fa70d8f475
[pr-url]: https://github.com/gregswindle/generator-apiproxy/pulls
[readme-score-img]: http://readme-score-api.herokuapp.com/score.svg?url=https://github.com/gregswindle/generator-apiproxy
[readme-score-url]: http://clayallsopp.github.io/readme-score?url=https://github.com/gregswindle/generator-apiproxy
[scoreme-url]: http://clayallsopp.github.io/readme-score/
[sonar-cognitive-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-generator-apiproxy&metric=cognitive_complexity
[sonar-cognitive-url]: https://sonarcloud.io/component_measures/metric/cognitive_complexity/list?id=gregswindle-generator-apiproxy
[sonar-complexity-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-generator-apiproxy&metric=function_complexity
[sonar-complexity-url]: https://sonarcloud.io/component_measures/domain/Complexity?id=gregswindle-generator-apiproxy
[sonar-coverage-img]: http://sonarcloud.io/api/badges/measure?key=gregswindle-generator-apiproxy&metric=coverage
[sonar-coverage-url]: https://sonarcloud.io/component_measures/domain/Coverage?id=gregswindle-generator-apiproxy
[sonar-gate-img]: http://sonarcloud.io/api/badges/gate?key=gregswindle-generator-apiproxy
[sonar-gate-url]: http://sonarcloud.io/dashboard/index/gregswindle-generator-apiproxy
[sonar-tech-debt-img]:  https://sonarcloud.io/api/badges/measure?key=gregswindle-generator-apiproxy&metric=sqale_debt_ratio
[sonar-tech-debt-url]: https://sonarcloud.io/component_measures/metric/sqale_index/list?id=gregswindle-generator-apiproxy
[swagger-cli-url]: https://github.com/BigstickCarpet/swagger-cli
[swagger-logo-20-img]: ./.assets/media/img/swagger-logo-20.png
[swagger-markdown-url]: https://github.com/syroegkin/swagger-markdown
[swagger-validity-img]: https://img.shields.io/swagger/valid/2.0/http/api.swindle.net/cordova/v6/contacts/openapi.json.svg
[swagger-validity-url]: http://online.swagger.io/validator/debug?url=http://api.swindle.net/cordova/v6/contacts/openapi.json
[travis-image]: https://travis-ci.org/gregswindle/generator-apiproxy.svg?branch=master
[travis-image]: https://travis-ci.org/gregswindle/generator-apiproxy.svg?branch=master
[travis-url]:  https://travis-ci.org/gregswindle/generator-apiproxy
[travis-url]: https://travis-ci.org/gregswindle/generator-apiproxy
