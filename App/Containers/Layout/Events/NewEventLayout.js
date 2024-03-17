import BackArrowButton from 'App/Components/BackArrowButton';
import { Colors } from 'App/Theme';
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default class NewEventLayout extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.title, "PROPS");
    }

    render() {
        const { title } = this.props;
        return (
            <View>
                <Header style={Styles.header}>
                    <View>
                        <BackArrowButton />
                    </View>
                    <View>
                        <Text>{title}</Text>
                    </View>
                    <View>
                        <Button transparent>
                            <Text></Text>
                        </Button>
                    </View>
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
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
