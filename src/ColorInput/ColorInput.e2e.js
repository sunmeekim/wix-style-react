import { eyesItInstance } from '../../test/utils/eyes-it';
import { storySettings, testStories } from './docs/storySettings';

import { createTestStoryUrl } from '../../test/utils/storybook-helpers';

const eyes = eyesItInstance();
const testStoryUrl = testName =>
  createTestStoryUrl({
    kind: storySettings.category,
    ...storySettings,
    testName,
  });

describe('ColorInput', () => {
  describe('test stories', () => {
    eyes.it('check colorinput states', async () => {
      await browser.get(testStoryUrl(testStories.STATES));
      eyes.checkWindow(testStories.STATES);
    });
  });
});
