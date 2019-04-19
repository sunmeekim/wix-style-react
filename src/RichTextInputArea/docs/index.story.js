import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';

import RichTextInputArea from '..';
import ExampleRichTextInputArea from '!raw-loader!./examples/ExampleRichTextInputArea';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: RichTextInputArea,
  componentPath: '..',

  componentProps: () => ({
    dataHook: storySettings.dataHook,
    initialValue: '',
    placeholder: 'Default text goes here',
    onChange: value => value,
  }),

  exampleProps: {
    onChange: value => value,
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={ExampleRichTextInputArea}
      />
    </div>
  ),
};
