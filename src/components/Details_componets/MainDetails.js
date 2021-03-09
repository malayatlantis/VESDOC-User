import React, { Component } from 'react'
import Banner from './banner'
import Episode from './episode'
import MostLike from './mostLike'
import queryString from 'query-string';
import {get,post} from '../../utils/service'
import './details.css'
import ErrorPage from '../404Components/errorPage';
import Specialshow from './Specialshow'
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
export default class MainDetails extends Component {
    constructor(props) {
        window.scrollTo(0,0)
        super(props)
        window.scrollTo(0,0)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            banner:'',
            bannerSkeleton:false,
            id:urlCrypt.decryptObj(params.IDPlAyLI),
            related_playlist:[],
            bannerPromote:[]
        }
       
    }
    componentDidMount() {

        get('/video/getBanner/'+this.state.id)
        .then((data) => {
        //    console.log(data)
            if(data.status==200){
                document.title=data.data.name+' - VESDOC'
                if(data.data.length==0){
                    this.setState({bannerSkeleton:true })
                }else{
                    this.setState({bannerSkeleton:false })
                }
            }else{
                this.setState({bannerSkeleton:true })
            }
           
        }).catch(function (error) {
            console.log(error);
        }); 
        const data={
            'playlist_id':this.state.id
        }
        post('/video/showrelatedplaylist/',data)
        .then(response=>{
            console.log(response)
            this.setState({
                'related_playlist':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
        get('/ads/bannerHome/')
        .then(response=>{
            // console.log(response)
            this.setState({
                'bannerPromote':response.data
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render() {
        return (
            <>
            {
                this.state.bannerSkeleton?
                    <ErrorPage />
                :<>
                    <Banner {...this.props}/>
                    <Episode {...this.props}/>
                    {
                        this.state.related_playlist.length>0?
                        <MostLike data={this.state.related_playlist}/>
                        :null
                    }
                    <Specialshow spacial={this.state.bannerPromote}/>
                    

                </>
            }
                
            </>
        )
    }
}
