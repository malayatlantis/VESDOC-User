import React, {useState,useEffect} from 'react'
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import {get} from '../../utils/service'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './banner.css'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
const { htmlToText } = require('html-to-text');
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
export default function Banner() {
    const [banner,setBanner] = useState([]);
    const [bannerSkeleton,setBannerStatus] = useState(true);
    useEffect(() => {
        get('/video/getBanner/')
        .then((data) => {
            setBanner(data.data)
            
            setTimeout(function(){ setBannerStatus(false) }, 2000);

        }).catch(function (error) {
           
            console.log(error);
        }); 
      },[]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
        // centerMode: true,
      };
    return (
        <div className="display_main_banner">
            <div className="home home--static display_banner">
            {
                bannerSkeleton==false?
                    <Slider {...settings}>
                    {
                    banner.map((obj,i)=>
                            <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))} key={i}>
                                <div className="bannerDiv1 row col-md-12 " >
                                    <div className="col-md-5 colPa desRedius1 mobileHide">
                                        <span>
                                            <span className="titleSpanDesktop">{obj.name}</span><br/>
                                            <span className="desSpan deskDes">{obj.totEp} Episodes • {obj.playlist_language} • {obj.playlist_type}</span>
                                            <p className="deskShortDes">
                                            {
                                                htmlToText(obj.playlist_description).slice(0, 160)
                                            }
                                            </p>
                                            <div className="row fullWatch"> 
                                                <div className="playBtn">
                                                    <FaPlay />
                                                </div>
                                                <div className="watchDiv">
                                                    <span className="watch">
                                                        Watch Now
                                                    </span><br/>
                                                    <span className="watchDes">
                                                    {obj.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="col-md-7 colPa bannerDivImage baImage1">
                                        <img className="" style={{width:"inherit",height:"inherit"}} src={obj.img} alt="" />
                                        <div className="linerGradient row mobileHide">

                                        </div>
                                        <div className="desDiv row desktopHide">
                                            <span>
                                                <span className="titleSpan">{obj.name}</span><br/>
                                                <span className="desSpan">{obj.totEp} Episodes • {obj.playlist_language} • {obj.playlist_type}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                }
          
            
                </Slider>
                :
                    <div className="bannerDiv1 row col-md-12 ">
                        <div className="colPa bannerDivImage baImage1" style={{borderRadius:"15px"}}>
                            <Skeleton height={"100%"} />
                        </div> 
                    </div>
            }
       
       </div>
        </div>
        

    )
}
