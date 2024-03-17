import React, { Component } from "react";
import { Item, Input} from 'native-base'
import { Keyboard } from "react-native";
import Style from './SearchBarStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SearchBar extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      value: this.props.value || '',
	      focus: false
	    };
	}

  	handleClearInput() {
	  	this.setState({
	  		value: ''
	  	});

	  	this.props.onInputClear('');
  	}

  	handleInputChange(value) {
	  	this.setState({
	  		value: value
	  	});

	  	this.props.onInputChange(value);

  	}

  	handleInputSubmit(value) {
	  	this.setState({
	  		value: value,
	  		focus: false
	  	});

	  	this.props.onInputSubmit(value);
  	}

  	handleOnFocus() {
  		this.setState({
	  		focus: true
	  	});
  	}

  	handleBackClick() {
  		this.setState({
	  		focus: false,
	  		value: ''
	  	});
  		Keyboard.dismiss();
  	}


  	render() {
  		return (
  			<Item style={{...Style.item, ...this.props.ContainerStyles}}>
  				{
  					this.state.focus ? 	
					    (<Icon
						    name={'arrow-back-ios'}
						    ios ={'arrow-back-ios'}
						    android={'md-arrow-back'}
						    style={{...Style.placeHolderIcon, ...this.props.IconStyles}}
						    onPress={() => this.handleBackClick()}
					    />) :
					    (<Icon
						    name={'search'}
						    ios ={'search'}
						    android={'md-search'}
						    style={{...Style.placeHolderIcon, ...this.props.IconStyles}}
					    />) 
				}
			  	<Input
				    onChangeText={(keyword) => {
				      this.handleInputChange(keyword)
				    }}
				    onSubmitEditing={({nativeEvent}) => this.handleInputSubmit(nativeEvent.text)}
				    placeholder={this.props.placeholder || "Search"}
				    value={this.state.value}
				    autoCorrect={false}
				    autoFocus={false}
				    onFocus={() => this.handleOnFocus()}
				    maxLength={140}
				    style={{...Style.input, ...this.props.inputStyles}}
				    placeholderTextColor={Style.placeholderStyle.color}
				    returnKeyType={'search'}
			  	/>
			  	{
  					(this.state.focus && this.state.value)? 	
					    (<Icon
						    name={'close'}
						    ios ={'close'}
						    android={'md-close'}
						    style={{...Style.placeHolderIcon, ...this.props.IconStyles}}
						    onPress={() => this.handleClearInput()}
					    />) :
					    []
				}
			</Item>
  		);
  	}
}
