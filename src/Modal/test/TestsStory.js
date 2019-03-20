import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';
import Modal from '../Modal';
import { MessageBoxFunctionalLayout } from '../../MessageBox/index';
import MessageBoxMarketerialLayout from "../../MessageBox/MessageBoxMarketerialLayout";

import PropTypes from "prop-types";
import Button from 'wix-style-react/Button';
import { Row, Container, Col } from 'wix-style-react/Grid';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.modalBackgroundScroll, () => (
  <Modal
    isOpen
    shouldDisplayCloseButton
    contentLabel="Modal With Close Button Example"
    scrollableContent={false}
  >
    <MessageBoxFunctionalLayout
      dataHook={storySettings.dataHook}
      theme="blue"
      title="Modal With Close Button Example"
      confirmText="OK"
      cancelText="Cancel"
    >
      I Have a close button on the upper right corner but its impossible to
      press without deleting the github creature first using the console
    </MessageBoxFunctionalLayout>)
  </Modal>
));

storiesOf(kind, module).add(testStories.modalHeaderCutsOffWithLargeContent, () => (
  <ControlledModal />
));


class ControlledModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  };

  constructor({ isOpen = false }) {
    super();
    this.state = {
      isOpenFunctionalModal: isOpen,
      isOpenModalWithDatePicker: false,
    };
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeFunctionalModal = setState({ isOpenFunctionalModal: false });
    const openFunctionalModal = setState({ isOpenFunctionalModal: true });

    const closeMarketerialModal = setState({ isOpenMarketerialModal: false });
    const openMarketerialModal = setState({ isOpenMarketerialModal: true });

    const stringToRepeat = `I Have a close button on the upper right corner but its impossible to
          press without deleting the github creature first using the console`;

    const repeatCount = 100;

    return (
      <Container>
        <Row>
          <Col span={3}>
            <Button onClick={openFunctionalModal}>Functional Message Box</Button>
            <Modal
              isOpen={this.state.isOpenFunctionalModal}
              onRequestClose={closeFunctionalModal}
              contentLabel="Modal Example"
              scrollableContent={false}
            >
              <MessageBoxFunctionalLayout
                dataHook={storySettings.dataHook}
                theme="blue"
                title="Modal With Close Button Example"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeFunctionalModal}
                onCancel={closeFunctionalModal}
              >
                {stringToRepeat.repeat(repeatCount)}
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
          <Col span={3}>
            <Button onClick={openMarketerialModal}>
              Marketerial Message Box
            </Button>
            <Modal
              isOpen={this.state.isOpenMarketerialModal}
              onRequestClose={closeMarketerialModal}
              contentLabel="Modal Example"
              scrollableContent={false}
            >
              <MessageBoxMarketerialLayout
                title="Looking good! Your site is on Google"
                content={stringToRepeat.repeat(repeatCount)}
                confirmText="Button"
                imageUrl="https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png"
                theme="blue"
                primaryButtonLabel="Button"
                secondaryButtonLabel="Secondary action"
                dataHook={storySettings.dataHook}
                onClose={closeMarketerialModal}
                onPrimaryButtonClick={closeMarketerialModal}
                onSecondaryButtonClick={closeMarketerialModal}
              />
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}