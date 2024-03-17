import React, { Component } from "react";
import { Button, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import SideBar from './SideBar'
 
export default class Drawer extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
    		isModalVisible: false
  		}
  	}
 
  	toggleModal(){
    	this.setState({ isModalVisible: !this.state.isModalVisible });
  	};
 
  	render() {

	    return (
	      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
	      	<TouchableOpacity 
	      		style={{paddingTop: 0, marginTop: 0}}
	      		onPress={() => this.toggleModal()}
	      	>
	        	{this.props.children}
	        </TouchableOpacity>
	        <Modal 
	        	isVisible={this.state.isModalVisible}
	        	animationIn={'slideInRight'}
	        	animationOut={'slideOutRight'}
	        	onBackdropPress={() => this.toggleModal()}
	        >
	          <View style={{ backgroundColor: '#ffffff', width: '80%', right: '-30%', height: Dimensions.get("window").height + 32}}>
	           	<SideBar toggleModal={() => this.toggleModal()}/>
	          </View>
	        </Modal>
	      </View>
	    );
  	}
}