#  `generator-apiproxy`

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
- [7. License](#7-license)

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

## 3. Version and CHANGELOG

`generator-apiproxy`'s latest version is <!-- semver --><!-- semverend -->. Please read the [CHANGELOG][changelog-url] for details.
