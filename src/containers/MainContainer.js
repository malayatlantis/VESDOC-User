import MainHome from '../components/Home_componets/MainHome'
import {connect} from 'react-redux'
import {addToCart,removeToCart} from '../services/Actions/actions'

const mapStateToProps=state=>({
    wdata:state.userWallet
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(MainHome)