import React from 'react';
import { Text } from 'react-native';
import Style from './FieldEntriesStyles';

const FieldName = ({ style, value}) => (
	<Text style={{...Style.label}}>
		{value}
	</Text>
)

export default FieldName