import NavigationService from 'App/Services/NavigationService'
import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import BlueButton from '../../Components/BlueButton'
import InputNumber from '../../Components/FormInput/InputMobile'
import { LOGIN, RESEND_OTP } from '../../Constants'
import Style from './LoginScreenStyle'
// import LayoutScreen from '../Layout/LayoutScreen'

export default class LoginOtpScreen extends Component {

    completeDay = () => {
        NavigationService.navigateAndReset('StartDayScreen')
    }
    render() {
        return (
            //   <LayoutScreen>
            <View style={Style.container}>
                <View style={Style.buttonBox}>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('App/Assets/Images/logo1.jpeg')}
                    />
                    {/* <View style={Style.clock}>
            <Text style={Style.time}>08 : 29 : 42</Text>
          </View> */}
                </View>
                <View style={Style.action}>
                    <InputNumber placeholder={'OTP'} />
                    <View style={Style.link}>
                        <Text style={Style.linkText}>
                            {RESEND_OTP}
                        </Text>
                    </View>
                    {/* <Button block rounded style={{ ...Style.button }} onPress={() => { }}>
                        <Text style={Style.text}>{LOGIN}</Text>
                    </Button> */}
                    <BlueButton title={LOGIN} onPress={this.completeDay} />
                </View>
            </View>
            //   </LayoutScreen>
        )
    }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(presentScreen)
