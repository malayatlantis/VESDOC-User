import React, { Component } from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import HeaderContainer from '../containers/HeaderContainer'
import FooterContainer from '../containers/FooterContainer'
import MainContainer from '../containers/MainContainer'
import DetailsContainer from '../containers/DetailsContainer'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
import PlayerContainer from '../containers/PlayerContainer'
import ProfileContainer from '../containers/ProfileContainer'
import PurchaseContainer from '../containers/PuschaseContainer'
import WishlistContainer from '../containers/WishlistContainer'
import WatchhistoryContainer from '../containers/WatchhistoryContainer'
import ChannelContainer from '../containers/ChannelContainer'
import SearchContainer from '../containers/SearchContainer'
import CreatorDetails from '../containers/CreatorResultContainer'
import CategorySearch from '../containers/CategoryResultContainer'
import CategoryMobile from '../containers/CategoryMobileContainer'
import BannerAll from '../containers/BannerAllContainer'
import About from '../components/about'




import './App.css';
import {checkAuth} from '../utils/auth'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
export default class App extends Component {
  
  
  render() {
    return (
      <div>

        <HeaderContainer {...this.props}/>
        <Route render={({location})=>(
            <TransitionGroup >
                  <CSSTransition
                        key={location.key}
                        timeout={0}
                        classNames="fade"
                    >
                    <div  style={{minHeight:"90vh"}}>
                      <Switch location={location}>
                          <Route exact path='/' component={MainContainer}></Route>
                          <Route  path='/test' component={HomeContainer}></Route>
                          <Route path='/login' component={LoginContainer}></Route>     
                          <Route path='/register' component={RegisterContainer}></Route> 
                          <Route path='/channel' component={ChannelContainer}></Route> 
                          <PrivateRoute path='/profile' component={ProfileContainer}></PrivateRoute> 
                          <PrivateRoute path='/watchLater' component={WishlistContainer}></PrivateRoute> 
                          <PrivateRoute path='/watchHistory' component={WatchhistoryContainer}></PrivateRoute> 
                          <Route path='/details' component={DetailsContainer}></Route>
                          <Route path='/player' component={PlayerContainer}></Route>
                          <Route path='/searchPage' component={SearchContainer}></Route>
                          <Route path='/CreatorDetails' component={CreatorDetails}></Route>
                          <Route path='/CategorySearch' component={CategorySearch}></Route>
                          <Route path='/CategoryMobile' component={CategoryMobile}></Route>
                          <Route path='/viewBanner' component={BannerAll}></Route>

                          <Route path='/about' component={About}></Route>

                          
                          <PrivateRoute path='/purchasePlaylist' component={PurchaseContainer}></PrivateRoute> 
                      </Switch> 
                    </div>  
              </CSSTransition>
            </TransitionGroup>
        )} />
        <FooterContainer {...this.props}/>      
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
      checkAuth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/login' />
  )} />
)