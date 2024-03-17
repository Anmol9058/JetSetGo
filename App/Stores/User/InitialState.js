/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    mobile: '', //
    password: '',//password for user
    token: '', //user token after user is logged in, indication that user is loggin or not.
    id: '',//agent id after generated.
    user_started_day: false, //has user started the day
    user_ended_day: false, //has user ended the day
    user_marked_absent: false, // has user marked absent,
    userLoginIsLoading: false,
    userLoginErrorMessage: false,
    validation: {
        invalid_number: false,
        invalid_password: false,
        invalid_area: false,
        error_message: '',
    },
    area: '',
    latitude: '',
    longitude: '',
    agentAreas: [],
    agentCity :[],
    fetchAllAreasLoading: false,
    fetchAllAreasFailure: false,
    startDayTime: '',
    endDayTime: '',
    absentDayTime: '',
    absentReason: 'Leave',
    leaveType: 'Absent',
    userStartDayLoading: false,
    userEndDayLoading: false,
    userMarkedAbsentLoading: false,
    agentDetails: {},
    isASM: false,
    psmList: [],
    fetchAllPsmLoader: false,

    userLogoutIsLoading: false,


    Tax :[],
    taxLoader :'false',
    is_logged_in:''
}
