import React, { Component } from 'react'
import { Link , withRouter} from "react-router-dom";
import {get,post,authpost} from '../../utils/service'
import queryString from 'query-string';
import * as CONSTANT from '../../utils/constant'
import './ads.css'
import './player.css'
import 'video-react/dist/video-react.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton,
	BigPlayButton,
	PlayToggle
  } from 'video-react';
import { Button } from 'reactstrap';
import { MdSkipNext,MdSkipPrevious ,MdSettings,MdNavigateNext,MdNavigateBefore} from "react-icons/md";
import { GoInfo} from "react-icons/go";
import { ContactsOutlined } from '@material-ui/icons';
import { BsSkipEndFill } from "react-icons/bs";
const sources = {
	sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
	bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
	bunnyMovie: 'http://testvideoquantex.s3.ap-south-1.amazonaws.com/sample_1920x1080.mp4',
	test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

export default class player extends Component {
    constructor(props) {
        window.scrollTo(0, 0);
		super(props);
		this.state = {
			playlist_id:0,
            episode_id:0,
			source:'',
			startTime:0,
			open:false,

			poster:'',
			low:'',
			medium:'',
			high:'',

			quality:'Low',
			playerDisplay:'block',
			adsDisplay:'none',
			playAdsNo:1,
			totalAds:0,
			ads:'',

			adsCompany:'',
			adsCompanyDes:'',
			adsCompanyDomain:'',
			adsCompanyURL:'',

			adsCompanyLogo:'',
			PlayAds:false,
			adsCountDiv:'none',
			adsCounter:3,
			adsPlaying:0,
			playingStatus:0,
			totalPlaying:0,
			currentPlaying:0,
			subscription_type:0,
			trailerStatus:'',
			mobileOptionStatus:true,
			skipCounter:5,
			skipCountDiv:'none',
			skipStatus:false,
			adsPlayingStatus:false,
			ads_id:0,
			adsHaveStatus:true,
			adsPlayerDuration:0,
			adsSkipDesignStartStatus:false
		
		}
		// this.play = this.play.bind(this);
		// this.pause = this.pause.bind(this);
		// this.load = this.load.bind(this);
		this.changeCurrentTime = this.changeCurrentTime.bind(this);
		// this.seek = this.seek.bind(this);
		// this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
		// this.changeVolume = this.changeVolume.bind(this);
		// this.setMuted = this.setMuted.bind(this);
	}
	
	 onOpenModal = () => {
		 this.setState({
			 open:true
		 })
	 };
	 onCloseModal = () => {
		this.setState({
			open:false
		})
	 };

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props !== prevProps) {
			this.setState({
				low:this.props.souseFile,
				medium:this.props.souseFile,
				high:this.props.souseFile,
				poster:this.props.thumbnail,
				source:this.props.souseFile,
				playlist_id:this.props.playlistID,
            	episode_id:this.props.episodeID,
				subscription_type:this.props.subscription_type,
				trailerStatus:this.props.trailer
			})
			this.player.load();
			// console.log(this.props)
		  }
	}
   componentDidMount(){
		// console.log(this.props)
		clearInterval(this.newInterval)
		this.setState({
				low:this.props.souseFile,
			medium:this.props.souseFile,
			high:this.props.souseFile,
			poster:this.props.thumbnail,
			source:this.props.souseFile,

		})
		/***********ADS API********** */
		get('/ads/adsmanagement/')
        .then(response=>{
             console.log(response.data)
			if(response.data.length!=0){
				console.log(response.data.id)
				this.setState({
					ads_id:response.data.id,
					ads:response.data.video,
					adsCompany:response.data.companyName,
					adsCompanyDes:response.data.companyShortDescriptions,
					adsCompanyLogo:response.data.companyLogo,
					adsCompanyDomain:response.data.domainName,
					adsCompanyURL:response.data.redirectURL,
					adsHaveStatus:true
				})
			}else{
				this.setState({
					adsHaveStatus:false
				})
			}
            
        })
        .catch(error=>{
            console.log(error)
        })
		
		setTimeout(()=>{ 
			this.timer()	 
		}, 20000);
		
   }
