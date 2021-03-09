import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {get,post,authpost} from '../../utils/service'
import queryString from 'query-string';
import { BsCheckCircle,BsChevronRight } from "react-icons/bs";
import { Modal } from 'react-responsive-modal';
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import './style.css'
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class errorPage extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            redirectURL:urlCrypt.decryptObj(params.redirectURL),
            playlistID:urlCrypt.decryptObj(params.playList),
            point:0,
            playListArray:[],
            walletArray:[],
            open:false,
            currentPoint:0,
            spin:false,
            errMsg:''
        }
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
    componentDidMount(){
        get('/video/playlist/'+this.state.playlistID)
        .then(res=>{
            this.setState({
                playListArray:res.data,
                point:res.data.point
            })
            
        })
        .catch(err=>{

        })
    }
    handleClick = () =>{
        console.log(this.state.point)
        authpost('/features/walletDetails/')
        .then(res=>{
            console.log(res.data.point)
            this.setState({
                currentPoint:res.data.point,
                open:true
            })
        })
        .catch(err=>{

        })
        
    }
    handlePayment = () =>{
        console.log(1)
        this.setState({
            spin:true,
        })
        const data={
            playlist_id:this.state.playlistID,
            point:this.state.point
        }
        authpost('/video/purchaseUser/',data)
        .then(res=>{
            console.log(res)
            if(res.status==200){
                if(res.data.status==1){
                    this.setState({
                     //   spin:false,
                        errMsg:''
                    })
                   setTimeout(() =>  this.props.history.push(this.state.redirectURL),2000)
                }else{
                    this.setState({
                        errMsg:res.data.msg,
                        spin:false,
                    })
                }
            }else{
                this.setState({
                    errMsg:'Somethings Wrong! Please try again later.',
                    spin:false,
                })
            }
           
        })
        .catch(err=>{

        })
    }
    render() {
        return (
            <div className="abcdsfsf">
                <LoadingMask loading={this.state.spin} text={"loading..."}>
                    <div className="purchaseDiv">
                        <div className="">
                            <div style={{width:"100%",marginBottom: "10px"}}> <center> <span className="PlaylistPurchase">Purchase to Watch</span></center></div>
                            <center><img src={this.state.playListArray.playlist_banner} className="playlistBannerImage"/></center>
                            
                            <div style={{width:"100%",marginTop: "10px"}}> <center> <span className="PlaylistName">{this.state.playListArray.playlist_name}</span></center></div>
                        
                        <center>
                        <br/>
                            <div className="PlaylistDivPoint">
                                <div style={{float: "left",padding: "15px",width:"100%"}}>
                                    <span className="vesPlus">VES Plus</span><BsCheckCircle className="iconStyle"/><br/>

                                    <span style={{float: "left"}}><span className="pointText">{this.state.playListArray.point}</span><span className="pointLife"> Points for Lifetime</span></span>
                                </div>
                            </div>
                            </center> 
                            
                                
                            
                        </div>
                        <div>
                        <center>
                            <br/>
                        <span className="catalog__more continueBtn" onClick={this.handleClick} style={{margin:0,cursor:"pointer"}}>Continue with VES Plus &nbsp;<BsChevronRight /></span><br/>
                        <span><Link to="/">Not now</Link></span>
                        </center>
                        <br/>
                        </div>
                        
                        <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="modalPurchase">
                            <h3 style={{color:"white"}}>Purchase</h3>
                            <hr/>
                            <div className="row logoDiv">
                                <div style={{width:"20%"}} >
                                    <img className="logoModal" src="img/logo.png"/><br/>
                                    <center><span className="vesPlus vesPlusPadding">Plus</span></center>
                                </div>
                                <div style={{width:"75%",paddingTop: "12px"}}>
                                    <div className=" " style={{float:"right"}}>
                                        <span style={{float:"right"}}  className="modalPoint">{this.state.point}<span className="modalPointP"> Point</span></span>
                                        <br/>
                                        <span style={{float:"right"}} className="mainModaDes">One time Purchase. Valid for lifetime </span>
                                    </div>
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="walletClass"> 
                                Wallet Balance <span  style={{float:"right"}}>{this.state.currentPoint} points</span>
                            </div>

                            <div className="walletClass"> 
                            {
                                this.state.currentPoint==0?
                                <Link to="/profile#tab-3" className="catalog__more newBtn" style={{margin:0,cursor:"pointer"}}>Recharge Now</Link>
                                :
                                <button onClick={this.handlePayment} className="catalog__more newBtn" style={{margin:0,cursor:"pointer"}} disabled={this.state.spin}>{this.state.spin ? <>Loading....</>:<>Pay Now</>}</button>
                            }
                            {
                                String(this.state.errMsg).length>5?
                                    <><br/><center style={{color:"red"}}><b>{this.state.errMsg}</b></center></>
                                :null
                            }
                            
                                
                            </div>


                    
                        </div>
                    
                        </Modal>
                        
                    </div>
            </LoadingMask>
           </div>
        )
    }
}
