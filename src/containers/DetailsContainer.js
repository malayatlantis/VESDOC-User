import MainDetails from '../components/Details_componets/MainDetails'
import {connect} from 'react-redux'
import {addToCart,removeToCart} from '../services/Actions/actions'

const mapStateToProps=state=>({
    data:state.addItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(MainDetails)