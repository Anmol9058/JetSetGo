import React from 'react'
import { Container, Content, Spinner, Text, View } from 'native-base';
import Style from './NoDataFoundStyles';

const NoData = ({ style, onPress, title, disabled = false, text = 'No Data', children }) => (
	<Container style={{ ...{ justifyContent: 'center', alignItems: 'center', padding: 10}, ...style }}>
		<Text style={{ ...Style.text }}>{text}</Text>
		{children}
	</Container>
)

export default NoData