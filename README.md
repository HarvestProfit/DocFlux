# DocFlux
[![npm](https://img.shields.io/npm/v/@harvest-profit/doc-flux.svg)](https://www.npmjs.com/package/@harvest-profit/doc-flux)  [![Build Status](https://travis-ci.org/HarvestProfit/DocFlux.svg?branch=master)](https://travis-ci.org/HarvestProfit/DocFlux)  [![Coverage Status](https://coveralls.io/repos/github/HarvestProfit/DocFlux/badge.svg?branch=master)](https://coveralls.io/github/HarvestProfit/DocFlux?branch=master) [![npm](https://img.shields.io/npm/l/@harvest-profit/doc-flux.svg)](https://github.com/HarvestProfit/DocFlux/blob/master/LICENSE)

Flux/React framework for creating any document, just define a few DOM components to transform into the document.

See an example of how to generate Spreadsheets https://github.com/humphreyja/sample-doc-flux-spreadsheets

# Examples

### Documents
To start, you must define a document.  Think of this as the root.  You will define a few document metadata options and specify which component it will render.  Below I am using the [DocFlux PDFS](https://github.com/HarvestProfit/DocFlux-PDFs) package to create a pdf that uses the `Table` component specified in the next section.  `documentSettings` takes options specified in [PDFMake](https://pdfmake.github.io/docs/document-definition-object/document-medatadata/) document metadata docs.

```js
import PropTypes from 'prop-types';
import { Document } from '@harvest-profit/doc-flux-pdfs';
import Table from './Table';

class TablePDF extends Document {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  };

  static styleSheet() {
    return {
      td: {
        fontSize: 11,
        marginTop: 2,
        marginBottom: 2,
      }
    };
  }

  static documentSettings(props) {
    return {
      name: `People: ${props.name}`,
      pageMargins: [30, 50, 30, 50],
      pageOrientation: 'portrait',
    };
  }

  static component = Table;
}

export default TablePDF;
```

### Components
The following is a sample component that will render a table.  Notice, the `tname` tag.  This is a special tag created from the [DocFlux Spreadsheets](https://github.com/HarvestProfit/DocFlux-Spreadsheets) package.  It names the tab to `People` in excel.  For PDFs, this will be ignored.

```js
import PropTypes from 'prop-types';
import { DocFlux } from '@harvest-profit/doc-flux';
/** @jsx DocFlux.createElement */
import RandomRow from './RandomRow';

const Table = (props) => (
  <table>
    <tname>People</tname>
    <thead>
      <th>Name</th>
      <th>Age</th>
    </thead>
    <tbody>
      <tr>
        <td>{props.name}</td>
        <td>{props.age}</td>
      </tr>
      <RandomRow />
    </tbody>
  </table>
)

Table.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default Table;
```
### Testing

For testing, this uses a similar API to `enzyme`.  You can shallow render the component (which only renders the component and not any child components).  Then you can actively `find` or get `text` from the rendered component. **Notice!** You will need to provide a parser for the component tree.  Why?  Because like in the above component, the Spreadsheet parser defines the `tname` tag whereas the PDF parser does not.  Each may have its own rules.  It just depends on what you want to test. You can `find` by tag name or component name.

Additionally, you can use `at(index)`, `first()`, or `last()` on any `find` results.  

```js
import { DocFluxTest } from '@harvest-profit/doc-flux';
import { Parser } from '@harvest-profit/doc-flux-pdfs';
/** @jsx DocFluxTest.createElement */
import Table from './Table';
import RandomRow from './RandomRow';

describe('<Table />', () => {
  it('should render', () => {
    const wrapper = DocFluxTest.shallow((
      <Table
        name="Jake"
        age={100}
      />
    ), Parser);
    expect(wrapper.find('tr').text()).toContain('Jake');
    expect(wrapper.find('tr').first().text()).toContain('Jake');
  });

  it('should find the RandomRow component', () => {
    const wrapper = DocFluxTest.shallow((
      <Table
        name="Jake"
        age={100}
      />
    ), Parser);
    expect(wrapper.find(RandomRow).length).toEqual(1);
  });
});
```

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
