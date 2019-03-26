import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories, testPageDataHooks } from './storySettings';
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
      isOpenScrollableDivModal: isOpen,
    };
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeModalScrollableDiv = setState({
      isOpenScrollableDivModal: false,
    });
    const openModalScrollableDiv = setState({ isOpenScrollableDivModal: true });

    const contentDiv = height => (
      <div
        data-hook={testPageDataHooks.contentDiv}
        style={{
          backgroundColor: 'green',
          width: '500px',
          height: height,
        }}
      >
        <b> Content </b>
      </div>
    );

    const headerDiv = (
      <div
        data-hook={testPageDataHooks.headerDiv}
        style={{
          backgroundColor: 'yellow',
          width: '500px',
          height: '50px',
        }}
      >
        <b> Header </b>
      </div>
    );

    const footerDiv = (
      <div
        data-hook={testPageDataHooks.footerDiv}
        style={{
          backgroundColor: 'yellow',
          width: '500px',
          height: '50px',
        }}
      >
        <b> Footer </b>
      </div>
    );

    return (
      <Container>
        <Row>
          <Col span={3}>
            <Button
              onClick={openModalScrollableDiv}
              dataHook={testPageDataHooks.scrollableModalButton}
            >
              Scrollable div Example
            </Button>
            <Modal
              isOpen={this.state.isOpenScrollableDivModal}
              onRequestClose={closeModalScrollableDiv}
              shouldDisplayCloseButton
              contentLabel="Modal With Scrollable div"
              scrollableContent
              maxHeight={'100vh'}
            >
              <div data-hook={testPageDataHooks.modalContentDiv}>
                {headerDiv}
                {contentDiv('2900px')}
                {footerDiv}
              </div>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}
