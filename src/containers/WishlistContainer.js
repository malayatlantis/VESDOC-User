import Wishlist from '../components/Profile_components/Wishlist'
import {connect} from 'react-redux'

const mapStateToProps=state=>({
    wdata:state.userWallet
})
const mapDispatchToProps=dispatch=>({
    

})
export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)