import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import AlbumList from "./AlbumList";
import NewAlbumModal from "./NewAlbumModal";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import axios from "axios";


class Album extends Component {
    state = {
        photos: [],
        relations: []
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
    };


    componentDidMount() {
        this.resetState();
    }

    getAlbum = () => {
        axios.get('/api/album/').then(res => this.setState({ photos: res.data }));
    };

    resetState = () => {
        this.getAlbum();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const createView = (
            <Row>
                <Col>
                    <NewAlbumModal create={true} resetState={this.resetState} />
                </Col>
            </Row>
        )

        const notAuth = (
            <div />
        )

        return(
            <div>
            { isAuthenticated ? createView : notAuth}
            <div className="scene_element scene_element--fadein">
                <AlbumList
                    photos={this.state.photos}
                    resetState={this.resetState}
                />
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
      auth: state.auth,
    })

export default connect(mapStateToProps, )(Album);
