import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { withAlert } from 'react-alert';


import axios from "axios";

import {createMessage} from '../actions/messages';


class NewAlbumForm extends Component {
    state = {
        id:0,
        title: "",
        images: null,
        newImage: false,
    }

    componentDidMount() {
        if (this.props.album) {
            const { id, title, images } = this.props.album;
            this.setState({ id, title, images })};
        if (this.props.image) {
            const { id, images } = this.props.image
            this.setState({ id, images })};
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    onImageChange = e => {

        if (e) {
            this.setState({
            images: e.target.files[0],
            newImage: true,
            })}
    };

    createAlbum = e => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        if(this.state.newImage === true) {
            form_data.append('images', this.state.images);
        }
        axios.post('/api/album/', form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Token ' + token
            }
            }).then((data) => {
            this.props.resetState();
            this.props.toggle();
            this.props.alert.success("Album Created")

        });
    };

    editAlbum = e => {
        e.preventDefault();
        let form_data = new FormData();
        if (this.state.newImage === true) {
            form_data.append('images', this.state.images, this.state.images.name)}
        axios.post('/api/image/', form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
            }).then((data) => {
                let form_data = new FormData()
                console.log(data.data.id)
                form_data.append('title', this.state.title);
                this.props.album.images.map(imageId => form_data.append('images', imageId.id))
                form_data.append('images', data.data.id)
                axios.put('/api/album/post/' + this.state.id + '/', form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }}).then(() => {
                    this.props.resetState();
                    this.props.toggle();
                    this.props.alert.success("Image Added")})
        });
    }

    defaultIfEmpty = value => {
        return value === ""?"" : value;
    }

    render() {
        return(
            <Form onSubmit={this.props.album ? this.editAlbum: this.createAlbum}>
                <FormGroup>
                    <Label for="title">Title: </Label>
                    <Input
                    type="text" name="title" onChange={this.onChange} value={this.defaultIfEmpty(this.state.title)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="images">Image: </Label>
                    <Input type="file"
                        name="images"
                        accept="image/png, image/jpeg"
                        onChange={this.onImageChange}
                   />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default withAlert()(NewAlbumForm);
