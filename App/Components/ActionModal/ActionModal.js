import BlueButton from 'App/Components/BlueButton';
import GenericIcon from 'App/Components/GenericIcon';
import WhiteButton from 'App/Components/WhiteButton';
import React, { Component } from 'react';
import { Modal, SafeAreaView, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { ApplicationStyles, Colors } from '../../Theme';

//onSubmit
export default class ActionModal extends Component {
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
						<View style={{ flex: .4, backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 100 }}></View>
					</TouchableWithoutFeedback>
					<View style={{ flex: .6, backgroundColor: Colors.white, zIndex: 4 }}>
						<View style={{ flex: .11, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ color: Colors.button, alignSelf: 'center', fontFamily: ApplicationStyles.textMsgFont, fontSize: 20 }}>{'Recurring Frequency'}</Text>
							<TouchableHighlight
								style={{ paddingTop: 2, position: 'absolute', right: 0, paddingRight: 8 }}
								onPress={() => {
									this.onClose();
								}}>
								<GenericIcon name={'close-circle'} style={{ fontSize: 40, color: Colors.button }} 
								show={true}
								/>
							</TouchableHighlight>
						</View>
						<View style={{ flex: .75, padding: 15 }}>
							{body}
						</View>

						<View style={{ flex: .11, width: '100%', alignSelf: 'center', borderTopColor: Colors.clr0094FF, borderTopWidth: .3, padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
							<WhiteButton onPress={() => this.onClear()} title={'Clear'} style={{ width: '40%', alignSelf: 'flex-start', height: 40 }} />
							<BlueButton onPress={() => this.onSubmit()} title={'Apply'} style={{ width: '40%', alignSelf: 'flex-start', height: 40 }} />
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		);
	}
}