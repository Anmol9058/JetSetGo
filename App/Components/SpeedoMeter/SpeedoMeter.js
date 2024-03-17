import React from 'react';
import { SafeAreaView } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import { Colors } from '../../Theme';

class SpeedoMeter extends React.Component {
    state = {
        value: 0,
      };
    render() {
       
  //   console.log(this.props.datasource)
        return (
            <SafeAreaView>
               
                <RNSpeedometer
                    labelWrapperStyle={{ height: 100, width:200 }}
                    innerCircleStyle={{ backgroundColor:Colors.white}}
                    outerCircleStyle={{width:200}}
                    //needleImage={require('App/Assets/Images/speedometer-needle.png')}
                    //labelNoteStyle={{fontSize:'4%'}}
                   // labelStyle={{width:100, fontSize:'4%'}}
                    easeDuration={500}
                    labels={[
                        {
                            name: 'Used',
                            labelColor: '#d6211d',
                            activeBarColor: '#d6211d',
                        },
                        {
                            activeBarColor: '#00FF00',
                        },
                    ]}
                    value={this.props.datasource.credit_limit_used__c}
                    minValue={0}
                    maxValue={this.props.datasource.total_credit_limit__c}
                    size={200}
    
                />
            </ SafeAreaView>
        )
    }
}


export default SpeedoMeter
