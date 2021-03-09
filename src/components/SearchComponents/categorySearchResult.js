import React, { Component } from 'react'
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {post} from '../../utils/service'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import queryString from 'query-string';
import Avatar from 'react-avatar';
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class channelSearchResult extends Component {
    constructor(props) {
        super(props)
        let url = props.location.search;
        let params = queryString.parse(url);
        this.state = {
            category_name:urlCrypt.decryptObj(params.MhT),
            DataArray:[] ,
            userArray:[],
            skeletonStatus:true
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        document.title=this.state.category_name+' Playlist Details - VESDOC'
        const data={
            category_name:this.state.category_name
        }
        post('/video/ShowCategoryPlaylist/',data)
        .then(res=>{
        	// console.log(res)
            if(res.status==200){
                this.setState({
                    DataArray:res.data,
                })
                setTimeout(()=>{  this.setState({'skeletonStatus':false }) }, 2000);
               
            }
        })
        .catch(err=>{
    
        })
    }
    render() {
        return (
            <div className="catalog catalog--page">
            <div className="container">
                <div className="row WatchTopDiv">
                    <div className="col-12">
                        <div className="titleDiv">
                        <div className="row" style={{paddingLeft    :"15px"}}>
                        <span className="WatchTExt">{this.state.category_name}</span>

                        </div>
                        </div>
                       
                        <div className="row row--grid">

                            {
                            this.state.skeletonStatus==false?
                                this.state.DataArray.map((obj,i)=>
                                   
                                        <div className="col-6 col-sm-4 col-lg-3 col-xl-3" key={i}>
                                            <div className="card">
                                                <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))}  className="card__cover">
                                                    {
                                                        obj.point>0?
                                                        <i className="plusIcon">P</i>
                                                        :null
                                                    }
                                                    <img src={obj.img} alt="" />
                                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"22px"}}>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </svg>
                                                </Link>                                         
                                                <h3 className="card__title WaTCH"><Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))}  style={{marginBottom: 0}}>{obj.name}</Link></h3>
                                                <ul className="card__list">
                                                    <li>{obj.playlist_language} • {obj.playlist_type} • {obj.totEp} Episodes </li>
                                                    
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    
                                    
                                )
                           
                           :
                           


                            <div className="row " style={{margin: 0}}>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                        
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4" />
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4" />
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4" />
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel4"/>
                                        <h3 className="series__title lIneHight"><Skeleton className="divSelText1" /><br/><Skeleton className="divSelText2" /></h3>
                                    </div>
                                </div>
                          
                              
                                
                                
                            </div>
                           
                      
                           
                        }
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
