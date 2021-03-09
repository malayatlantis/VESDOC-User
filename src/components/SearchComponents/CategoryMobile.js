import React, { Component } from 'react'
import Slider from "react-slick";
import { GrNext, GrPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {get} from '../../utils/service'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import queryString from 'query-string';
import Avatar from 'react-avatar';

var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class CategoryMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
            category:[],
            episodeSkeleton:true
      
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        get('/features/CaregoryDetails/')
        .then(response=>{
            console.log(response)
            this.setState({
                'category':response.data
            })
            setTimeout(()=>{  this.setState({'episodeSkeleton':false }) }, 2000);
        })
        .catch(error=>{
            console.log(error)
        }) 
     
        document.title='Popular Genres - VESDOC'   
          
    }
    render() {
        return (
            <div className="catalog catalog--page">
            <div className="container">
                <div className="row WatchTopDiv">
                    <div className="col-12">
                        <div className="titleDiv">
                        <div className="row" style={{paddingLeft    :"15px"}}>
                            <span className="WatchTExt">Popular Genres</span>
                        </div>
                        </div>
                       
                        <div class="row row--grid">
                        {
                            this.state.episodeSkeleton==false?
                            <>
                                {
                                    this.state.category.map((obj,i)=>
                                        <div class="col-6 col-sm-4 col-lg-3 col-xl-3">
                                        <div class="card">
                                            <Link to={"/CategorySearch?MhT="+urlCrypt.cryptObj(String(obj.name))}  class="card__cover series__cover">
                                                <img src={obj.image} alt="" style={{opacity:0.7}} />
                                                <span style={{bottom: "32px",display: "block",textAlign: "center",fontSize: "18px",width:"90%",position: "absolute"}}>{obj.name} </span>
                                            </Link>   
                                            </div>
                                        </div>    
                                    )
                                }
                            </>
                            :
                          <div className="row" style={{margin:"0px 0px"}} >
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                            <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
                                    </div>
                                </div>
                                <div className="BestShowSlideItem" style={{padding:"0 5px"}}>
                                    <div className="series seriesItem" >
                                    <Skeleton  style={{ borderRadius:"15px"}} height="26vw" width="43vw"/>
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
