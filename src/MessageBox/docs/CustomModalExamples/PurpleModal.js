import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';
import Modal from 'wix-style-react/Modal';

class PurpleModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpenPurpleModal: false,
    };
  }

  render() {
    const setState = state => () => this.setState(state);
    const closePurpleModal = setState({ isOpenPurpleModal: false });
    const openPurpleModal = setState({ isOpenPurpleModal: true });
    return (
      <div>
        <Button
          dataHook="open-full-screen-modal-button"
          onClick={openPurpleModal}
        >
          Open Purple Screen Modal
        </Button>
        <Modal
          isOpen={this.state.isOpenPurpleModal}
          onRequestClose={closePurpleModal}
          contentLabel="Full screen modal example"
        >
          <MessageBoxFunctionalLayout
            cancelText="Cancel"
            confirmText="OK"
            dataHook="fullscreen-modal"
            onCancel={closePurpleModal}
            onOk={closePurpleModal}
            theme="purple"
            title="Purple modal"
          >
            I&apos;m a purple modal!
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default () => <PurpleModal />;
