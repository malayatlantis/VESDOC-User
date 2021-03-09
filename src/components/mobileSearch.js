import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {checkAuth} from '../utils/auth'
import {post} from '../utils/service'
import { slide as Menu } from 'react-burger-menu'
import { Modal } from 'react-responsive-modal';
import Skeleton from 'react-loading-skeleton';
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
const { htmlToText } = require('html-to-text');
export default class mobileSearch extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            searchName:'',
            searchDivDisplay:'',
            searchSkeleton:false,
            searchResult:[],
            searchStatus:false
        }
    }
    clickSearchResult = (id)=>{
        console.log(id)
    }
    handleChange = (e)=>{
        e.preventDefault();
        this.setState({ searchName:e.target.value})
        console.log(String(e.target.value).length)
        if(String(e.target.value).length>0){
            this.setState({ searchSkeleton:true})
            console.log('SearchDiv Open')
            this.setState({ searchDivDisplay:'flow-root',searchStatus:true})
        
            const data={
                'search_item':this.state.searchName
            }
            post("/features/searchplaylist/",data)
            .then((response) => {
                console.log(response)
                this.setState({ searchResult:response.data})
                setTimeout(()=>{ this.setState({ searchSkeleton:false})}, 1000);
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            console.log('SearchDiv Close')
            this.setState({ searchDivDisplay:'none',searchStatus:false})
        }
    }
    handleBlur = (e) =>{
        console.log('SearchDiv Close')
        this.setState({ searchDivDisplay:'none',searchName:''})
    }
    render() {
        return (
            <div className="MobileMargin">
                <div className="searchText">
                     <input className="header__form-input inputFiled" autofocus type="text" placeholder="I'm looking for..." onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.searchName}/>
                </div>
                <div className="mobileSearchDiv">
                {
                    this.state.searchStatus==true?
                        this.state.searchSkeleton==false?
                            this.state.searchResult.length>0?
                                this.state.searchResult.map((obj,i)=>
                                    <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))} key={i}>
                                        <div className="row col-md-12 MobileSearchRow">
                                        <div className="refDiv">
                                            <img className="refImage" src={obj.img} />
                                        </div>
                                        <div className="refDes">
                                            <p className="refTitle">{obj.name}<br/></p>
                                            <span className="refCat">{obj.playlist_language} • {obj.playlist_type} • {obj.totEp} Episodes<br/></span>
                                            <span className="refShortDes"><p >
                                                {
                                                    String(obj.name).length<22?
                                                    htmlToText(obj.playlist_description).slice(0, 65)
                                                    :htmlToText(obj.playlist_description).slice(0, 30)
                                                }
                                    
                                                
                                                ...</p></span>
                                        </div>
                                    </div>
                                    </Link>
                                )
                            :
                            <div className="row col-md-12 MobileSearchRow">
                                <div className="refDiv1" style={{height:"65px",width: "100%"}}>
                                    <center style={{color:"white",marginTop: "19px"}}>No Result Found</center>
                                </div>
                            </div>
                        : [1,2,3,4,5,6].map((obj,i)=>
                            <div className="row col-md-12 MobileSearchRow">
                                <div className="refDiv">
                                    <Skeleton className="refImage" height="78.75px"/>
                                </div>
                                <div className="refDes">
                                    <span className="refTitle"><Skeleton height="20px" width="155px"/><br/></span>
                                    <span className="refCat"><Skeleton height="16px" width="185px"/><br/></span>
                                    <span className="refShortDes"><p ><Skeleton height="11px" width="210px"/><br/><Skeleton height="11px" width="100px"/></p></span>
                                </div>
                            </div>
                        )
                    :null
                }   
            </div>
               
                

                {/* <div className="searchDiv" style={{display:this.state.searchDivDisplay}}>
                                    
                                    {
                                        this.state.searchSkeleton==false?
                                        this.state.searchResult.length>0?
                                        this.state.searchResult.map((obj,i)=>
                                                    <div className="row col-md-12 searchRow" onClick={()=>this.clickSearchResult(obj.id)}>
                                                        <div className="refDiv">
                                                            <img className="refImage" src={obj.img} />
                                                        </div>
                                                        <div className="refDes">
                                                            <p className="refTitle">{obj.name}<br/></p>
                                                            <span className="refCat">{obj.playlist_language} • {obj.playlist_type} • {obj.totEp} Episodes<br/></span>
                                                            <span className="refShortDes"><p >
                                                                {
                                                                    String(obj.name).length<22?
                                                                    htmlToText(obj.playlist_description).slice(0, 65)
                                                                    :htmlToText(obj.playlist_description).slice(0, 30)
                                                                }
                                                    
                                                                
                                                                ...</p></span>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                            <div className="row col-md-12 searchRow">
                                                <div className="refDiv1" style={{height:"65px",width: "100%"}}>
                                                    <center style={{color:"white",marginTop: "19px"}}>No Result Found</center>
                                                </div>
                                            </div>
                                        : [1,2,3,4,5].map((obj,i)=>
                                            <div className="row col-md-12 searchRow">
                                                <div className="refDiv">
                                                    <Skeleton className="refImage" height="78.75px"/>
                                                </div>
                                                <div className="refDes">
                                                    <span className="refTitle"><Skeleton height="20px" width="155px"/><br/></span>
                                                    <span className="refCat"><Skeleton height="16px" width="185px"/><br/></span>
                                                    <span className="refShortDes"><p ><Skeleton height="11px" width="210px"/><br/><Skeleton height="11px" width="100px"/></p></span>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div> */}




            </div>
        )
    }
}
