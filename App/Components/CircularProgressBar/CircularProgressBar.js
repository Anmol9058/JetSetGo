import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './CircularProgressBarStyles'
import { Colors, ApplicationStyles, Fonts, Metrics } from '../../Theme'
import { Circle } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const CircularProgressBar = ({ style = {}, target, value, color, datasource }) => (


	<View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
		<AnimatedCircularProgress
			size={wp('60%')}
			width={wp('5%')}
			// fill={(value / target) * 100}
			fill={(datasource.credit_limit_used__c / datasource.total_credit_limit__c) * 100}
			arcSweepAngle={180}
			rotation={-90}
			tintColor={color ? color : Colors.red}
			backgroundColor={Colors.user}
			style={{ position: 'relative', height: wp('41%') }}
		>
			{
				(fill) => (
					<Text style={Style.targetText} >
						{datasource.credit_limit_used__c ? Math.round((datasource.credit_limit_used__c / datasource.total_credit_limit__c) * 100) + '%' : '0%'}
						{/* {datasource.credit_limit_used__c} */}
					</Text>
				)
			}

		</AnimatedCircularProgress>


		<View style={{ position: 'absolute', left: wp('13%'), bottom: wp('5%') }}>
			<Text style={Style.targetTextIndicator}>
				{/* {0} */}
				{datasource.credit_limit_used__c}
			</Text>
		</View>
		<View style={{ position: 'absolute', left: wp('66%'), bottom: wp('5%') }}>
			<Text style={Style.targetTextIndicator}>
				{datasource.total_credit_limit__c}
			</Text>
		</View>
		{/* <View style={{ position: 'absolute', left: wp('16%'), bottom: wp('3%') }}>
			<Text style={Style.targetTextIndicator}>
				{target}
			</Text>
		</View> */}
	</View>

);

export default CircularProgressBar
