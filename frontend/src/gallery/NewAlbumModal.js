import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewAlbumForm from "./NewAlbumForm";

class NewAlbumModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;

        var title = "Editing Album";
        var button = <Button onClick={this.toggle}>Edit</Button>
        if (create) {
            title = "Creating New Album"

            button = (
                <Button
                  color="primary"
                  className="float-right"
                  onClick={this.toggle}
                  style={{ minWidth: "200px" }}
                >
                  Create New
                </Button>
            );
        }
        return (
            <Fragment>
            {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                    <ModalBody>
                        <NewAlbumForm
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            album={this.props.album}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default NewAlbumModal;
