# DocFlux
[![npm](https://img.shields.io/npm/v/@harvest-profit/doc-flux.svg)](https://www.npmjs.com/package/@harvest-profit/doc-flux)  [![Build Status](https://travis-ci.org/HarvestProfit/DocFlux.svg?branch=master)](https://travis-ci.org/HarvestProfit/DocFlux)  [![npm](https://img.shields.io/npm/l/@harvest-profit/doc-flux.svg)](https://github.com/HarvestProfit/DocFlux/blob/master/LICENSE)

Flux/React framework for creating any document, just define a few DOM components to transform into the document.

## Development
[Clone](https://help.github.com/articles/cloning-a-repository/) this repo, and begin committing changes. PRs are preferred over committing directly to master.

To run tests locally on your machine, run the following:
```bash
yarn run test
```

To preview documentation locally on your machine, run the following:
```bash
yarn run build-docs
```

After merging your pull request, consider updating the documentation with the following command:
```bash
yarn run publish-docs
```

To deploy a new version to NPM, bump the version number, commit/merge to `master`, and run the following:
```bash
yarn run clean
yarn run build

# Either NPM
npm publish
# Or Yarn, they do the same thing
yarn publish
```

## License
This project is [MIT licensed](https://github.com/HarvestProfit/DocFlux/blob/master/LICENSE)
