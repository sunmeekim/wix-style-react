import React from 'react';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  title,
  code as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import CloseButton from '..';
import { Layout } from '../../Layout';
import { storySettings } from './storySettings';
import Help from '../../new-icons/Help';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import testkit from '!raw-loader!./testkit.md';

import * as examples from './examples';

const liveCode = config =>
  baseLiveCode({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    compact: true,
    components: baseScope,
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: CloseButton,
  componentPath: '..',

  componentProps: {
    as: 'button',
    skin: 'standard',
    size: 'small',
    disabled: false,
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    as: ['button', 'a', 'span', 'div'],
    children: [
      { label: 'No children', value: null },
      { label: 'Custom Icon', value: <Help /> },
    ],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <CloseButton />
        </Layout>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/CloseButton/CloseButton.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          importExample({
            source: "import CloseButton from 'wix-style-react/CloseButton';",
          }),

          divider(),

          columns([title('Examples')]),

          ...[
            {
              title: 'Skin',
              text:
                'Close button has 5 skins. `standard`, `light`, `dark`, `standardFilled`, `lightFilled`.',
              source: examples.skins,
            },
            {
              title: 'Size',
              text: 'Close button has two sizes – small and medium.',
              source: examples.sizes,
            },
            {
              title: 'Custom Icon',
              text:
                'Additional actions next to the close button can be formed by using close button with a custom icon',
              source: examples.custom,
            },
          ].map(example),
        ],
      }),

      tab({
        title: 'API',
        sections: [api()],
      }),

      tab({
        title: 'Testkit',
        sections: [description(testkit)],
      }),

      tab({
        title: 'Playground',
        sections: [playground()],
      }),
    ]),
  ],
};
