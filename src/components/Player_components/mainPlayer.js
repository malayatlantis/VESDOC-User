import React, { Component } from 'react'
import Episode from './episode'
import Review from './review'
import Player from './player'
import Watch from './watch'
import { BsStar } from "react-icons/bs";
import {get,post,authpost} from '../../utils/service'
import queryString from 'query-string';
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom'
import './main.css'
import Related from './related';
import {checkAuth} from '../../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import { MdReport } from "react-icons/md";
import LoadingMask from "react-loadingmask";
import ReactSnackBar from "react-js-snackbar";
import "react-loadingmask/dist/react-loadingmask.css";
import 'react-toastify/dist/ReactToastify.css';

var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class mainPlayer extends Component {
    constructor(props) { 
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            playlist_id:urlCrypt.decryptObj(params.IDPlAyLI),
            episode_id:urlCrypt.decryptObj(params.IDEpiSo),
            trailerStatus:params.tra,
            playlistArray:[],
            episodeArray:[],
            tagArray:[],
            reviewArray:[],
            souseFile:'',
            thumbnail:'',
            related_playlist:[],
            Show: false,
            Showing: false,
            spin:false,
            watchLaterStatus:0,
            sanckbarMessage:'',
        }
       
     }
     logoutFunction = () =>{
        checkAuth.signout();
        localStorage.removeItem('docubayUserToken');
        localStorage.removeItem('docubayUserRefreshToken');
        localStorage.removeItem('docubayUserPhone');
        localStorage.removeItem('docubayUserEmail');
        localStorage.removeItem('docubayUserName');
        localStorage.removeItem('docubayUserChannelName');
        localStorage.removeItem('docubayUserProfileImage');
        localStorage.removeItem('docubayUserLoggedID');
        localStorage.removeItem('docubayUserID');
        toast.dark('Please Login!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        this.setState({
            spin:true
        })
        setTimeout(() =>  this.props.history.push('/login'),2000)
     }

     componentDidMount() {
        window.scrollTo(0, 0);
        if(this.state.trailerStatus=='false'){
            const data={
                logged_id:localStorage.getItem('docubayUserLoggedID')
            }
            authpost('/auth/checkauth/',data)
            .then(res=>{
                //console.log(res.status)
                if(res.status==200){
                    if(res.data==0){
                        this.logoutFunction()
                    }else{
                        if(res.data!=localStorage.getItem('docubayUserPhone')){
                            this.logoutFunction()
                        }
                    }
                }else{
                    this.logoutFunction()
                }
                
            })
            .catch(err=>{
    
            })
        }

         get('/video/ShowPlaylistDetailsWithParticularEpisodeDetails/'+this.state.playlist_id+'/'+this.state.episode_id)
         .then((data) => {
            //  console.log(data.data)
             if(data.status==200){
                document.title='Watch '+data.data.playlist.playlist_name+' - VESDOC'
                  this.setState({
                    playlistArray:data.data.playlist,
                    episodeArray:data.data.episode,
                    tagArray:data.data.tag,
                    reviewArray:data.data.review
                 })
                if(this.state.trailerStatus=='true'){
                  //  console.log(data.data.playlist.playlist_trailer)
                    this.setState({
                        souseFile:data.data.playlist.playlist_trailer,
                        thumbnail:data.data.playlist.playlist_banner,
                    })
                   
                }else{
                    this.setState({
                        souseFile:data.data.episode.video,
                        thumbnail:data.data.episode.thumbnail,
                    })
                   
                }
                if(this.state.trailerStatus=='false'){
                    if(data.data.playlist.point!=0 && data.data.playlist.subscription_type==1){
                        this.checkSubscription()
                    }
                }
             }
            
         }).catch(function (error) {
             console.log(error);
         }); 
         const data={
            'playlist_id':this.state.playlist_id
        }
         post('/video/showrelatedplaylist/',data)
         .then(response=>{
             this.setState({
                 related_playlist:response.data
             })
         })
         .catch(error=>{
             console.log(error)
         })
         const data22={
            episodeID:this.state.episode_id
         }
         authpost('/features/WatchLaterStatus/',data22)
         .then(response=>{
            //  console.log(response)
             this.setState({
                 watchLaterStatus:response.data
             })
         })
         .catch(error=>{
             console.log(error)
         })
         
     }
    
     checkSubscription = () =>{
        const data={
            'playlist_id':this.state.playlist_id
        }
        authpost('/video/checkSubcription/',data)
        .then(response=>{
        //    console.log(response)
           if(response.data!=1){
               var point=urlCrypt.cryptObj(String(response.data.point))
               console.log(point)
               var redirectURL=urlCrypt.cryptObj(String(this.props.location.pathname+this.props.location.search))
               console.log(redirectURL)
               this.setState({
                   spin:true
               })
               setTimeout(() => this.props.history.push('\purchasePlaylist?redirectURL='+redirectURL+'&point='+point+'&playList='+urlCrypt.cryptObj(String(this.state.playlist_id))),2000)
           }
        })
        .catch(error=>{
            console.log(error)
        })
     }
    //  handleWatch = () =>{
    //     const data223={
    //         episode_id:this.state.episode_id
    //      }
    //     authpost('/features/addwishlist/',data223)
    //     .then(response=>{
    //         if (this.state.Showing) return;
    //         this.setState({ Show: true, Showing: true, sanckbarMessage:response.data.msg });
    //         setTimeout(() => {
    //           this.setState({ Show: false, Showing: false });
    //         }, 2000);
    //         const data22={
    //             episodeID:this.state.episode_id
    //          }
    //         authpost('/features/WatchLaterStatus/',data22)
    //         .then(response=>{
    //             // console.log(response)
    //             this.setState({
    //                 watchLaterStatus:response.data
    //             })
    //         })
    //         .catch(error=>{
    //             console.log(error)
    //         })
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })

    //  }
    render() {
        return (
            <div>
                <LoadingMask loading={this.state.spin} text={"loading..."}>
                <ToastContainer />
                    <section className="section section--head section--gradient mobilePadding" style={{marginTop:0}}>
                        <div className="section__bg" data-bg="img/details.jpg"></div>
                        <div className="container">
                            <div className="article">
                                <div className="row">
                                
                                    <div className="row classPlayer">
                                        <Player souseFile={this.state.souseFile} thumbnail={this.state.thumbnail} playlistID={this.state.playlist_id} episodeID={this.state.episode_id} subscription_type={this.state.playlistArray.subscription_type} trailer={this.state.trailerStatus}/>
                                    </div>
                                        <div className="col-12 col-xl-12">
                                        <div className="article__content">
                                            {
                                                this.state.trailerStatus=='true'?
                                                <>
                                                    <h1 className="h2Margin">{this.state.playlistArray.playlist_name}</h1>
                                                    <span className="desSpan deskDes">{this.state.playlistArray.playlist_language} • {this.state.playlistArray.playlist_type} • Trailer {this.state.playlistArray.avg_rating!=0?<>• <BsStar style={{marginTop:"-7px",fontSize:"15px"}}/> {this.state.playlistArray.avg_rating}</>:null} • {this.state.playlistArray.total_viewer} Views</span>
                                                </>
                                                :
                                                <>
                                                    <h1 className="h2Margin">{this.state.episodeArray.episode_name}</h1>
                                                    <span className="desSpan deskDes">{this.state.playlistArray.playlist_name} • {this.state.playlistArray.playlist_language} • {this.state.playlistArray.playlist_type} • Episode - {this.state.episodeArray.episode_number}{this.state.playlistArray.avg_rating!=0?<> • <BsStar style={{marginTop:"-7px",fontSize:"15px"}}/> {this.state.playlistArray.avg_rating}</>:null} • {this.state.episodeArray.total_views} Views</span>
                                                    
                                                    <p className="reviews__text" style={{    backgroundColor: "#151f3000",padding:0,paddingTop:"10px",marginTop:"6px"}}  dangerouslySetInnerHTML={{ __html: this.state.episodeArray.short_descriptions }}>
                                

                                                    </p>
                                                    <Watch episode_id={this.state.episode_id} playlist_id={this.state.playlist_id}/>
                                                  

                                                </>
                                                
                                            }
                                        

                                        </div>
                                    </div>
                                
                                    <div className="col-12 col-xl-12">
                                        <Episode {...this.props}/>
                                    </div>
                                
                                    <div className="col-12 col-xl-12">
                                    <div className="categories">
                                            <h3 className="categories__title" style={{marginBottom:"10px"}}>Creator Details</h3>
                                        
                                            <Link to ={'/CreatorDetails?id='+urlCrypt.cryptObj(String(this.state.playlistArray.user_id))} className="reviews__text" style={{  backgroundColor: "#151f3000",padding:0,paddingTop:"10px",marginTop:"6px",width:"100%"}}>
                                                <div className="row" style={{paddingLeft    :"15px"}}>
                                                <div style={{marginRight:"15px"}}>
                                                    {
                                                        String(this.state.playlistArray.channelLogo).search("uploads") > 0?

                                                            <img
                                                                src={this.state.playlistArray.channelLogo}
                                                                style={{
                                                                width: "55px",
                                                            }}/>
                                                        :<Avatar
                                                            name={this.state.playlistArray.channelName}
                                                            size="55"
                                                        />
                                                    }
                                                
                                                </div>
                                                <div style={{color:"white"}}>
                                                    <span style={{fontSize:"20px"}}>{this.state.playlistArray.channelName}</span><br/>
                                                    <span style={{fontSize:"16px"}}>{this.state.playlistArray.creatorName}</span>
                                                </div>

                                            </div></Link>
                                        </div>
                                        <div className="categories">
                                            <h3 className="categories__title">Genres and Tags</h3>
                                            {
                                                this.state.tagArray.map((obj,i)=>
                                                    <Link to={"/CategorySearch?MhT="+urlCrypt.cryptObj(String(obj.tag_name))} className="categories__item" key={i}>{obj.tag_name}</Link>
                                                )
                                            }
                                        
                                        </div>
                                        <div className="categories">
                                            <h3 className="categories__title" style={{marginBottom:"10px"}}>Descriptions</h3>
                                            
                                            <p align="justify" className="reviews__text" style={{    backgroundColor: "#151f3000"}} dangerouslySetInnerHTML={{ __html: this.state.playlistArray.playlist_description }}></p>
                                        </div>
                                    
                                       
                                    </div>
                                </div>  

                                <Review props={this.props} review={this.state.reviewArray} playlistID={this.state.playlist_id}/>
                            </div>
                        </div>
                    </section>
                    {
                        this.state.related_playlist.length>0?
                        <section className="section">
                            
                            <div className="col-12 col-xl-12 relatedPadding">
                            <Related data={this.state.related_playlist}/>
                            </div>
                        
                        </section>
                        :null
                    }
                  
                </LoadingMask>
                <ReactSnackBar Icon={<span><img src='/img/icon.png' style={{width:"30px"}}/></span>} Show={this.state.Show}>
                    {this.state.sanckbarMessage}
                </ReactSnackBar>
            </div>

        )
    }
}
