import Footer from "../components/Footer";
import {connect} from 'react-redux';


 const mapStateToProps=state=>({
    data:state.addItems
})
const mapDispatchToProps=dispatch=>({
    

})
export default connect(mapStateToProps,mapDispatchToProps)(Footer)