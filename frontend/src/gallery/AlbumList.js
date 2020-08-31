import React, { Component, Fragment } from "react";
import { Button } from "reactstrap"
import NewAlbumModal from "./NewAlbumModal";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class AlbumList extends Component{
        static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    render() {
        const photos = this.props.photos;
        const { isAuthenticated, user } = this.props.auth;

        return(
            <div>
                {!photos || photos.length <= 0 ? (
                    <h1>No Album page created yet</h1>
                    ) : (
                    photos.map(album => (
                        <div key={album.id}>
                            <h1>{album.title}</h1>
                            {album.images.map(image => (
                                <div key={image.id}>
                                <img src={image.images} />
                                </div>
                                ))}
                            { isAuthenticated
                            ? <Fragment>
                                <NewAlbumModal
                                    create={false}
                                    album={album}
                                    resetState={this.props.resetState}
                                />
                                &nbsp;&nbsp;
                                <ConfirmRemovalModal
                                    id={album.id}
                                    resetState={this.props.resetState}
                                />
                            </Fragment>
                            :<div />
                        }

                        </div>

                    ))

                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
      auth: state.auth,
    })


export default connect(mapStateToProps, )(AlbumList);
