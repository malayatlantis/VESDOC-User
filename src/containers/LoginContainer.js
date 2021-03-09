import Login from '../components/Login'
import {connect} from 'react-redux'

const mapStateToProps=state=>({
    wdata:state.userWallet
})

const mapDispatchToProps=dispatch=>({

})

export default connect(mapDispatchToProps,mapStateToProps)(Login)