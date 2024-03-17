import BackArrowButton from 'App/Components/BackArrowButton';
import { Colors } from 'App/Theme';
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default class OutstationExpenseListScreenLayout extends React.Component {
    render() {
        return (
            <View>
                <Header style={Styles.header}>
                    <Left>
                        <BackArrowButton />
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </Right>
                </Header>
                {this.props.children}
            </View>
        )
    }
}


const Styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white,
        borderBottomWidth: 0,
        width: wp('100%'),
        justifyContent: 'flex-start'
    }
});
