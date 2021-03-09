import React, {Component} from 'react'
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import {get} from '../../utils/service'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import queryString from 'query-string';
const { htmlToText } = require('html-to-text');
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class banner extends Component {
    constructor(props) {
       // console.log(props)
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            banner:'',
            bannerSkeleton:true,
            id:urlCrypt.decryptObj(params.IDPlAyLI),
        }

    }
    componentDidMount() {
        get('/video/getBanner/'+this.state.id)
        .then((data) => {
        //    console.log(data)
            if(data.status==200){
                 this.setState({
                    banner:data.data,
                })
                setTimeout(()=>{  this.setState({bannerSkeleton:false })}, 2000);
            }
           
        }).catch(function (error) {
            console.log(error);
        }); 
    }
    render() {
        return (
            <>
              {
                this.state.bannerSkeleton==false?
                <div className="bannerDiv row col-md-12 ">
                    
                <div className="col-md-5 colPa desRedius mobileHide">
                    <span>
                        <span className="titleSpanDesktop">{this.state.banner.name}</span><br/>
                        <span className="desSpan deskDes">{this.state.banner.totEp} Episodes • {this.state.banner.playlist_language} • {this.state.banner.playlist_type}</span>
                        <p className="deskShortDes">
                        {
                            htmlToText(this.state.banner.playlist_description).slice(0, 160)
                        }
                        </p>
                        <div className="row fullWatch" style={{cursor:"pointer"}}> 
                            <Link to={"/player?tra=true&IDPlAyLI="+urlCrypt.cryptObj(String(this.state.banner.id))+"&IDEpiSo="+urlCrypt.cryptObj(String(0))} className="row">
                                <div className="playBtn" >
                                    <FaPlay />
                                </div>
                                <div className="watchDiv">
                                    <span className="watch">
                                        Watch Trailer
                                    </span><br/>
                                    <span className="watchDes">
                                    {this.state.banner.name}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </span>
                </div>
                <div className="col-md-7 colPa bannerDivImage baImage">
                    <Link to={"/player?tra=true&IDPlAyLI="+urlCrypt.cryptObj(String(this.state.banner.id))+"&IDEpiSo="+urlCrypt.cryptObj(String(0))} >
                        <img className="" style={{width:"100%",height:"100%"}} src={this.state.banner.img} alt="" />
                    </Link>
                    <div className="linerGradient row mobileHide">

                    </div>
                    <div className="desDiv row desktopHide">
                    <Link to={"/player?tra=true&IDPlAyLI="+urlCrypt.cryptObj(String(this.state.banner.id))+"&IDEpiSo="+urlCrypt.cryptObj(String(0))} >
                        <span style={{cursor:"pointer"}}>
                            <span className="titleSpan">Watch Trailer</span><br/>
                            <span className="desSpan"> {this.state.banner.name}</span>
                        </span>
                    </Link>
                    </div>
                </div>
            </div>
             :
             <div className="bannerDiv row col-md-12 ">
                 <div className="colPa bannerDivImage baImage1" style={{borderRadius:"15px"}}>
                     <Skeleton height={"100%"} />
                 </div> 
             </div>
     }
           
           </>
        )
    }
}
