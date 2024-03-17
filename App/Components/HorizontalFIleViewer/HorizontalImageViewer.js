import { Spinner } from 'native-base';
import React, { Component } from 'react';
import { FlatList, Linking, SafeAreaView, Text } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { HelperService } from '../../Services/Utils/HelperService';
import { Colors } from '../../Theme';
import styles from './Style';

let fileTypeArr = ['png', 'jpeg', 'jpg'];
class HorizontalImageViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    checkFileisExistorNot = async (path) => {
        let data = await RNFS.exists(path);
        return data;
    }

    openFile = async (item, index) => {
        const url = this.getFileUrl(item);
        const localFile = this.getFilePath(item);
        const isFileExist = await this.checkFileisExistorNot(localFile);
        if (!isFileExist) {
            this.setState({ loading: true });
            const options = {
                fromUrl: url,
                toFile: localFile
            };
            await RNFS.downloadFile(options).promise
                .then(() => {
                    this.setState({ loading: false })
                })
                .then(() => {
                    FileViewer.open(localFile).then(() => { })
                })
                .catch(error => {
                    this.setState({ loading: false })
                });
        }
        else {
            FileViewer.open(localFile, { showOpenWithDialog: true })
                .then(() => {
                    this.setState({ loading: false })
                })
                .catch(error => {
                    this.setState({ loading: false })
                });
        }
    }

    getFileUrl = (item) => {
        return HelperService.getBase64DecodeValue(item.location__c);
    }

    getFilePath = (item) => {
        return HelperService.moveFileToAbsolutePath(this.getFileUrl(item), item.name);
    }

    getVisibleNode = (item, index) => {
        <Text style={ {textDecorationLine: 'underline', color: '#1890ff'}} onPress={() => Linking.openURL(item)}>{`'View' +${index}` }</Text>
       
    }

    render() {
        const { loading } = this.state;
        console.log(this.props.imageList)
        return (
            <SafeAreaView style={styles.container}>
                {!this.props.loader ? this.props.imageList.length > 0 ?
                  
                        <FlatList
                            horizontal={true}
                            data={this.props.imageList}
                            renderItem={({ item, index }) => this.getVisibleNode(item, index)}
                            keyExtractor={item => item.id}
                        />
                        
                   : <Text>No Data</Text> : <Spinner size='small' color={Colors.button} />}
            </SafeAreaView>
        );
    }
}

export default HorizontalImageViewer;

