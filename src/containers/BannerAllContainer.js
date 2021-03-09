import BannerAll from '../components/bannerAll'
import {connect} from 'react-redux'

const mapStateToProps=state=>({
    wdata:state.userWallet
})
const mapDispatchToProps=dispatch=>({
    

})
export default connect(mapStateToProps,mapDispatchToProps)(BannerAll)