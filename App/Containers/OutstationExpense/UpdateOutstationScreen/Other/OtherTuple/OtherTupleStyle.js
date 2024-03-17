import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

export default StyleSheet.create({
    box: {
        alignSelf: 'center',
        backgroundColor: Colors.clrF1F9FF,
        width: Dimensions.get('window').width - 30,
        marginVertical: 5,
        padding: 15,
        borderRadius: 10,
        position: 'relative'
    },
    btmBox: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5
    },
    desc: {
        color: Colors.button,
        fontSize: 12,
        fontFamily: ApplicationStyles.textFont,
    },
    detail: {
        fontFamily: ApplicationStyles.textMsgFont,
        color: Colors.clr66,
        fontSize: 14,
        textTransform: 'capitalize',
        textAlign: 'right',
        width: '75%'
    },
    strip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    title: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 16
    },
    ttl: {
        color: Colors.clr66,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 14,
        width: '25%'
    },
    tuple: {
        borderBottomColor: Colors.button,
        flexDirection: 'row'
    },
    userCircle: {
        alignItems: 'center',
        backgroundColor: Colors.user,
        borderRadius: 50,
        flexDirection: 'row',
        height: 56,
        justifyContent: 'center',
        width: 56,
    },
    userDtl: {
        padding: 10,
        justifyContent: 'center'
    },
    userIcon: {
        height: 16,
        width: 16,
    },
    checkbox: {
        borderRadius: 5,
        marginRight: 18
    },
    customBox: {
        alignSelf: 'center',
        backgroundColor: Colors.clrF1F9FF,
        borderColor: 'red',
        borderWidth: 1,
        width: Dimensions.get('window').width - 30,
        marginVertical: 5,
        padding: 12,
        borderRadius: 10,
        position: 'relative'
    }
})
