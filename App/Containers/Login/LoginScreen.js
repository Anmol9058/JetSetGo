import BlueButton from 'App/Components/BlueButton'
import InputPassword from 'App/Components/FormInput/InputPassword'
import InputText from 'App/Components/FormInput/InputText'
import UserActions from 'App/Stores/User/Actions'
import React, { Component } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import Style from './LoginScreenStyle'
    

    
    class LoginScreen extends Component {
        submit(){
            Keyboard.dismiss(); 
            const {
                loginUser,
                password,
                mobile
            } = this.props;
    
            loginUser({
                mobile: mobile, 
                password: password
            });  
        }
       
    
        render() {
            const {
                validation,
                changeForm,
                password,
                loading,
                mobile
            } = this.props;
    
            return (
                <KeyboardAvoidingView 
                
                style={Style.container}>
                     <View style={Style.buttonBox}>
                        <Image
                            style={{ width: 350, height: 200, resizeMode: 'contain', borderRadius:10 }}
                            source={require('App/Assets/Images/logo1.jpeg')}
                        />
                    </View>
                    <View style={Style.action}>
                        <InputText 
                            placeholder={'Username'} 
                            value={mobile} 
                            onChange={(value) => changeForm({mobile: value, password: password})} 
                            error={validation.mobile} 
                        />
    
                        <InputPassword 
                            placeholder={'Password'} 
                            value={password} 
                            onChange={(value) => changeForm({password: value, mobile: mobile})} 
                            error={validation.invalid_password} 
                        />
    
                        <BlueButton
                            style={Style.button}
                            onPress={() => this.submit()}
                            disabled={loading}
                            loading={loading}
                            title={'Login'}
    
                        />
                    </View>
                </KeyboardAvoidingView>
            )
        }
    }
    
    const mapStateToProps = (state) => ({
      mobile: state.user.mobile,
    password: state.user.password,
    loading: state.user.userLoginIsLoading,
  
    validation: state.user.validation
  })
  
  const mapDispatchToProps = (dispatch) => ({
    loginUser: (data) => dispatch(UserActions.loginUser(data)),
    changeForm: (data) => dispatch(UserActions.changeLoginForm(data))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
  
    
    