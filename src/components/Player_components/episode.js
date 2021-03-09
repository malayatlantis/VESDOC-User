import React, {useState,useEffect} from 'react'
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {get} from '../../utils/service'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import queryString from 'query-string';
import './skeleton.css'
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block" ,position: "absolute",right: "23px",backgroundColor:"#ffffff40",height:"auto",width:"auto",padding:"10px"}}
        onClick={onClick}
      >
            <GrNext style={{fontSize:"20px",color:"white"}}/>
    </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick} style={{ display: "block",position: "absolute",left: "23px",zIndex: "10", backgroundColor:"#ffffff40",height:"auto",width:"auto",padding:"10px"}}>
            <GrPrevious style={{fontSize:"20px",color:"white"}}/>
      </div>
    );
  }
export default function Episode(props) {
    let url = props.location.search;
    let params = queryString.parse(url);
    // let abn =urlCrypt.decryptObj(params.IDPlAyLI);
    // console.log(abn)
    let id;

    try {
        id=urlCrypt.decryptObj(params.IDPlAyLI);
      } catch(e) {
        id=0;
      }

    const [playlistID,setPlaylistID] = useState(id);
    const [episodeArray,setEpisode] = useState([]);
    const [episodeSkeleton,setEpisodeStatus] = useState(true);
    useEffect(() => {
        
        get('/video/ShowEpisodeListUserAPI/'+playlistID)
        .then((data) => {
          //  console.log(data)
            if(data.status==200){
                setEpisode(data.data.episode)
                setTimeout(function(){ setEpisodeStatus(false) }, 2000);
            }else{
                setTimeout(function(){ setEpisodeStatus(false) }, 2000);
            }
           

        }).catch(function (error) {
           
            console.log(error);
        }); 
      },[]);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
      };
    return (
        <div className="col-12 marginBottom" style={{marginBottom:"3%",padding:0}}>
            <div className="series-wrap">
                <h3 className="series-wrap__title">
                    
                    Episodes
                </h3>
                <div className="section__carousel-wrap">
                {
                    episodeSkeleton==false?
                        episodeArray.length!=0?
                        <Slider {...settings}>
                            {
                                    episodeArray.map((obj,i)=>
                                        <div className="BestShowSlideItem" style={{padding:"0 5px"}} key={i}>
                                            <div className="series seriesItem">
                                                <Link to={"/player?tra=false&IDPlAyLI="+urlCrypt.cryptObj(String(playlistID))+"&IDEpiSo="+urlCrypt.cryptObj(String(obj.episode_id))} className="series__cover">
                                                {
                                                    obj.point>0?
                                                    <i className="plusIcon">P</i>
                                                    :null
                                                }
                                                    <img src={obj.thumbnail} alt="" />
                                                    <span>
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></path>
                                                        </svg>
                                                        {obj.video_length}
                                                    </span>
                                                </Link>
                                                <h3 className="series__title"><Link to={"/player?tra=false&IDPlAyLI="+urlCrypt.cryptObj(String(playlistID))+"&IDEpiSo="+urlCrypt.cryptObj(String(obj.episode_id))}>Episode {obj.episode_number}</Link></h3>
                                            </div>
                                        </div>
                                    )
                            }
                        </Slider>
                        :   <center className="notAva"><br/><span className="commClassTitle">Episode currently unavailable.</span> <br/><span className="commClass">Coming Soon...</span></center>
                    :
                        <>
                            <div className="row mobileHideNew">
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel" />
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"9vw"} /></h3>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row mobileHideDesktop">
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel" />
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                               
                               
                                
                            </div>
                          
                          
                            <div className="row desktopHideNew" style={{margin:"0px 0px"}} >
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton  style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"34vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton  style={{ borderRadius:"15px"}} className="divSel"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"34vw"} /></h3>
                                    </div>
                                </div>
                            </div>
                      
                      
                      
                      
                        </>
                    }
                </div>
            </div>
        </div>

    )
}
