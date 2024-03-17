import React from 'react';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Theme';


const ProgressBar = ({progress}) => (
	   <Progress.Bar progress={progress} width={wp('85%')} color={Colors.primary} unfilledColor={Colors.lightGrey} height={hp('1.3%')} useNativeDriver={true} borderRadius={hp('1%')}/>
);

export default ProgressBar
