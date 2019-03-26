import { Category } from '../../../stories/storiesHierarchy';

export const storySettings = {
  category: Category.MODALS,
  storyName: 'Modal',
  dataHook: 'storybook-modal',
};

export const testStories = {
  modalBackgroundScroll: 'Prevent modal background scroll',
  modalHeaderCutsOffWithLargeContent:
    'Modal should fit the viewport when there is lots of content',
};

export const testPageDataHooks = {
  modalContentDiv: 'modal-content-div',
  scrollableModalButton: 'scrollable-modal-button',
  nonScrollableModalButton: 'non-scrollable-modal-button',
  headerDiv: 'header-div',
  contentDiv: 'content-div',
  footerDiv: 'footer-div',
};