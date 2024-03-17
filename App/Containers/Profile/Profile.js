import AgentInfo from 'App/Components/AgentInfo';
import Loading from 'App/Components/Loading';
import ProfileCard from 'App/Components/ProfileCard';
import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Style from './ProfileStyles';



class ProfileScreen extends React.Component {
  render() {
    const {
      agentArea,
      agentDetail,
      attendanceDetail,
    } = this.props.agentDetails

    let visibleNode = [];
    if (!agentDetail) {
      visibleNode = <Loading />
    } else {
      visibleNode = (
        <ScrollView style={Style.box}>
          <AgentInfo heading={'Manager'} value={agentDetail.manager_name} />
          <AgentInfo heading={'Contact No.'} value={agentDetail.phone_no} />
          <AgentInfo heading={'Email'} value={agentDetail.email} />
          <AgentInfo heading={'Employee Code'} value={agentDetail.employee_code__c} />
          <AgentInfo heading={'Business'} value={agentDetail.business__c} />
          <AgentInfo heading={'Areas'} value={(agentArea.map((area) => HelperService.findMatchingKeyValueInList(this.props.agentAreas, 'id', area.area__c, 'name'))).join('\n')} />
        </ScrollView>
      );
    }

    return (
      <View style={{ flex: 1, paddingBottom: 10 }}>
        {agentDetail ? <ProfileCard data={agentDetail} /> : []}
        {visibleNode}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: state.user.agentAreas,
  agentDetails: state.user.agentDetails
});


export default connect(
  mapStateToProps,
)(ProfileScreen)
