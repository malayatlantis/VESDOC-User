import Channel from '../components/Channel'
import {connect} from 'react-redux'


const mapStateToProps=state=>({
    data:state
})
const mapDispatchToProps=dispatch=>({
  

})
export default connect(mapStateToProps,mapDispatchToProps)(Channel)