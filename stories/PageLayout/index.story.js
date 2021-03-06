import React from 'react';
import LinkTo from '@storybook/addon-links/react';
import {
  title,
  description,
  columns,
  table,
  importExample,
  code as baseCode,
} from 'wix-storybook-utils/Sections';

import { storySettings } from './storySettings';
import { baseScope } from '../utils/LiveCodeExample';

import * as examples from './examples';
import { sterilizeCode } from '../utils/sterilizeCodeForLive';

import ExampleGeneralLayoutRaw from '!raw-loader!./ExampleGeneralLayout';
import ExampleSplitLayoutRaw from '!raw-loader!./ExampleSplitLayout';
import ExampleGalleryLayoutRaw from '!raw-loader!./ExampleGalleryLayout';
import ExampleEmptyStateRaw from '!raw-loader!./ExampleEmptyState';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    description({
      title: 'Description',
      text: `Compositions from multiple components that help to setup a page.`,
    }),

    columns([
      table({
        title: 'Included Components',
        rows: [
          [
            <LinkTo kind="Components" story="Page" children="<Page/>" />,
            'Business Manager’s root component',
          ],

          [
            <LinkTo
              kind="Components"
              story="PageHeader"
              children="<Page.Header/>"
            />,
            '`<Page/>` component’s child',
          ],

          [
            <LinkTo kind="Components" story="Grid" children="<Grid/>" />,
            'Component that constructs a grid',
          ],

          [
            <LinkTo
              kind="2. Layout"
              story="2.2 Card Layout"
              children="<Card/>"
            />,
            'Light card component',
          ],

          [
            <LinkTo
              kind="2. Layout"
              story="2.4 EmptyState"
              children="<EmptyState/>"
            />,
            'Component that render Empty state layout',
          ],
        ],
      }),
    ]),

    importExample(examples.importExample),

    title('Examples'),

    ...[
      {
        pretitle: '2.1.A',
        title: 'General Layout',
        description: 'A classic layout for forms and lists',
        source: sterilizeCode(ExampleGeneralLayoutRaw),
      },

      {
        pretitle: '2.1.B',
        title: 'Split Layout',
        description: 'A Layout for forms item previews',
        source: sterilizeCode(ExampleSplitLayoutRaw),
      },

      {
        pretitle: '2.1.C',
        title: 'Gallery Layout',
        description: 'Best for product category lists',
        source: sterilizeCode(ExampleGalleryLayoutRaw),
      },

      {
        pretitle: '2.1.D',
        title: 'Empty State',
        description: 'Best for initial call to action',
        source: sterilizeCode(ExampleEmptyStateRaw),
      },
    ].map(code),
  ],
};
