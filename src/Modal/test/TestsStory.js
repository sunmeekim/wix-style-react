import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories, msgBoxTypes } from './storySettings';
import Modal from '../Modal';
import { MessageBoxFunctionalLayout } from '../../MessageBox/index';
import MessageBoxMarketerialLayout from "../../MessageBox/MessageBoxMarketerialLayout";

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.modalBackgroundScroll, () => (
  <ModalToTest type={msgBoxTypes.functional} repeatCount={1} />
));

storiesOf(kind, module).add('functional', () => (
  <ModalToTest type={msgBoxTypes.functional} repeatCount={100} />
));

storiesOf(kind, module).add(testStories.modalHeaderCutsOffWithLargeContent, () => (
  <ModalToTest type={msgBoxTypes.marketerial} repeatCount={100} />
));

const ModalToTest = props => {

  const {repeatCount, type} = props;

  const stringToRepeat = `I Have a close button on the upper right corner but its impossible to
          press without deleting the github creature first using the console`;
    return (
      <Modal
        isOpen
        shouldDisplayCloseButton
        contentLabel="Modal With Close Button Example"
        scrollableContent={false}
      >
        {
          type === msgBoxTypes.functional ?
            (<MessageBoxFunctionalLayout
            dataHook={storySettings.dataHook}
            theme="blue"
            title="Modal With Close Button Example"
            confirmText="OK"
            cancelText="Cancel"
          >
            {stringToRepeat.repeat(repeatCount)}
          </MessageBoxFunctionalLayout>)
            : (
            <MessageBoxMarketerialLayout
              title="Looking good! Your site is on Google"
              content={stringToRepeat.repeat(repeatCount)}
              confirmText="Button"
              imageUrl="https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png"
              theme="blue"
              primaryButtonLabel="Button"
              secondaryButtonLabel="Secondary action"
              dataHook={storySettings.dataHook}
            />
            )
        }
      </Modal>
    );
};
