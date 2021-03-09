import Profile from '../components/Profile'
import {connect} from 'react-redux'
import {updateProfile,walletGet} from '../services/Actions/actions'
const mapStateToProps=state=>({
    data:state.updateProfile,
    wdata:state.userWallet
})
const mapDispatchToProps=dispatch=>({
    fetchWallet:()=>dispatch(walletGet()),
    profileUpdateHandler:data=>dispatch(updateProfile(data))
    
    
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)