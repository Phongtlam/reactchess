import * as React from 'react';
import { Modal, Input, Icon } from 'antd';
const InputGroup = Input.Group;
import '@App/stylesheets/welcomeModal.css';

interface ModalState {
  visible: boolean;
  nameInput: string;
  modalStage: number;
  needDiffName: boolean;
  roomId: string;
  typeofDiffName: string;
}

interface ModalProps {
  roomId: string;
  subscribeUser: ({ userName, roomId }) => void;
}

class WelcomeModal extends React.Component<ModalProps, ModalState> {

  private initialState = {
    visible: false,
    nameInput: '',
    roomId: '',
    modalStage: 0,
    needDiffName: false,
    typeofDiffName: ''
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  componentDidMount() {
    this.setState({ visible: true });
  }

  public render() {
    let content;
    let warningMessage: any = null;
    if (this.state.needDiffName) {
      if (this.state.typeofDiffName === 'blank') {
        warningMessage = 'Please input a valid name';
      } else if (this.state.typeofDiffName === 'chatbot') {
        warningMessage = 'Please input a non reserved name';
      }
    }
    switch (this.state.modalStage) {
      case 0:
        content = (
          <div>
            <p>Who are you?</p>
            <Input
              prefix={<Icon type="user" className="welcomemodal--icon" />}
              placeholder="input name..."
              onChange={this.onNameInput}
              value={this.state.nameInput}
              onPressEnter={this.handleNext}
            />
            {
              this.state.needDiffName &&
              <p className="welcomemodal--input-warning">{warningMessage}</p>
            }
          </div>
        );
        break;
      case 1:
        content = (
          <div>
            <p>Join an existing room or create a new room ID:</p>
            <InputGroup compact={true}>
              <Input
                className="welcomemodal--content"
                value={this.state.roomId}
                onChange={this.onRoomIdInput}
                style={{ width: '200px' }}
                onPressEnter={this.handleNext}
              />
            </InputGroup>
          </div>
        );
        break;
      default: content = null;
    }
    return (
      <div>
        <Modal
          title="Welcome to Chess"
          visible={this.state.visible}
          onOk={this.handleNext}
          onCancel={this.handleBack}
          cancelText="Prev"
          closable={false}
          okText={this.state.modalStage === 1 ? 'Join Game' : 'Next'}
        >
          {content}
        </Modal>
      </div>
    );
  }

  private handleNext = (e) => {
    if (this.state.nameInput === '' || this.state.nameInput === 'Chat Bot') {
      const type = this.state.nameInput === 'Chat Bot' ? 'chatbot' : 'blank';
      this.setState({
        needDiffName: true,
        typeofDiffName: type
      });
      return;
    }
    if (this.state.modalStage === 1) {
      this.props.subscribeUser({
        userName: this.state.nameInput,
        roomId: this.state.roomId
      });
      this.setState({
        visible: false
      }, () => {
        this.setState(this.initialState);
      });
      return;
    }
    this.setState({
      modalStage: this.state.modalStage + 1,
      needDiffName: false
    });
  }

  private handleBack = () => {
    if (this.state.modalStage === 0) {
      return;
    }
    this.setState({
      modalStage: this.state.modalStage - 1,
    });
  }

  private onNameInput = (e) => {
    this.setState({
      nameInput: e.target.value
    });
  }

  private onRoomIdInput = (e) => {
    this.setState({
      roomId: e.target.value
    });
  }

}

export default WelcomeModal;