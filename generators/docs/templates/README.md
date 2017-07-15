# `<%= projectName %>` API Proxy technical docs
> **📂 Static API documentation for `<%= projectName %>`'s `/resources/jsc/` Javascript objects.**

## Table of contents

<!-- toc -->

- [1. Static Swagger/OpenAPI documentation](#1-static-swaggeropenapi-documentation)
- [2. Apigee Javascript callouts (`jsc`s)](#2-apigee-javascript-callouts-jscs)
  * [2.1 Create Javascript callout (`jsc`) source code and test stubs](#21-create-javascript-callout-jsc-source-code-and-test-stubs)
  * [2.2. Execute your `jsc`'s specs](#22-execute-your-jscs-specs)
  * [2.3. Evaluate your callout's quality and maintainability](#23-evaluate-your-callouts-quality-and-maintainability)
- [3. Quality assurance dashboard](#3-quality-assurance-dashboard)

<!-- tocstop -->

## 1. Static Swagger/OpenAPI documentation

To generate documentation in this directory, open a terminal and run:

```sh
$ npm run docs
```

Depending on your API Proxy's resources, `npm run docs` will generate the following documents:

|    | Document                               | Description                                                 |
|:---|:-----------------------------------------|:------------------------------------------------------------|
|  1 | [**Complexity report**][complexity]      | Calculates the maintainability of your Javascript callouts. |
|  2 | [**Javascript callout API docs**][jscs]  | Javascript callout definitions based on JSDoc annotations.  |
|  3 | [**OpenAPI/Swagger API docs**][swagger]  | A _static_ file you can use to preview your API Proxy's documentation before it's published, and that potential contributors can read from your repository. |
|  4 | [**OneAPI Terms Of Service**][tos]       | Legal terms and conditions associated with the consumption and use of the  `<%= projectName %>` API Proxy. |

> 📄 The first two documents--Complexity report and Javascript callout API docs--will not be generated unless your API Proxy includes custom Javascript resources.

## 2. Apigee Javascript callouts (`jsc`s)

Sometimes an API Proxy requires policy enforcement that cannot be declared with XML-based polices alone. In these cases, Apigee EDGE allows you to add custom JavaScript code that executes within the context of an API proxy flow. In your custom JavaScript code, you can use the objects, methods, and properties of the [Apigee Edge JavaScript object model][apigee-edge-jsc-url]. The object model lets you get, set, and remove variables in the proxy flow context. You can also use basic cryptographic functions that are provided with the object model.

> **:mortar_board: When Javascript callouts are warrented: the [`cordova-contacts-swagger-api`][cc-swagger-api-url]**
>
> Adapting one interface to conform to another is a common use case that's appropriate for Javascript callouts. Check out the [`cordova-contacts-swagger-api`][cc-swagger-api-url] project--which was build with `generator-apiproxy`--as an example.

The `apiproxy:jsc` sub-generator scaffolds these callouts.

### 2.1 Create Javascript callout (`jsc`) source code and test stubs

Open a Terminal and run:

```sh
$ yo apiproxy:jsc foo-bar-lib
# Creates a callout stub and its spec (aka "test")
# =>     lib/foo-bar-lib.js
# =>     lib/__tests__/fooBarLib.test.js
```

### 2.2. Execute your `jsc`'s specs

Run `jest` to for unit test results, coverage reports, and complexity analysis:

```sh

$ npm test
```

### 2.3. Evaluate your callout's quality and maintainability

To assess code quality, security vulnerabilities, code smells, test coverage, run this command:

```sh

$ npm run docs
```

## 3. Quality assurance dashboard
[![Quality Gate][sonar-gate-img]][sonar-gate-url]

> 🔬  Assess code quality, security vulnerabilities, code smells, test coverage, duplications, technical debt, reliability, maintainability, complexity, and blocking issues.
>
> 📊 Select the badges below for detailed SonarQube reports.

| Measure             | Scores                                                             |
|:--------------------|:-------------------------------------------------------------------|
| **Complexity**      | [![Complexity][sonar-complexity-img]][sonar-complexity-url] [![Cognitive complexity][sonar-cognitive-img]][sonar-cognitive-url] |
| **Coverage**        | [![Sonar coverage][sonar-coverage-img]][sonar-coverage-url]        |
| **Duplications**    | [![Duplications][sonar-duplications-img]][sonar-duplications-url]  |
| **Issues**          | [![Issues][sonar-issues-img]][sonar-issues-url]                    |
| **Maintainability** | [![Code smells][sonar-code-smells-img]][sonar-code-smells-url]  [![Maintainability][sonar-maintainability-img]][sonar-maintainability-url] [![Technical debt][sonar-tech-debt-img]][sonar-tech-debt-url] |
| **Reliability**     | [![Reliability][sonar-reliability-img]][sonar-reliability-url]     |
| **Security**        | [![Security][sonar-security-img]][sonar-security-url]              |

---

<%= license %> © [<%= author.name %>](<%= author.url %>)

[cc-swagger-api-url]: https://github.com/gregswindle/cordova-contacts-swagger-api
[complexity]: ./COMPLEXITY.md
[jscs]: ./JSCS.md
[swagger]: ./SWAGGER.md
[tos]: ./TERMS_OF_SERVICE
[apigee-edge-jsc-url]: http://docs.apigee.com/api-services/reference/javascript-object-model
[<%= githubAccount %>-url]: https://github.com/<%= githubAccount %>
[inch-ci-img]: http://inch-ci.org/github/<%= githubAccount %>/<%= projectName %>.svg?branch=master
[inch-ci-url]: http://inch-ci.org/github/<%= githubAccount %>/<%= projectName %>
[license-url]: https://www.apache.org/licenses/LICENSE-2.0
[sonar-code-smells-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=code_smells
[sonar-code-smells-url]: https://sonarcloud.io/component_measures/metric/code_smells/list?id=<%= githubAccount %>-<%= projectName %>
[sonar-cognitive-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=cognitive_complexity
[sonar-cognitive-url]: https://sonarcloud.io/component_measures/metric/cognitive_complexity/list?id=<%= githubAccount %>-<%= projectName %>
[sonar-complexity-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=function_complexity
[sonar-complexity-url]: https://sonarcloud.io/component_measures/domain/Complexity?id=<%= githubAccount %>-<%= projectName %>
[sonar-coverage-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=coverage
[sonar-coverage-url]: https://sonarcloud.io/component_measures/domain/Coverage?id=<%= githubAccount %>-<%= projectName %>
[sonar-duplications-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=duplicated_line_density
[sonar-duplications-url]: https://sonarcloud.io/component_measures/domain/Duplications?id=<%= githubAccount %>-<%= projectName %>
[sonar-gate-img]: http://sonarcloud.io/api/badges/gate?key=<%= githubAccount %>-<%= projectName %>
[sonar-gate-url]: http://sonarcloud.io/dashboard/index/<%= githubAccount %>-<%= projectName %>
[sonar-issues-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=blocker_violations
[sonar-issues-url]: https://sonarcloud.io/component_measures/domain/Issues?id=<%= githubAccount %>-<%= projectName %>
[sonar-maintainability-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=new_maintainability_rating
[sonar-maintainability-url]: https://sonarcloud.io/component_measures/domain/Maintainability?id=<%= githubAccount %>-<%= projectName %>
[sonar-reliability-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=new_reliability_rating
[sonar-reliability-url]: https://sonarcloud.io/component_measures/domain/Reliability?id=<%= githubAccount %>-<%= projectName %>
[sonar-security-img]: http://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=vulnerabilities
[sonar-security-url]: https://sonarcloud.io/component_measures/domain/Security?id=<%= githubAccount %>-<%= projectName %>
[sonar-tech-debt-img]:  https://sonarcloud.io/api/badges/measure?key=<%= githubAccount %>-<%= projectName %>&metric=sqale_debt_ratio
[sonar-tech-debt-url]: https://sonarcloud.io/component_measures/metric/sqale_index/list?id=<%= githubAccount %>-<%= projectName %>
