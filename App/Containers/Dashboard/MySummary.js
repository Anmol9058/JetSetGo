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
import { View, StyleSheet } from 'react-native'
import SpeedoMeter from 'App/Components/SpeedoMeter'
import { connect } from 'react-redux'
import { Table, Row, Rows } from 'react-native-table-component';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'



class MySummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Prod', 'Sep', 'Oct', 'Nov'],
            tableData: [
                ['Copier', '200MT', '300MT', '400MT'],
                ['Meplitho', '300MT', '400MT', '400MT'],
            ],
            tableHead2: ['Open'],
            tableData2: [
                ['20'],

            ]
        }
    }

    render() {

        const state = this.state;
        const arabic = "\u0633";
        return (
            <View>

                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Last 3 Month Product-Wise Sale</Text>
                </View>
                <View style={{ width: wp('90%'), margin: 20 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#00000029' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Complaints</Text>
                </View>
                <View style={{ width: wp('20%'), margin: 20, alignSelf: 'center' }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#00000029' }}>
                        <Row data={state.tableHead2} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData2} textStyle={styles.text} />
                    </Table>
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Total Target VS Actual MTD</Text>
                    </View>

                    <View style={{ borderWidth: 2, borderColor: '#00000029', height: 70, width: 120 }}>
                        <Text style={{}}>{-50}</Text>
                        <Text style={{}}>50-80</Text>
                        <Text style={{}}>80-</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center' }}>

                    <AnimatedCircularProgress
                        size={wp('65%')}
                        width={wp('5%')}
                        rotation={-90}
                        arcSweepAngle={180}
                        fill={50}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875">
                        {
                            (fill) => (
                                <Text style={{}} >
                                    {'50%'}
                                </Text>
                            )
                        }

                    </AnimatedCircularProgress>
                    <View style={{ bottom: 100, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 100 }}>Actual</Text>
                        <Text style={{ marginLeft: 70 }}>Target</Text>
                    </View>
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
)(MySummary)


const styles = StyleSheet.create({
    head: { height: 40 },
    text: { margin: 10, textAlign: 'center' }
});
