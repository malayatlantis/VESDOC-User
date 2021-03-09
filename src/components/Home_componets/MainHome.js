import React, { Component } from 'react'
import Banner from './Banner'
import Bestshow from './Bestshow'
import Specialshow from './Specialshow'
import Category from './Category'
import Latest from './Latest'
import CategoryPlaylist from './CategoryPlaylist'
import Bestrating from './Bestrating'
import {post,get} from '../../utils/service'
export default class MainHome extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0,0)
        this.state = {
             popular_show:[],
             latest_show:[],
             top_show:[],
             category:[],
             CatPlaylist:[],
             banner:[]
        }
    }
    componentDidMount(){
        get('/video/showbestshowplay/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'popular_show':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
        get('/video/showlatestshowplay/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'latest_show':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
        get('/video/showtopshowplay/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'top_show':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })

        get('/features/CaregoryDetails/')
        .then(response=>{
           // console.log(response)
            this.setState({
                'category':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })

        get('/features/CaregoryWisePlaylist/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'CatPlaylist':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
        get('/ads/bannerHome/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'banner':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render() {
        return (
            <>
                <Banner />
                {/* <Category category={this.state.category}/> */}

                <Specialshow spacial={this.state.banner}/>
                <Bestshow best={this.state.popular_show}/>
         
                <Latest best={this.state.latest_show}/>  
                <Bestrating best={this.state.top_show}/>


                {
                    this.state.CatPlaylist.map((obj,i)=>
                        <CategoryPlaylist best={obj.playList} title={obj.cat_name} key={i}/> 
                    )
                }
              
                <Category category={this.state.category}/>
            </>
        )
    }
}
