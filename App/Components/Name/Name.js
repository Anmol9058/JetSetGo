import React from 'react';
import { Text } from 'react-native';
import Style from './NameStyles';

const Name = ({ style, value}) => (
	<Text style={{...Style.name, ...style}}>
		{value}
	</Text>
)

export default Name