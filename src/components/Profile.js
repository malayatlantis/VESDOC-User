import React, { Component } from 'react'
import {checkAuth} from '../utils/auth'
import {authget, authpost} from '../utils/service'
import ToastService from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import Moment from 'moment-js';
import { Link } from 'react-router-dom';

import './profile.css'
const  uniqid = require("uniqid");
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');

const toast = ToastService.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Profile extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        window.scrollTo(0,0)
        this.state = {
            name:'',
            email:'',
            phone:'',
            applyCodeBox:0,
            point:'',
            couponCode:'',
            pointErr:'',
            couponErr:'',
            is_loading:false,
            discount_balance:0,
            color:'',
            paymenterror:'',
            whist_list:[],
            wallet_list:[],
            latest_review_playlist:[],
            report_count:0,
            review_count:0,
            watch_count:0,
            purchaseArr:[],
            reviewArray:[],
            reportArray:[]
        }
    }
    componentDidMount(){
        this.props.fetchWallet()
       
        authpost("/auth/viewProfile/")
        .then((response) => {
         this.setState({
             name:response.data.name,
             email:response.data.email,
             phone:response.data.phone
         })
 
        })
        .catch(function (error) {
            console.log(error);
          
        });

        authget('/features/userdashboardlist/')
        .then(response=>{
        //    console.log(response)
            this.setState({
                report_count:response.data.report_count,
                review_count:response.data.review_count,
                watch_count:response.data.watch_count,
                latest_review_playlist:response.data.latest_review_playlist,
                purchaseArr:response.data.purchaseArray,
                reviewArray:response.data.reviewArray,
                reportArray:response.data.reportArray
            })
        })
        .catch(error=>{
            console.log(error)
        })

       this.getWallet()
     
    }
    getWallet=()=>{
        authpost('/features/walletDetails/').then(response => {
          
            this.setState({
                wallet_list:response.data.transactions
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
    handleChange = e =>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});    
    }
    profileSubmit = e =>{
        e.preventDefault();

        const data ={
            name:this.state.name,
            email:this.state.email
        }
        const a = this.props.profileUpdateHandler(data)
        this.setState({
            name:this.props.data.name,
            email:this.props.data.email,
        })
    }
    signout= e=>{
        e.preventDefault();
         const data = { 
             user_id:localStorage.getItem('docubayUserID'),
             logged_id:localStorage.getItem('docubayUserLoggedID')  
             
         }
         authpost('/auth/logout/', data)
         .then((data) => {
          if(data.data.sms=='Log Out Successfull'){
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
           this.props.history.push('/login')
          }
         }).catch(function (error) {
         
             console.log(error);
         });  
         
    }
    applyChange = e =>{
       
        if( e.target.checked == true){
            this.setState({
                applyCodeBox:1,
                couponCode:'',
                paymenterror:'',
                pointErr:'',
                couponErr:'',
                color:'',
            })
        }else{
            this.setState({
                applyCodeBox:0,
                couponCode:'', 
                paymenterror:'',
                pointErr:'',
                couponErr:'',
                color:'',
            })
        }
    }
    paymentCancel = () =>{
        toast.warning("You cancel the payment.", {
            type: "warning",
            duration: 10000,
        });
        this.setState({
            is_loading: false
        });
    }
    handleSubmit=e=>{
        e.preventDefault();
        if(this.state.point.trim().length == 0 ){
            
            this.setState({
                pointErr:'Please Enter Point',
                is_loading:false
            })
            return true
        } 
        if(this.state.point.trim().length < 3 ){
            
            this.setState({
                pointErr:'Minimum Recharge Rs. 100 Rupees',
                is_loading:false
            })
            return true
        } 
        if(this.state.applyCodeBox == 1){
           
            if(this.state.couponCode.trim().length == 0 ){
                this.setState({
                    couponErr:'Please Enter a Valid Coupon Code',
                    color:'red',
                    is_loading:false
                })
                return true
            } 
        }

        this.setState({
            paymenterror:'',
            pointErr:'',
            couponErr:'',
            color:'',
            is_loading:true
        })

        let coupon_code = this.state.couponCode
        if(coupon_code == ''){
            coupon_code='NAN'
        }
        const data ={
            'coupon_code':coupon_code,
            'amt_val':this.state.point,
            'order_id':uniqid()
        }
        authpost('/features/paymentCapture/',data)
            .then((response) => {  
                console.log(response.status)
                if(response.data.msg == 'Recharge Successful'){
                    let options = {
                        "key": 'rzp_test_s8waJxmKNm05sl',
                        "amount": this.state.point*100, // 2000 paise = INR 20, amount in paisa
                        "name": "VESDOC",
                        "description": "Watch Web Series, Movies, Documentary Online",
                        "image": "logo.png",
                        "handler":  (response)=>{
                                const fdata={
                                    'point':this.state.point,
                                    'coupon_code':coupon_code,
                                    'transactionID':response.razorpay_payment_id
                                }
                                this.walletRecharge(fdata);
                        
                        },
                        "prefill": {
                        "name": this.state.name,
                        "email": this.state.email,
                        "contact":this.state.phone
                        },
                        "notes": {
                        "address": this.state.useraddress
                        },
                        "theme": {
                        "color": "#476037"
                        },
                        modal: {
                            ondismiss: ()=> {
                                this.paymentCancel()
                                //alert();
                            },
                        },
                    };
                    
                    let rzp = new window.Razorpay(options);;
                    rzp.open();   
                }
                if(response.data.msg == 'Coupon Not Find'){
                    this.setState({
                        pointErr:'',
                        couponErr:'',
                        color:'red',
                        paymenterror:'Invalid Coupon',
                        discount_balance:0,
                        is_loading:false
                    })
                    this.props.fetchWallet()
                }
                if(response.data.discount){
                    let options = {
                        "key": 'rzp_test_s8waJxmKNm05sl',
                        "amount": this.state.point*100, // 2000 paise = INR 20, amount in paisa
                        "name": "VESDOC",
                        "description": "Watch Web Series, Movies, Documentary Online",
                        "image": "logo.png",
                        "handler":  (response)=>{
                                const fdata={
                                    'point':this.state.point,
                                    'coupon_code':coupon_code,
                                    'transactionID':response.razorpay_payment_id
                                }
                                this.walletRecharge(fdata);
                        
                        },
                        "prefill": {
                        "name": this.state.name,
                        "email": this.state.email,
                        "contact":this.state.phone
                        },
                        "notes": {
                        "address": this.state.useraddress
                        },
                        "theme": {
                        "color": "#151f30"
                        },
                        modal: {
                            ondismiss: ()=> {
                                this.paymentCancel()
                                //alert();
                            },
                        },
                    };
                    
                    let rzp = new window.Razorpay(options);;
                    rzp.open();   
                }
                if(response.data.minimum_recharge){
                    this.setState({
                        pointErr:'',
                        couponErr:'',
                        paymenterror:'Minimum Recharge Rs. '+response.data.minimum_recharge+' Rupees',
                        color:'yellow',
                        is_loading:false,
                        discount_balance:0
                    })
                    this.props.fetchWallet()
                }
                if(response.status !== 200){
                    this.setState({
                        is_loading: false
                    });
                    toast.error('Somethings Wrong! Please try again later');
                }
                
              
        }).catch((error)=>{
            console.log(error);
        }) 
        
    
        
    }
    walletRecharge=(data)=>{
        authpost('/features/walletRecharge/',data)
        .then(response=>{
            if(response.data.msg == 'Recharge Successful'){
                this.setState({
                    pointErr:'',
                    couponErr:'',
                    point:'',
                    color:'green',
                    paymenterror:'Wallet Recharge Successful',
                    discount_balance:0,
                    is_loading:false
                })
                this.getWallet()
                this.props.fetchWallet()
            }
            if(response.data.msg == 'Coupon Not Find'){
                this.setState({
                    pointErr:'',
                    couponErr:'',
                    color:'red',
                    paymenterror:'Invalid Coupon',
                    discount_balance:0,
                    is_loading:false
                })
                this.getWallet()
                this.props.fetchWallet()
            }
            if(response.data.discount){
                this.setState({
                    point:'',
                    pointErr:'',
                    couponErr:'',
                    color:'green',
                    paymenterror:'Wallet Recharge Successful',
                    is_loading:false,
                    discount:response.data.discount
                })
                this.getWallet()
                this.props.fetchWallet()
            }
            if(response.data.minimum_recharge){
                this.setState({
                    pointErr:'',
                    couponErr:'',
                    paymenterror:'Minimum Recharge Rs. '+response.data.minimum_recharge+' Rupees',
                    color:'yellow',
                    is_loading:false,
                    discount_balance:0
                })
                this.getWallet()
                this.props.fetchWallet()
            }

            // console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    removePointErr =()=>{
        this.setState({
            pointErr:'',
            color:'',
            paymenterror:'',
        })
    }
    removeCouponErr=()=>{
        this.setState({
            couponErr:'',
            color:'',
            paymenterror:''
        })
    }

    applyCoupon=e=>{
        e.preventDefault();
        if(this.state.couponCode.trim().length == 0 ){
            this.setState({
                couponErr:'Please Enter a Valid Coupon Code',
                color:'red'
            })
            return true
        } 
        const data = {
            'coupon_code':this.state.couponCode
        }
        authpost('/features/couponCheck/',data)
        .then(response=>{
            if(response.data.msg == 'Coupon Not Find'){
                this.setState({
                    couponErr:'Invalid Coupon',
                    color:'red'
                })
            }else{
                if(this.state.point >= response.data.minimumRecharge){
                    this.setState({
                        discount_balance:response.data.point,
                        couponErr:'You have discount Rs. '+response.data.point+' Rupees',
                        color:'green'
                    })
                }else{
                    this.setState({
                        couponErr:'Minimum Recharge Rs. '+response.data.minimumRecharge+' Rupees',
                        color:'yellow'
                    })
                }
               
            }
            
        })
        .catch(error=>{
            console.log(error)
        })
    }
 
    render() {
        // console.log(this.props.data.name)
        return (
            <div className="catalog catalog--page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="profile">
                                <div className="profile__user">
                                    <div className="profile__avatar">
                                        <img src="img/avatar.svg" alt="" />
                                    </div>
                                    <div className="profile__meta">
                                        <h3>{this.props.data.name}</h3>
                                        
                                        
                                        <span>Phone No: {localStorage.getItem('docubayUserPhone')}</span>
                                    </div>
                                </div>

                                <ul className="nav nav-tabs profile__tabs" id="profile__tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="false">Profile</a>
                                    </li>

                                   

                                    <li className="nav-item">
                                        <a className="nav-link " data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="true">Wallet History</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="true">Settings</a>
                                    </li>
                                </ul>

                                <button className="profile__logout" type="button" onClick={this.signout}>
                                    <span>Sign out</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane fade active show" id="tab-1" role="tabpanel">
                            <div className="row row--grid">
                            
                                <div className="col-12 col-sm-6 col-xl-3">
                                    <div className="stats">
                                        <span>Wallet Amount</span>
                                        {
                                            this.props.wdata.length !== 0 ?
                                            <p>{this.props.wdata.point}</p>
                                            :null
                                        }
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M9,10a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V11A1,1,0,0,0,9,10Zm12,1a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1H3A1,1,0,0,0,2,6v4a1,1,0,0,0,1,1,1,1,0,0,1,0,2,1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1,1,1,0,0,1,0-2ZM20,9.18a3,3,0,0,0,0,5.64V17H10a1,1,0,0,0-2,0H4V14.82A3,3,0,0,0,4,9.18V7H8a1,1,0,0,0,2,0H20Z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-xl-3">
                                    <div className="stats">
                                        <span>Films watched</span>
                                        <p>{this.state.watch_count}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M21,2a1,1,0,0,0-1,1V5H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V5H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V19H6v2a1,1,0,0,0,2,0V20h8v1a1,1,0,0,0,2,0V19h2v2a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM6,17H4V15H6Zm0-4H4V11H6ZM6,9H4V7H6Zm10,9H8V13h8Zm0-7H8V6h8Zm4,6H18V15h2Zm0-4H18V11h2Zm0-4H18V7h2Z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-xl-3">
                                    <div className="stats">
                                        <span>Your reports</span>
                                        <p>{this.state.report_count}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-xl-3">
                                    <div className="stats">
                                        <span>Your reviews</span>
                                        <p>{this.state.review_count}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="col-12 col-xl-4">
                                    <div className="dashbox">
                                        <div className="dashbox__title">
                                            <h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21,2a1,1,0,0,0-1,1V5H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V5H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V19H6v2a1,1,0,0,0,2,0V20h8v1a1,1,0,0,0,2,0V19h2v2a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM6,17H4V15H6Zm0-4H4V11H6ZM6,9H4V7H6Zm10,9H8V13h8Zm0-7H8V6h8Zm4,6H18V15h2Zm0-4H18V11h2Zm0-4H18V7h2Z"
                                                    ></path>
                                                </svg>
                                                Purchase Playlist
                                            </h3>

                                            
                                        </div>

                                        <div className="dashbox__table-wrap dashbox__table-wrap--1" data-scrollbar="true" tabIndex="-1" style={{overflow: "hidden", outline: "none"}}>
                                            <div className="scroll-content">
                                                    {
                                                        this.state.purchaseArr.length !==0 ?
                                                            this.state.purchaseArr.map((obj,i)=>
                                                                <div style={{padding:"5px", borderBottom:"solid 1px #182943"}}>
                                                                    <div style={{padding:0,lineHeight:"20px",whiteSpace: "break-spaces"}} className="main__table-text">
                                                                        <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))}>
                                                                            <span style={{fontSize:"20px"}}>{obj.name}</span><br/>
                                                                            <span style={{fontSize:"14px",color:"#b7b9bb"}}><span>{obj.playlist_type}</span> • <span>{obj.language}</span> • <span>{obj.totalEpisode} Episodes</span> </span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )
                                                       
                                                        :
                                                        <center  style={{color:"white"}}>No record found</center>
                                                    }
                                                   
                                            </div>
                                            <div className="scrollbar-track scrollbar-track-x show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-x" style={{width: "635px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                            <div className="scrollbar-track scrollbar-track-y show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-y" style={{height: "268px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-xl-4">
                                    <div className="dashbox">
                                        <div className="dashbox__title">
                                            <h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
                                                    ></path>
                                                </svg>
                                                Your Reviews
                                            </h3>

                                           
                                        </div>

                                        <div className="dashbox__table-wrap dashbox__table-wrap--2" data-scrollbar="true" tabIndex="-1" style={{overflow: "hidden", outline: "none"}}>
                                            <div className="scroll-content">
                                                    {
                                                        this.state.reviewArray.length !==0 ?
                                                            this.state.reviewArray.map((obj,i)=>
                                                                <div style={{padding:"5px", borderBottom:"solid 1px #182943"}}>
                                                                    <div style={{padding:0,lineHeight:"20px",whiteSpace: "break-spaces"}} className="main__table-text">
                                                                        <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))} style={{width: "-webkit-fill-available"}}>
                                                                            <span style={{fontSize:"20px"}}>{obj.title}<span style={{float:"right"}}> 
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                                <path
                                                                                    d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
                                                                                ></path>
                                                                            </svg>
                                                                            <span style={{fontSize:"15px",color:"white"}}>{obj.ratting}</span></span></span><br/>
                                                                            <span style={{fontSize:"14px",color:"#b7b9bb"}}><span>{obj.name}</span> • <span>{Moment(obj.date).format()}</span></span>
                                                                            <br/><p style={{color:"#dee1e9",paddingTop:"7px"}}>{obj.message}</p>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )
                                                       
                                                        :
                                                        <center  style={{color:"white"}}>No Review found</center>
                                                    }
                                            
                                            </div>
                                            <div className="scrollbar-track scrollbar-track-x show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-x" style={{width: "635px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                            <div className="scrollbar-track scrollbar-track-y show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-y" style={{height: "268px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4">
                                    <div className="dashbox">
                                        <div className="dashbox__title">
                                            <h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
                                                    ></path>
                                                </svg>
                                                Your Reports
                                            </h3>

                                           
                                        </div>

                                        <div className="dashbox__table-wrap dashbox__table-wrap--2" data-scrollbar="true" tabIndex="-1" style={{overflow: "hidden", outline: "none"}}>
                                            <div className="scroll-content">
                                            {
                                                        this.state.reportArray.length !==0 ?
                                                            this.state.reportArray.map((obj,i)=>
                                                                <div style={{padding:"5px", borderBottom:"solid 1px #182943"}}>
                                                                    <div style={{padding:0,lineHeight:"20px",whiteSpace: "break-spaces"}} className="main__table-text">
                                                                        <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))} style={{width: "-webkit-fill-available"}}>
                                                                            <span style={{fontSize:"20px"}}>{obj.episodeName}<span style={{float:"right"}}> 
                                                                       
                                                                            </span>
                                                                            </span><br/>
                                                                            <span style={{fontSize:"14px",color:"#b7b9bb"}}><span>{obj.name}</span> • <span>{Moment(obj.date).format()}</span></span>
                                                                            <br/><p style={{color:"#dee1e9",paddingTop:"7px"}}>{obj.message}</p>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )
                                                       
                                                        :
                                                        <center style={{color:"white"}}>No Report found</center>
                                                    }
                                            </div>
                                            <div className="scrollbar-track scrollbar-track-x show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-x" style={{width: "635px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                            <div className="scrollbar-track scrollbar-track-y show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-y" style={{height: "268px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="tab-pane fade" id="tab-3" role="tabpanel">
                            <div className="row row--grid">

                            <div className="dashbox__table-wrap dashbox__table-wrap--1" data-scrollbar="true" tabIndex="-1" style={{overflow: "hidden", outline: "none"}}>
                                <div className="scroll-content">
                                {
                                        this.state.wallet_list.length==0?
                                            <><center>Not Transaction Found</center></>
                                        :
                                        <table style={{width:"100%"}} cellPadding="10px">
                                            <tbody>
                                            {
                                                this.state.wallet_list.map((obj,i)=>
                                                    <tr style={{borderBottom:"1px solid rgba(0,0,0,.1)", marginTop:"5px",marginBottom:"5px"}} key={i}>
                                                        <td>
                                                            <span style={{fontSize:"15px",color:"#82ae64",fontWeight:"700"}}>{obj.remarks}</span><br/>
                                                            {
                                                                obj.transID.length>2?
                                                                <><span style={{fontSize:"12px",color:"#ffff",fontWeight:"600"}}>Transaction ID : {obj.transID}</span><br/></>
                                                                :obj.couponCode.length>2?
                                                                <><span style={{fontSize:"12px",color:"#ffff",fontWeight:"600"}}>Coupon Code : {obj.couponCode}</span><br/></>
                                                                :null
                                                            }
                                                            <span style={{fontSize:"12px",color:"#ffff",fontWeight:"600"}}>{Moment(obj.date).format('f')}</span>
                                                            
                                                            
                                                        </td>
                                                        <td style={{textAlign: "end"}}>
                                                            <span style={{fontSize:"20px",textAlign:"right"}}>
                                                                {
                                                                obj.transType==1?
                                                                    <span style={{color:"green",fontWeight:"700"}}>+{obj.transPoint}</span>
                                                                :
                                                                    <span style={{color:"red",fontWeight:"700"}}>-{obj.transPoint}</span>
                                                                }
                                                                  </span><br/>
                                                                <span style={{fontSize:"12px",color:"#ffff",fontWeight:"600",textAlign:"right"}}>Closing Point : {obj.afterTransPoint}</span>
                                                                
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    }
                                
                                </div>
                                <div className="scrollbar-track scrollbar-track-x show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-x" style={{width: "635px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                                <div className="scrollbar-track scrollbar-track-y show" style={{display: "none"}}><div className="scrollbar-thumb scrollbar-thumb-y" style={{height: "268px", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                            </div>
                                    
                            </div>
                        </div>
                        <div className="tab-pane fade " id="tab-4" role="tabpanel">
                            <div className="row">
                                <div className="col-12">
                                    <div className="sign__wrap">
                                        <div className="row">
                                        
                                            <div className="col-12 col-lg-6">
                                                <form action="#" className="sign__form sign__form--profile sign__form--first">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="sign__title">Profile details</h4>
                                                        </div>
                                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                            <div className="sign__group">
                                                                <label className="sign__label" htmlFor="name">Name</label>
                                                                <input id="name" type="text" name="name" className="sign__input" onChange={this.handleChange} defaultValue={this.state.name} />
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                            <div className="sign__group">
                                                                <label className="sign__label" htmlFor="phone">Phone</label>
                                                                <input id="phone" type="text" name="phone" readOnly className="sign__input"  value={this.state.phone} />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                            <div className="sign__group">
                                                                <label className="sign__label" htmlFor="email">Email</label>
                                                                <input id="email" type="text" name="email" className="sign__input" onChange={this.handleChange} defaultValue={this.state.email}/>
                                                            </div>
                                                        </div>

                                                       

                                                        <div className="col-12">
                                                            <button className="sign__btn" onClick={this.profileSubmit} type="button">Update</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <form action="#" className="sign__form sign__form--profile">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="sign__title">Wallet  Recharge</h4>
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                            <div className="sign__group">
                                                                <label className="sign__label" htmlFor="point">Enter Amount</label>
                                                                <input id="point" type="number" name="point" onKeyUp={this.removePointErr} onChange={this.handleChange} value={this.state.point} className="sign__input" />
                                                                <span style={{color:'red'}}>{this.state.pointErr}</span>
                                                            </div>
                                                        </div>

                                                        { this.state.applyCodeBox == 1 ?
                                                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                                <div className="sign__group">
                                                                    <label className="sign__label" htmlFor="couponCode">Enter Coupon Code</label>
                                                                    <input id="couponCode" type="text" name="couponCode" onKeyUp={this.removeCouponErr} onChange={this.handleChange} onBlur={this.applyCoupon} value={this.state.couponCode} className="sign__input" />
                                                                    <span style={{color:this.state.color}}>{this.state.couponErr}</span>
                                                                </div>
                                                            </div>
                                                         :null}
                                                        
                                                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                            <div className="sign__group">
                                                                <input type="checkbox" id="apply" className="chkbox" onChange={this.applyChange}  name="apply"  />
                                                                <label className="sign__label" htmlFor="apply">Apply Coupon Code</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                            <div className="sign__group">
                                                                <span style={{color:this.state.color}}>{this.state.paymenterror}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <button className="sign__btn" onClick={this.handleSubmit} disabled={this.state.is_loading} type="button">{this.state.is_loading == true ? 'Loading .......': 'Recharge'}</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

