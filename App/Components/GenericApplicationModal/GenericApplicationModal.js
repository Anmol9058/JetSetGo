import GenericIcon from 'App/Components/GenericIcon';
import React, { Component } from 'react';
import { Modal, SafeAreaView, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApplicationStyles, Colors } from '../../Theme';

//onSubmit
export default class ActionModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
      heading,
  		children,
      visible,
      disabled,
      animationType,
      content,
      close,
      bodyFlexHeight
  	} = this.props;

    let parentFlex = 1;
    let topContainerFlexHeight = .4;
    let bottomContainerFlexHeight = .6;

    if (!!bodyFlexHeight) {
      bottomContainerFlexHeight = bodyFlexHeight;
      topContainerFlexHeight = parentFlex  - bottomContainerFlexHeight;
    }


    return (
      	<SafeAreaView>
		        <Modal
		          animationType={animationType || 'slide'}
		          transparent={false}
		          visible={visible}
		          onRequestClose={() => {
		            this.hideModal()
		          }}>
              {<GestureHandlerRootView style={{flex:1}}>
		          <TouchableWithoutFeedback onPress={() => close()} disabled={disabled}>
                <View style={{flex: topContainerFlexHeight, backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 100}}></View>
              </TouchableWithoutFeedback>
		          <View style={{flex: bottomContainerFlexHeight, backgroundColor: Colors.white, zIndex: 4}}>
		          		<View style={{flex: .13, alignItems: 'center', justifyContent: 'center'}}>
		          			<Text style={{color: Colors.button, alignSelf: 'center', fontFamily: ApplicationStyles.textMsgFont, fontSize: 20}}>{heading}</Text>
				              <TouchableHighlight
				              	style={{paddingTop: 2, position: 'absolute', left: 0, paddingLeft: 8}}
                        disabled={disabled}
				                onPress={() => {
				                  close();
				                }}>
				                <GenericIcon name={'close-circle'} style={{fontSize: 30, color: Colors.button}}
                        show={true}
                        />
				              </TouchableHighlight>
			          	</View>
			          	<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
		          			{content}
		          		</View>
		        </View>
            </GestureHandlerRootView>
          }
		    </Modal>
      	</SafeAreaView>
    );
  }
}