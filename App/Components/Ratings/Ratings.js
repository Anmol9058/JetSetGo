import React from 'react'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Style from './RatingsStyles'
import _ from 'lodash'

const Ratings = ({ style, value}) => {
	let i;
	let visibleNode = [];
	var ratingNumber = 5;
	value = Number(value)
	if (value > ratingNumber) {
		value= ratingNumber
	}
	let fullStarCount = 0;
	let halfStarCount = 0;
	let noStarCount = 0;
	let isDecimal = !!(value%1);

	if (isDecimal) {
		value = value - 0.5
		halfStarCount = 1;
		fullStarCount = value;
		noStarCount = ratingNumber-fullStarCount - 1
	}else {
		halfStarCount = 0;
		fullStarCount = value;
		noStarCount = ratingNumber-fullStarCount
	}

	for(i=1; i<=fullStarCount; i++) {
		visibleNode.push(
			<Icon 
		      name={`ios-star`} 
		      ios={`ios-star`} 
		      android={`md-star`} 
		      style={{...Style.icon}}
		      key={_.uniqueId()}
	    	/>
		);
	}

	for(i=1; i<=halfStarCount; i++) {
		visibleNode.push(
			<Icon 
		      name={`ios-star-half`} 
		      ios={`ios-star-half`} 
		      android={`md-star-half`} 
		      style={{...Style.icon}}
		      key={_.uniqueId()}
	    	/>
		);
	}

	for(i=1; i<=noStarCount; i++) {
		visibleNode.push(
			<Icon 
		      name={`ios-star-outline`} 
		      ios={`ios-star-outline`} 
		      android={`md-star-outline`} 
		      style={{...Style.icon}}
		      key={_.uniqueId()}
	    	/>
		);
	}
	
	return (visibleNode)
}

export default Ratings
