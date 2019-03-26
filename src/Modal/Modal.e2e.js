import { eyesItInstance } from '../../test/utils/eyes-it';
import { storySettings, testStories } from './test/storySettings';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

const eyes = eyesItInstance();
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
    const until = protractor.ExpectedConditions;
    const DATA_HOOKS = {
      modalContentDiv: 'modal-content-div',
      scrollableModalButton: 'scrollable-modal-button',
      nonScrollableModalButton: 'non-scrollable-modal-button',
      headerDiv: 'header-div',
      contentDiv: 'content-div',
      footerDiv: 'footer-div',
    };

    const scrollableModalButton = element(
      by.css(`[data-hook="${DATA_HOOKS.scrollableModalButton}"]`),
    );

    const nonScrollableModalButton = element(
      by.css(`[data-hook="${DATA_HOOKS.nonScrollableModalButton}"]`),
    );

    const modalContentDiv = element(
      by.css(`[data-hook="${DATA_HOOKS.modalContentDiv}"]`),
    );

    const headerDiv = element(by.css(`[data-hook="${DATA_HOOKS.headerDiv}"]`));

    const contentDiv = element(
      by.css(`[data-hook="${DATA_HOOKS.contentDiv}"]`),
    );

    const footerDiv = element(by.css(`[data-hook="${DATA_HOOKS.footerDiv}"]`));

    const getDivBoundingClientRect = dataHook =>
      `return document.querySelector("[data-hook='${dataHook}']").getBoundingClientRect();`;

    const getDivYCoordinateBeforeAndAfterScroll = async dataHook => {
      const beforeScroll = await browser.executeScript(
        getDivBoundingClientRect(dataHook),
      );
      await scrollToElement(footerDiv);
      const afterScroll = await browser.executeScript(
        getDivBoundingClientRect(dataHook),
      );

      return { yBeforeScroll: beforeScroll.y, yAfterScroll: afterScroll.y };
    };

    eyes.it(
      'should display footerDiv in viewport after it is scrolled',
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
        await browser.wait(until.presenceOf(footerDiv), 5000); //footer div is currently not in viewport

        const {
          yBeforeScroll,
          yAfterScroll,
        } = await getDivYCoordinateBeforeAndAfterScroll(DATA_HOOKS.footerDiv);

        expect(yBeforeScroll === yAfterScroll).toBe(false);
      },
    );

    eyes.it(
      'should NOT display headerDiv in viewport after it is scrolled',
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
        await waitForVisibilityOf(headerDiv, 'Cannot find headerDiv'); //div is currently in viewport

        const {
          yBeforeScroll,
          yAfterScroll,
        } = await getDivYCoordinateBeforeAndAfterScroll(DATA_HOOKS.headerDiv);

        expect(yBeforeScroll === yAfterScroll).toBe(false);
      },
    );

    eyes.it(
      'should NOT scroll modalContentDiv when all its content is displayed in viewport',
      async () => {
        await browser.get(
          testStoryUrl(testStories.modalHeaderCutsOffWithLargeContent),
        );

        await waitForVisibilityOf(
          nonScrollableModalButton,
          'Cannot find nonScrollableModalButton',
        );
        await nonScrollableModalButton.click();

        await waitForVisibilityOf(
          modalContentDiv,
          'Cannot find modalContentDiv',
        );
        await waitForVisibilityOf(headerDiv, 'Cannot find headerDiv');
        await waitForVisibilityOf(contentDiv, 'Cannot find contentDiv');
        await waitForVisibilityOf(footerDiv, 'Cannot find footerDiv');

        const {
          yBeforeScrollHeader,
          yAfterScrollHeader,
        } = await getDivYCoordinateBeforeAndAfterScroll(DATA_HOOKS.headerDiv);

        expect(yBeforeScrollHeader === yAfterScrollHeader).toBe(true);

        const {
          yBeforeScrollContent,
          yAfterScrollContent,
        } = await getDivYCoordinateBeforeAndAfterScroll(DATA_HOOKS.contentDiv);

        expect(yBeforeScrollContent === yAfterScrollContent).toBe(true);

        const {
          yBeforeScrollFooter,
          yAfterScrollFooter,
        } = await getDivYCoordinateBeforeAndAfterScroll(DATA_HOOKS.footerDiv);

        expect(yBeforeScrollFooter === yAfterScrollFooter).toBe(true);
      },
    );
  });
});