componentWillUnmount() {
	clearInterval(this.newInterval)
	console.log('timer clear')
}
timer = () =>{
	console.log('timer start')
	this.newInterval=setInterval(() => {
		try {
			const { player } = this.player.getState();
		 
			if(this.state.totalAds==0){
				if(parseInt(player.duration/450)<2){
					this.setState({ totalAds:2})
				}else{
					this.setState({ totalAds:parseInt(player.duration/30)})
				}
			}
			// console.log(this.state.totalAds)
			// console.log(player)
			//  console.log(player.currentTime)
			
			if(player.paused==false){
				this.BehaviourAdd(player.currentTime)
				// console.log(this.state.trailerStatus)
				// console.log('total ads - '+this.state.totalAds)
				// console.log('player Duration - '+player.duration)
				// console.log('Play Ads No - '+this.state.playAdsNo)
				// console.log('Current Time - '+player.currentTime)
				// console.log('ads play time - '+(player.duration/(this.state.totalAds))*this.state.playAdsNo)
				// console.log('conditional status - '+((player.currentTime>((player.duration/(this.state.totalAds))*this.state.playAdsNo)) && (player.currentTime<(((player.duration/(this.state.totalAds))*this.state.playAdsNo)+5))))
				// console.log('ADS Playing Status - '+this.state.adsPlayingStatus)
				// console.log('ADS Have Status - '+this.state.adsHaveStatus)
				if(this.state.adsHaveStatus){
					if(this.state.trailerStatus!='true'){
						// console.log(this.state.trailerStatus)
						// console.log(this.state.subscription_type)
						if(this.state.subscription_type==0){
							
							if((player.currentTime>((player.duration/(this.state.totalAds))*this.state.playAdsNo)) && (player.currentTime<(((player.duration/(this.state.totalAds))*this.state.playAdsNo)+6))){
								this.setState({adsPlaying:0,playingStatus:0,totalPlaying:1,adsSkipDesignStartStatus:false});
								if(this.state.adsPlayingStatus){
									clearInterval(this.newInterval)
								}else{
									this.adsStart(player.isFullscreen)
									clearInterval(this.newInterval)
								}
								console.log('timer pause')
							}else{
								var timeDiff=(player.duration/(this.state.totalAds))
								var totalAdsRemaining = (player.currentTime/timeDiff)
								if(this.state.playAdsNo<totalAdsRemaining){
									this.setState({adsPlaying:parseInt(totalAdsRemaining-(this.state.playAdsNo)),playingStatus:1,totalPlaying:parseInt(totalAdsRemaining-(this.state.playAdsNo-1)),adsSkipDesignStartStatus:false});
									this.adsStart(player.isFullscreen)
									clearInterval(this.newInterval)
									console.log('timer pause1')
								}
							}
						}
					}
				}
			
			}else{
				if(player.currentTime==player.duration){
					clearInterval(this.newInterval)
					console.log('timer stop')
				}
			}
		}
		catch(err) {
		  console.log(err)
	
		}
	},4000);
	
}
BehaviourAdd=(endTime)=>{
	const data={
		'playlist_id':this.state.playlist_id,
		'episode_id':this.state.episode_id,
		'endTime':endTime
	}
	authpost('/features/viewsCreate/',data)
	.then(res=>{
	//	console.log(res)
	})
	.catch(err=>{

	})
}


  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(fullScreen,state) {
	if(state.duration!=this.state.adsPlayerDuration){
		this.setState({
			adsPlayerDuration:state.duration
		})
		console.log("state duration"+state.duration)
	}
	if(state.duration==state.currentTime && state.currentTime!=0 && this.state.adsPlayingStatus==true){
		this.adsStop(fullScreen)
	}	

  }

  changeCurrentTime(seconds) {
    return () => {
		try {
			const { player } = this.player.getState();
		  }
		  catch(err) {
			console.log(err)
		  }
		
      
      this.player.seek(player.currentTime + seconds);
    };
  }

  changeQuality(name) {
    return () => {
		try {
			const { player } = this.player.getState();
		  }
		  catch(err) {
			console.log(err)
		  }
		
		if(name=='Low'){
			this.setState({
				source: this.state.low,
				startTime:player.currentTime,
				quality:'Low'
			});
		}else if(name=='Medium'){
			this.setState({
				source: this.state.medium,
				startTime:player.currentTime,
				quality:'Medium'
			});
		}else if(name=='High'){
			this.setState({
				source: this.state.high,
				startTime:player.currentTime,
				quality:'High'
			});
		}
		
		this.player.load();
	  	// this.player.play();
    };
  }
