import MainPlayer from '../components/Player_components/mainPlayer'
import {connect} from 'react-redux'
import {addToCart,removeToCart} from '../services/Actions/actions'

const mapStateToProps=state=>({
    data:state.addItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(MainPlayer)