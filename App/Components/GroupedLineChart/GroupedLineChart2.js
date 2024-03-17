import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import { Colors } from '../../Theme';

export default class GroupedLineChart extends Component {
	render() {
		return (
			<View style={{alignItems: 'center'}}>
			  <LineChart
			    data={{
			      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
			      datasets: [
			        {
			          data: [
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100
			          ],
			          data: [
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100,
			            Math.random() * 100
			          ]
			        }
			      ]
			    }}
			    width={Dimensions.get("window").width -40} // from react-native
			    height={220}
			    yAxisLabel="$"
			    yAxisSuffix="k"
			    chartConfig={{
			      backgroundColor: Colors.button,
			      backgroundGradientFrom: Colors.button,
			      backgroundGradientTo: Colors.button,
			      decimalPlaces: 2, // optional, defaults to 2dp
			      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			      style: {
			        borderRadius: 16
			      },
			      propsForDots: {
			        r: "6",
			        strokeWidth: "2",
			        stroke: Colors.button
			      }
			    }}
			    bezier
			    style={{
			      marginVertical: 8,
			      borderRadius: 16
			    }}
			  />
			</View>
		)
	}
}