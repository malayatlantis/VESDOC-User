import Header from '../components/Header'
import {connect} from 'react-redux'
import {addToCart} from '../services/Actions/actions'

const mapStateToProps=state=>({
    data:state.addItems
})
const mapDispatchToProps=dispatch=>({
    

})
export default connect(mapStateToProps,mapDispatchToProps)(Header)