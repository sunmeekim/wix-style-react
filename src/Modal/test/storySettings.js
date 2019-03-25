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