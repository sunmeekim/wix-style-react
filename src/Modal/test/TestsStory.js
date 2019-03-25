import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';
import Modal from '../Modal';
import { MessageBoxFunctionalLayout } from '../../MessageBox/index';
import PropTypes from 'prop-types';
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
    </MessageBoxFunctionalLayout>
    )
  </Modal>
));

storiesOf(kind, module).add(
  testStories.modalHeaderCutsOffWithLargeContent,
  () => <ControlledModal />,
);

class ControlledModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  };

  constructor({ isOpen = false }) {
    super();
    this.state = {
      isOpenDivModal1: isOpen,
      isOpenDivModal2: false,
    };
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeModalRegularDiv1 = setState({ isOpenDivModal1: false });
    const openModalRegularDiv1 = setState({ isOpenDivModal1: true });

    const closeModalRegularDiv2 = setState({ isOpenDivModal2: false });
    const openModalRegularDiv2 = setState({ isOpenDivModal2: true });

    const firstExample = (
      <div
        style={{ backgroundColor: 'blue', width: '500px', height: '3000px' }}
      />
    );

    const secondExample = (
      <div
        style={{ backgroundColor: 'blue', width: '500px', height: '300px' }}
      />
    );

    return (
      <Container>
        <Row>
          <Col span={3}>
            <Button onClick={openModalRegularDiv1}>Example 1</Button>
            <Modal
              isOpen={this.state.isOpenDivModal1}
              onRequestClose={closeModalRegularDiv1}
              shouldDisplayCloseButton
              contentLabel="Modal With Close Button Example"
              scrollableContent
              maxHeight={'100vh'}
            >
              {firstExample}
            </Modal>
          </Col>
          <Col span={3}>
            <Button onClick={openModalRegularDiv2}>Example 2</Button>
            <Modal
              isOpen={this.state.isOpenDivModal2}
              onRequestClose={closeModalRegularDiv2}
              shouldDisplayCloseButton
              contentLabel="Modal With Close Button Example"
            >
              {secondExample}
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}
