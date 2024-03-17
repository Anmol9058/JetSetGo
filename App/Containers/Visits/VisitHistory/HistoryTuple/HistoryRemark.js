import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import GenericIcon from 'App/Components/GenericIcon'
import TextArea from "App/Components/FormInput/TextArea";
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

//onSubmit
export default class HistoryRemark extends Component {
	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	toggleModal() {
		this.setState({
			modalVisible: !this.state.visible
		});
	}

	hideModal() {
		this.setState({
			modalVisible: false
		});
	}

	onSubmit() {
		this.setState({
			modalVisible: false
		});

		//this.props.onSubmit()
	}

	onClose() {
		this.setState({
			modalVisible: false
		});

		//this.props.onClose();
	}

	onClear() {
		this.props.onClear();
	}

	render() {
		const {
			children,
			body
		} = this.props;

		return (
			<SafeAreaView>
				<TouchableOpacity transparent onPress={() => this.toggleModal()}>
					{children}
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.hideModal()
					}}>
					<TouchableWithoutFeedback onPress={() => this.onClose()}>
						<View style={{ flex: .3, backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 100 }}></View>
					</TouchableWithoutFeedback>
					<View style={{ flex: .5, backgroundColor: Colors.white, zIndex: 4 }}>
						<View style={{ flex: .11, alignItems: 'center', justifyContent: 'center' }}>
							
							<TouchableHighlight
								style={{ paddingTop: 2, position: 'absolute', right: 0, paddingRight: 8 }}
								onPress={() => {
									this.onClose();
								}}>
								<GenericIcon name={'close-circle'} style={{ fontSize: 40, color: Colors.button }} />
							</TouchableHighlight>
						</View>
						<View style={{ flex: .75, padding: 15 }}>
                        <Text style={{ fontSize: 18, color: Colors.button, marginBottom: 10,justifyContent:'center',alignItems:'center' }}>Remarks</Text>
                        <TextArea
                 disable={true}
                   numberOfLines={8}
                   value={body}

                   />
						</View>

						
					</View>
				</Modal>
			</SafeAreaView>
		);
	}
}