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

    describe('content' , ()=>{

      const until = protractor.ExpectedConditions;
      const DATA_HOOKS = {
        scrollableModalButton: 'scrollable-modal-button',
        scrollHereDiv: 'scroll-here-div',
        displayedDiv: "displayed-div",
        modalContentDiv: 'modal-content-div',
      };

      const scrollableModalButton = element(by.css(`[data-hook="${DATA_HOOKS.scrollableModalButton}"]`));
      const contentDiv = element(by.css(`[data-hook="${DATA_HOOKS.modalContentDiv}"]`));
      const scrollHereDiv = element(by.css(`[data-hook="${DATA_HOOKS.scrollHereDiv}"]`));
      const displayedDiv = element(by.css(`[data-hook="${DATA_HOOKS.displayedDiv}"]`));
      const getDivBoundingClientRect = (dataHook) => `return document.querySelector("[data-hook='${dataHook}']").getBoundingClientRect();`;


      eyes.it('should display scrollHereDiv in viewport after it is scrolled', async () => {
        await browser.get(testStoryUrl(testStories.modalHeaderCutsOffWithLargeContent));

        await waitForVisibilityOf(scrollableModalButton ,'Cannot find scrollableModalButton');
        await scrollableModalButton.click();

        await waitForVisibilityOf(contentDiv ,'Cannot find contentDiv');
        await browser.wait(until.presenceOf(scrollHereDiv), 5000); //div is currently not in viewport

        const beforeScroll = await browser.executeScript(getDivBoundingClientRect(DATA_HOOKS.scrollHereDiv));
        await scrollToElement(scrollHereDiv);
        const afterScroll = await browser.executeScript(getDivBoundingClientRect(DATA_HOOKS.scrollHereDiv));

        expect(beforeScroll).not.toEqual(afterScroll);
      });

      eyes.it('should not display displayedDiv in viewport after it is scrolled', async () => {
        await browser.get(testStoryUrl(testStories.modalHeaderCutsOffWithLargeContent));

        await waitForVisibilityOf(scrollableModalButton ,'Cannot find scrollableModalButton');
        await scrollableModalButton.click();

        await waitForVisibilityOf(contentDiv ,'Cannot find contentDiv');
        await waitForVisibilityOf(displayedDiv ,'Cannot find displayedDiv'); //div is currently in viewport

        const beforeScroll = await browser.executeScript(getDivBoundingClientRect(DATA_HOOKS.displayedDiv));
        await scrollToElement(scrollHereDiv);
        const afterScroll = await browser.executeScript(getDivBoundingClientRect(DATA_HOOKS.displayedDiv));

        expect(beforeScroll).not.toEqual(afterScroll);
      });
    })
});
