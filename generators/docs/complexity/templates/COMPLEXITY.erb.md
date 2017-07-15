# Complexity Report, <%= isoDate %>
> :white_check_mark: Congratulations! `<%= projectName %>` has a mean cyclomatic complexity of <%= complexity.cyclomatic %>.

## 1. Summary

<% if (complexity.level.simple(complexity.cyclomatic)) { %>
> #### :chart_with_downwards_trend: Overall averages
> * **:white_check_mark: Mean per-function cyclomatic complexity: <%= complexity.cyclomatic %>**
<% } else if complexity.level.complicated(complexity.cyclomatic) { %>
> #### :chart_with_upwards_trend: Overall averages
> * **:warning: Mean per-function cyclomatic complexity: <%= complexity.cyclomatic %>**
<% } else if complexity.level.convoluted(complexity.cyclomatic) { %>
> #### :rotating_light: Overall averages
> * ** :no_entry: Mean per-function cyclomatic complexity: <%= complexity.cyclomatic %>**
<% } else if complexity.level.incomprehensible(complexity.cyclomatic) { %>
> #### :boom: Overall averages
> * ** :skull: Mean per-function cyclomatic complexity: <%= complexity.cyclomatic %>**
<% } -%>
> * Change cost: <%= complexity.changeCost %>
> * Core size: <%= complexity.coreSize %>
> * First-order density: <%= complexity.firstOrderDensity %>
> * Mean per-function Halstead effort: Math.round(<%= complexity.effort %>)
> * Mean per-function logical LOC: Math.round(<%= complexity.loc %>)
> * Mean per-function parameter count: <%= complexity.params %>
> * Mean per-module maintainability index: Math.round(<%= complexity.maintainability %>)

## 2. Source code files

<% complexity.reports.forEach((report, index) => { %>
### 2.<%= (index + 1) %>. `<%= report.path %>`
  * **Cyclomatic complexity: <%= report.cyclomatic %>**
  * Change cost: <%= complexity.changeCost %>
  * Core size: <%= complexity.coreSize %>
  * First-order density: <%= complexity.firstOrderDensity %>
  * Mean per-function Halstead effort: Math.round(<%= complexity.effort %>)
  * Mean per-function cyclomatic complexity: <%= complexity.cyclomatic %>
  * Mean per-function logical LOC: Math.round(<%= complexity.loc %>)
  * Mean per-function parameter count: <%= complexity.params %>
  * Mean per-module maintainability index: <%= complexity.maintainability %>
<% }) -%>

## 3. How to generate complexity reports

Open a terminal and run:

```bash
# Generate static static Javascript callout API documentation in this directory:
$ npm run docs:jsc:complexity

# To generate all docs, run:
$ npm run docs

```

## 4. How to interpret cyclomatic complexity

> Carnegie Mellon define four rough ranges for cyclomatic complexity values:
>
> 1. Methods between 1 and 10 are considered simple and easy to understand and test.
> 2. Values between 10 and 20  indicate more complex code, which may still be comprehensible; however testing becomes more difficult due to the greater number of possible branches the code can take.
> 3. Values of 20 and above are typical of code with a very large number of potential execution paths and can only be fully grasped and tested with great difficulty and effort.
> 4. Methods going even higher, e. g. greater than 50, are certainly unmaintainable.
>
> https://blog.codecentric.de/en/2011/10/why-good-metrics-values-do-not-equal-good-quality/

---

<%= license %> © [<%= author.name %>](<%= author.url %>)
