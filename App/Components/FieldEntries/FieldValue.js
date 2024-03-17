import React from 'react';
import { Text } from 'react-native';
import Style from './FieldEntriesStyles';

const FieldValue = ({ style, value}) => (
	<Text style={{...Style.value}}>
		{value}
	</Text>
)

export default FieldValue