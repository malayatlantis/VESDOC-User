import React,{useEffect, useState} from 'react'
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

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
export default function Category(props) {
    const [episodeSkeleton,setSkeletonStatus] = useState(true);
    const playlist=props.category

    useEffect(() => {
      setTimeout(function(){ setSkeletonStatus(false) }, 2000);
    },[]);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: false,
                dots: true
              }
            },
            {
              breakpoint: 700,
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
        <div className="marginBottom">
            <div className="col-12">
                <h2 style={{color:"white"}} >Popular Genres</h2>
            </div>
            <div className="col-12">
                <div className="section__carousel-wrap">
                {
                    episodeSkeleton==false?
                    <Slider {...settings}>
                      {playlist.length !=0 ?
                       playlist.map((obj,i)=>
                       <Link to={"/CategorySearch?MhT="+urlCrypt.cryptObj(String(obj.name))} key={i}>
                       <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                            <div className="series seriesItem">
                                <div className="series__cover neHovar ">
                                
                                    <img src={obj.image} alt="" style={{opacity:0.7}}/>
                                    <span style={{bottom: "32px",display: "block",textAlign: "center",fontSize: "18px",width:"80%"}}>
                                    
                                        {obj.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        </Link>
                       )
                        
                        :
                        null
                      }
                    </Slider>
                    :
                 <>
                    <div className="row mobileHideNew">
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2" />
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                    
                                    </div>
                                </div>
                                
                                
                            </div>
                            <div className="row mobileHideDesktop">
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2" />
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton style={{ borderRadius:"15px"}} className="divSel2" />
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"20vw"} /></h3>
                                    </div>
                                </div>
                               
                               
                                
                            </div>
                          
                          
                            <div className="row desktopHideNew" style={{margin:"0px 0px"}} >
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton  style={{ borderRadius:"15px"}} className="divSel2"/>
                                        <h3 className="series__title"><Skeleton height={"20px"} width={"34vw"} /></h3>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton  style={{ borderRadius:"15px"}} className="divSel2"/>
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
