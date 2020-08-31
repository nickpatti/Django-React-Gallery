import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { withAlert } from 'react-alert';


import axios from "axios";

class ConfirmRemovalModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteAlbum = id => {
        axios.delete('/api/album/' + id).then(() => {
            this.props.resetState();
            this.toggle();
            this.props.alert.error("Album Deleted")
        }).catch(e => {
            this.props.alert.show(e);
        })
    };

    render() {
        return(
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Remove
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Are you sure you want to delete this album?
                    </ModalHeader>

                    <ModalFooter>
                        <Button type="button" onClick={() =>this.toggle()}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => this.deleteAlbum(this.props.id)}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default withAlert()(ConfirmRemovalModal);
