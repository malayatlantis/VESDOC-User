import Watchhistory from '../components/Profile_components/Watchhistory'
import {connect} from 'react-redux'

const mapStateToProps=state=>({
    wdata:state.userWallet
})
const mapDispatchToProps=dispatch=>({
    

})
export default connect(mapStateToProps,mapDispatchToProps)(Watchhistory)