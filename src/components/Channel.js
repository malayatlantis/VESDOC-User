import React,{useState,useEffect} from 'react'
import {post} from '../utils/service'
import ToastService from 'react-material-toast';
import {Link} from 'react-router-dom'

var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
const { htmlToText } = require('html-to-text');
const toast = ToastService.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default function Channel(props) {
    // const [channellist,setChannellist] = useState([])
    // useEffect(() => {
    //     const data={
    //         'user_id':4
    //     }
    //     post('/video/showChanelDetails/')
    //     .then(response=>{
    //         setChannellist(response.data)
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })
       
    //   },[]);
   
    return (
        <div className="catalog catalog--page">
            <div className="container">
                <div className="row WatchTopDiv">
                    <div className="col-12">
                        <div className="titleDiv">
                            <span className="WatchTExt">Watch History</span>
                        </div>
                       
                        <div class="row row--grid">
                            {/* {
                            watchlist.map((obj,i)=>
                                <div class="col-6 col-sm-4 col-lg-3 col-xl-3">
                                    <div class="card">
                                        <Link to={"/player?tra=false&IDPlAyLI="+urlCrypt.cryptObj(String(obj.playlist_id))+"&IDEpiSo="+urlCrypt.cryptObj(String(obj.episode_id))} class="card__cover">
                                            <img src={obj.thumbnail} alt="" />
                                            <svg width="22" height="22" viewbox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"22px"}}>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </Link>                                         
                                        <h3 class="card__title WaTCH"><Link to={"/player?tra=false&IDPlAyLI="+urlCrypt.cryptObj(String(obj.playlist_id))+"&IDEpiSo="+urlCrypt.cryptObj(String(obj.episode_id))} style={{marginBottom: 0}}>{obj.episode_name}</Link></h3>
                                        <ul class="card__list">
                                            <li>{obj.playlist_name} • Ep : {obj.episode_number} </li>
                                            
                                            
                                        </ul>
                                    </div>
                                </div>
                            )
                        } */}
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}
