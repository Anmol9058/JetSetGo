import React, { Component } from 'react';
import ImageView from "react-native-image-viewing";

class ImageViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }
    render() {
        let images = [{ uri: this.props.imageurl }];
        return (
            <ImageView
                images={images}
                imageIndex={0}
                visible={this.state.visible}
                onRequestClose={() => this.setState({ visible: false })}
            />
        );
    }
}

export default ImageViewer;
