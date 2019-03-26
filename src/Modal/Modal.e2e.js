import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  storySettings,
  testStories,
  testPageDataHooks,
} from './test/storySettings';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

//we want to take snapshots both at the beginning and end of the tests
const eyes = eyesItInstance({ enableSnapshotAtBrowserGet: true });

const { category, storyName } = storySettings;

describe('Modal', () => {
  const testStoryUrl = testName =>
    createTestStoryUrl({ category, storyName, testName });

  eyes.it('should add overflow to body once it is open', async () => {
    await browser.get(testStoryUrl(testStories.modalBackgroundScroll));
    await waitForVisibilityOf(
      element(by.css(`[data-hook="${storySettings.dataHook}"]`)),
      'Cannot find Modal component',
    );
    const body = element(by.css('body'));
    const bodyOverflow = await body.getCssValue('overflow');

    expect(bodyOverflow).toBe('hidden');
  });

  describe('content', () => {
    beforeEach(
      async () =>
        await browser.get(
          testStoryUrl(testStories.modalHeaderCutsOffWithLargeContent),
        ),
    );

    const scrollableModalButton = element(
      by.css(`[data-hook="${testPageDataHooks.scrollableModalButton}"]`),
    );

    const nonScrollableModalButton = element(
      by.css(`[data-hook="${testPageDataHooks.nonScrollableModalButton}"]`),
    );

    const modalContentDiv = element(
      by.css(`[data-hook="${testPageDataHooks.modalContentDiv}"]`),
    );

    const footerDiv = element(
      by.css(`[data-hook="${testPageDataHooks.footerDiv}"]`),
    );

    eyes.it(
      'should not break design when scrolling a scrollable content',
      async () => {
        await waitForVisibilityOf(
          scrollableModalButton,
          'Cannot find scrollableModalButton',
        );
        await scrollableModalButton.click();

        await waitForVisibilityOf(
          modalContentDiv,
          'Cannot find modalContentDiv',
        );

        await scrollToElement(footerDiv);

        //Making sure scroll has occurred by the Applitools snapshots
      },
    );

    eyes.it(
      'should not break design when scrolling a non-scrollable content',
      async () => {
        await waitForVisibilityOf(
          nonScrollableModalButton,
          'Cannot find nonScrollableModalButton',
        );
        await nonScrollableModalButton.click();

        await waitForVisibilityOf(
          modalContentDiv,
          'Cannot find modalContentDiv',
        );

        await scrollToElement(footerDiv);

        //Making sure scroll has NOT occurred by the Applitools snapshots
      },
    );
  });
});