next=() =>{
	console.log('next');
	
}
pre=() =>{
	console.log('pre');

}
setting = () =>{
	console.log('setting');
}
adsStop = (fullScreen) =>{
	try{
		console.log('stop ads')
		this.setState({
			adsPlayingStatus:false,
			skipStatus:false,
			adsPlayerDuration:0
		})
		if(this.state.adsPlaying==0){
			this.setState({
				playerDisplay:"block",
				adsDisplay:'none',
				

				PlayAds:false,
				adsPlaying:0,
				currentPlaying:0
			})

			/***********ADS API********** */
			get('/ads/adsmanagement/')
			.then(response=>{
				// console.log(response)
				if(response.data.length!=0){
					this.setState({
						ads_id:response.data.id,
						ads:response.data.video,
						adsCompany:response.data.companyName,
						adsCompanyDes:response.data.companyShortDescriptions,
						adsCompanyLogo:response.data.companyLogo,
						adsCompanyDomain:response.data.domainName,
						adsCompanyURL:response.data.redirectURL,
						adsHaveStatus:true
					})
				}else{
					this.setState({
						adsHaveStatus:false
					})
				}
				
			})
			.catch(error=>{
				console.log(error)
			})
			this.player1.pause();
			this.player.play();
			this.timer()
		}else{
			get('/ads/adsmanagement/')
			.then(response=>{
			//	console.log(response)
				if(response.data.length!=0){
					this.setState({
						ads_id:response.data.id,
						ads:response.data.video,
						adsCompany:response.data.companyName,
						adsCompanyDes:response.data.companyShortDescriptions,
						adsCompanyLogo:response.data.companyLogo,
						adsCompanyDomain:response.data.domainName,
						adsCompanyURL:response.data.redirectURL,
						adsHaveStatus:true,
						adsPlaying:this.state.adsPlaying-1
					})
					this.adsStart(fullScreen)
				}else{
					this.setState({
						adsHaveStatus:false
					})
				}
			})
			.catch(error=>{
				console.log(error)
			})
		}
	}
	catch(err) {
	  console.log(err)
	}
}
adsStart = (fullScreen) =>{
	console.log('ads coming.....')
	// console.log(this.state.ads)
	// console.log(this.state.ads_id)

	this.setState({
		adsCountDiv:'block',
		adsPlayingStatus:true,
		adsCounter:3
	})
	if(fullScreen){
		this.player.toggleFullscreen()
	}
	if(this.state.playingStatus==0){
		const interval = setInterval(() => {
			this.setState({
				adsCounter:this.state.adsCounter-1,
			})
			if(this.state.adsCounter<0){
				clearInterval(interval)
				this.setState({
					 adsCounter:1,
				})
			}
		  }, 1000);
		setTimeout( () => {
			this.setState({
				adsCountDiv:'none',
				adsCounter:3,
				currentPlaying:1,
				totalPlaying:1
			})
			this.player.pause();
			this.setState({
				playerDisplay:"none",
				adsDisplay:'block',
				playAdsNo:this.state.playAdsNo+1,
				PlayAds:true
			})
			console.log('start ads')
			this.player1.load();
			const { player } = this.player1.getState();
			this.player1.subscribeToStateChange(this.handleStateChange.bind(this,fullScreen));
			// setTimeout( () => this.adsStop(fullScreen), player.duration*1000)
		},3000)
	
	}else{
		this.setState({
			currentPlaying:this.state.currentPlaying+1,
			adsCountDiv:'none',
		})
		this.player.pause();
		this.setState({
			playerDisplay:"none",
			adsDisplay:'block',
			playAdsNo:this.state.playAdsNo+1,
			PlayAds:true
		})
		console.log('start ads1')
		this.player1.load();
		const { player } = this.player1.getState();
		// setTimeout( () => this.adsStop(fullScreen), player.duration*1000)
		this.player1.subscribeToStateChange(this.handleStateChange.bind(this,fullScreen));
	}

	setTimeout(() => {
		//console.log("player duration"+player.duration)
		console.log("state player duration"+this.state.adsPlayerDuration)

		if(this.state.adsPlayerDuration*1000>10){
			setTimeout(()=>this.adsSkip('true'), 2000)
			this.setState({
				adsSkipDesignStartStatus:true
			})
		}
	},5000)


	/******API CALLING********** */
	const data={
		play_id:this.state.playlist_id,
		ads_id:this.state.ads_id
	}
	post('/ads/adsbehaviour/',data)
	.then(response=>{

	})
	.catch(error=>{
		console.log(error)
	})
	

	/**************************** */
}
adsSkip = () =>{
	setTimeout(()=>{
		this.setState({
			skipCountDiv:'block',
			skipStatus:false,
		})
		const interval = setInterval(() => {
			this.setState({
				skipCounter:this.state.skipCounter-1,
			})
			if(this.state.skipCounter<0){
				clearInterval(interval)
				this.setState({
					 skipCounter:1,
				})
			}else{
				
			}
		  }, 1000);
		  setTimeout( () => {
			clearInterval(interval)
			this.setState({
				skipStatus:true,
				skipCounter:5,
			})
		  },5000)
	}, 2000)

}
handleSkip = () =>{
	const { player } = this.player.getState();
	this.adsStop(player.isFullscreen)
	this.setState({
		skipCountDiv:'none',
		skipStatus:false,
	})
}



    render() {
		//console.log(this.state.poster)
        return (
            <>
            	
                <div className="col-md-12 playerDiv" style={{display:this.state.playerDisplay}} onScroll={this.playerScroll}>
                    <Player  className="player"
                    ref={player => {
                        this.player = player;
                    }}
                    autoPlay
                    poster={this.state.poster}
                //	aspectRatio='16:9'
                    startTime={this.state.startTime}
                //	fluid={false}
                    >
                    <source src={this.state.source} />
                    
                    <ControlBar autoHide={true}>
                    {/* <MdSkipPrevious className="cus-button video-react-control mobile-hide" onClick={this.pre}/> */}
                    <PlayToggle className="mobile-hide"/>
                    {/* <MdSkipNext className="cus-button video-react-control mobile-hide" onClick={this.next}/> */}
                    <VolumeMenuButton className="mobile-hide"/>
                    
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    
                    {/* <div className="dropup mobile-hide">

                    <center style={{paddingTop: "9px",fontSize:"11.5px",minWidth:"40px"}}>{this.state.quality}</center>
                    <div className="dropup-content">
                        <center>
                            <a style={{cursor:"pointer"}} onClick={this.changeQuality('High')}>High</a>
                            <a style={{cursor:"pointer"}} onClick={this.changeQuality('Medium')}>Medium</a>
                            <a style={{cursor:"pointer"}} onClick={this.changeQuality('Low')}>Low</a>
                        </center>
                        
                        
                        
                    </div>
                    </div> */}
                
                    </ControlBar>
                
                    
                    <BigPlayButton position="center" style={{display:"none"}} />
        
                    </Player>
                
                        
                   <div className="adsCounting" style={{display:this.state.adsCountDiv}}>
                        Ads in {this.state.adsCounter} sec
                    </div>
				
              
                    {/* <span className="mobile-setting" onClick={this.onOpenModal}><MdSettings className="cus-button video-react-control setting-icon " /> Setting</span> */}
                            <span className="mobile-priv-icon" onClick={this.changeCurrentTime(-10)} ><MdNavigateBefore className="cus-button video-react-control setting-icon nextPri"/>10</span>
                            <span className="mobile-skip-icon" onClick={this.changeCurrentTime(+10)} >10<MdNavigateNext className="cus-button video-react-control setting-icon nextPri" /></span>
					   
                            <Modal open={this.state.open} onClose={this.onCloseModal} center>
                            <div style={{width:"70vw"}}>
                                <h3>Playback Settings</h3>	<br/>
                                <p>
                                    <label for="video-select">Video Quality</label>
                                <select className="form-control" id="video-select">
                                <option value="hd1080">High</option>
                                <option value="hd720">Medium</option>
                                <option value="large">Low</option>
                            </select>
                            <br/>
                            <label for="speed-select">Video Speed</label>
                            <select className="form-control"id="speed-select">
                                <option  value="0.25">0.25</option>
                                <option  value="0.5">0.5</option>
                                <option  value="0.75">0.75</option>
                                <option  value="1.25">1.25</option>
                                <option  value="1.5">1.5</option>
                                <option  value="1.75">1.75</option>
                                <option  value="2">2</option>
                            </select>

                                </p>
                                <Button onClick={this.load} className="btn" style={{float:"right",marginRight:"0"}}>
                                    OK
                                </Button>
                                </div>
                            </Modal>

                    </div>
                <div className="col-md-12 playerDiv adsDiv" style={{display:this.state.adsDisplay}}>
							<div className="abcd" >
								<div style={{pointerEvents:'none'}}>
									<Player  className="player"
										ref={player => {
											this.player1 = player;
										}}
										autoPlay
										poster='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmj7cgso8uQph5tcUVl52EaEhmVuuffaJapw&usqp=CAU'>
										<source src={this.state.ads} />
										<ControlBar autoHide={true} style={{backgroundColor:"red"}}>
														<PlayToggle className="mobile-hide"/>
														<VolumeMenuButton className="mobile-hide"/>
														<CurrentTimeDisplay order={4.1} />
														<TimeDivider order={4.2} />
														<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
										</ControlBar>
										<BigPlayButton position="center" style={{display:"none"}} />
									</Player>
								</div>
								<div className="skipCounting" style={{display:this.state.skipCountDiv}}>
								{
									this.state.skipStatus?
										<div style={{padding:"8px", cursor:"pointer"}} onClick={this.handleSkip}>Skip Ads <BsSkipEndFill /></div>
									:<div className="row" style={{margin:"0"}}>
									<span style={{width:"30%",padding:"8px 0"}}>{this.state.skipCounter}</span>
									<img src={this.state.poster} style={{width:"70%"}}/>
									</div>
								}
							</div>
							</div>
							<div className="adsTotalCounting">


							<span style={{fontSize:"12px"}}>Ad {this.state.currentPlaying} of {this.state.totalPlaying}&nbsp;<GoInfo style={{fontSize:"11px"}}/>&nbsp;<span style={{verticalAlign: "baseline"}}>{this.state.adsCompanyDomain}</span></span>
							</div>
						
							{
								this.state.PlayAds?
									<div className="adsBannerDiv row">
										
										<div className="row" style={{margin:0,flex:"auto"}}>
										<img className="adsLogo" src={this.state.adsCompanyLogo} />
										
										
										<div className="ad-cta-details">
											
											<span className="ad-cta-title">{this.state.adsCompany}</span><br/><span className="ad-cta-desc">{this.state.adsCompanyDes}</span>
											
											</div>
										</div>

										<div className="ad-cta-right-panel" role="presentation"><a href={this.state.adsCompanyURL} target="_blank" 
										className="ad-cta-button-title">Learn more</a></div>
									</div>
								:null

							}
							







									
							

						</div>	
                           
            </>
        )
    }
}

