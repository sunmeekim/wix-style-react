/* eslint-disable */
import React from 'react';

import * as wsrScope from '../../..';
import { Layout, Cell } from '../../../Layout';
import LiveCodeExample from '../../../../stories/utils/LiveCodeExample';

const Example = `
    <Search clearButton />
`;

export default () => (
  <Layout>
    <Cell span={6}>
      <h1>
        Uncontrolled Input
      </h1>
      <LiveCodeExample
        scope={wsrScope}
        compact
        title="An uncontrolled Input has no value provided"
        initialCode={Example}
      />
    </Cell>
  </Layout>
);
