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
    const scrollableModalButton = element(
      by.css(`[data-hook="${testPageDataHooks.scrollableModalButton}"]`),
    );

    const modalContentDiv = element(
      by.css(`[data-hook="${testPageDataHooks.modalContentDiv}"]`),
    );

    const footerDiv = element(
      by.css(`[data-hook="${testPageDataHooks.footerDiv}"]`),
    );

    const getDivBoundingClientRect = dataHook =>
      `return document.querySelector("[data-hook='${dataHook}']").getBoundingClientRect();`;

    const getElementCoordinatesByDataHook = dataHook =>
      browser.executeScript(getDivBoundingClientRect(dataHook));

    eyes.it(
      'should not break design when scrolling a scrollable content',
      async () => {
        await browser.get(
          testStoryUrl(testStories.modalHeaderCutsOffWithLargeContent),
        );

        await waitForVisibilityOf(
          scrollableModalButton,
          'Cannot find scrollableModalButton',
        );
        await scrollableModalButton.click();

        await waitForVisibilityOf(
          modalContentDiv,
          'Cannot find modalContentDiv',
        );

        const headerPositionBeforeScroll = await getElementCoordinatesByDataHook(
          testPageDataHooks.headerDiv,
        );

        await scrollToElement(footerDiv);

        const headerPositionAfterScroll = await getElementCoordinatesByDataHook(
          testPageDataHooks.headerDiv,
        );

        //scroll has occurred
        //TODO - calculate exact scrolling (confidence that scroll worked)
        expect(headerPositionBeforeScroll.y).not.toEqual(
          headerPositionAfterScroll.y,
        );
      },
    );
  });
});
