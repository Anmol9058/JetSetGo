import CircularProgressBar from 'App/Components/CircularProgressBar'
import Loading from 'App/Components/Loading'
import Separator from 'App/Components/Separator'
import SingleInfo from 'App/Components/SingleInfo'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import _ from 'lodash'
import { Text, Icon } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native'
import { FlatList, Dimensions } from 'react-native'
import { View } from 'react-native'
import { connect } from 'react-redux'
// import Style from './DashboardScreenStyle'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class MyDetailsList extends React.Component {

    render() {
        return (
            <View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>LMD VS MTD</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: 'black', height: 70, width: 120 }}>
                        <Text style={{ padding: 10, fontWeight: 'bold' }}>MTD</Text>
                        <Text style={{ paddingHorizontal: 10, fontWeight: 'bold' }}>LMD</Text>
                    </View>

                </View>

                <View>
                    <BarChart
                        data={{
                            labels: [
                                'Coper',
                                'Meplitho',
                                'Coated',
                                'VAP',
                            ],
                            datasets: [
                                {
                                    data: [100, 200, 300, 400],
                                },
                            ],
                        }}
                        width={wp('90%')}
                        height={hp('70%')}
                        // yAxisLabel={'Rs'}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#FDFEFE',
                            backgroundGradientTo: '#FDFEFE',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            // style: {
                            //     borderRadius: 16,
                            // },
                        }}
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 20,
                        }}
                    />
                </View>

            </View>

        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDetailsList)
