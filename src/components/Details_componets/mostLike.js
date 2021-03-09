import React,{useEffect, useState} from 'react'
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import Skeleton from 'react-loading-skeleton';
import {Link} from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
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
export default function MostLike(props) {
    const [episodeSkeleton,setSkeletonStatus] = useState(true);
    const list = props.data
    useEffect(() => {
      setTimeout(function(){ setSkeletonStatus(false) }, 3000);
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
        <div className="marginBottom mobileMargin" style={{marginBottom:"5%"}}>
            <div className="col-12">
            
            <h3 className="series-wrap__title">
                    
            More Like This
                </h3>
            </div>
            <div className="col-12">
                <div className="section__carousel-wrap">
                {
                    episodeSkeleton==false?
                    <Slider {...settings}>
                        {
                            list.length !== 0 ?
                            list.map((obj,i)=>
                            <div className="" style={{width: "191.667px", marginRight: "30px"}} key={i}>
                                <div className="card seriesItem">

                                    <Link className="card__cover" to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))}>
                                    {
                                        obj.point>0?
                                        <i className="plusIcon">P</i>
                                        :null
                                    }
                                        <img src={obj.img} alt="" />
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M13.1615 8.05308C13.1615 9.79908 11.7455 11.2141 9.9995 11.2141C8.2535 11.2141 6.8385 9.79908 6.8385 8.05308C6.8385 6.30608 8.2535 4.89108 9.9995 4.89108C11.7455 4.89108 13.1615 6.30608 13.1615 8.05308Z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05289C17.289 3.48888 13.806 0.750885 9.998 0.750885H10.002C6.194 0.750885 2.711 3.48888 0.75 8.05289C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </Link>
                                   
                                    <h3 className="card__title card__title--subs"><a href="details.html">{obj.name}</a></h3>
                                    <ul className="card__list card__list--subs">
                                    {
                                            obj.totEp==0?
                                                <li>Episode Coming Soon...</li>
                                            : <li>Total {obj.totEp} episodes playing</li>
                                        }
                                       
                                    </ul>
                                </div>
                        </div>
                        )
                        :
                        null
                        }
                        
                    </Slider>  
                 :
                 <>
                     <div className="row mobileHide1">
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"8vw"} width={"13vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"10vw"} /></h3>
                             </div>
                         </div>
                         
                     </div>
                     <div className="row desktopHide1" style={{margin:"0px 0px"}}>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"25vw"} width={"41vw"} style={{ borderRadius:"15px"}}/>
                                 <h3 className="series__title"><Skeleton height={"20px"} width={"34vw"} /></h3>
                             </div>
                         </div>
                         <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                             <div className="series seriesItem" >
                                     <Skeleton height={"25vw"} width={"41vw"} style={{ borderRadius:"15px"}}/>
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
