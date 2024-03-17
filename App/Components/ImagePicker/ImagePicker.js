import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HelperService } from '../../Services/Utils/HelperService';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	async chooseFile() {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		let permission = await HelperService.requestStoragePermission();

		if (permission) {
			ImagePicker.launchCamera(options, (response) => {
				console.log('Response = ', response);
				if (response.didCancel) {
					console.log('User cancelled image picker');
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
				} else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
					alert(response.customButton);
				} else {
					const source = { uri: 'data:image/jpeg;base64,' + response.data };
					this.props.onImageSuccess({ image: response.data, filename: response.fileName });
					this.setState({
						avatarSource: source
					});
				}
			});
		} else {
			Alert.alert(
				"Storage permission Denied.",
				'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for Jk-Paper.'
			);
		}
	};

	render() {
		const {
			image,
			children
		} = this.props;
		let imageNode = (
			<Image
				source={this.state.avatarSource}
				style={{ width: 60, height: 60, resizeMode: 'stretch', borderRadius: 15 }}
			/>
		);
		if (!image) {
			imageNode = [];
		}
		return (
			<View>
				<View style={styles.container}>
					<View>
						<TouchableOpacity transparent onPress={!this.props.enable ? () => this.chooseFile() : () => { }}>
							{children}
						</TouchableOpacity>
					</View>
					<View>
						{imageNode}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
	},
});