import React, { Component } from 'react'
import Moment from 'moment-js';
import { BsStar } from "react-icons/bs";
import SimpleReactValidator from 'simple-react-validator';
import { authpost,get } from '../../utils/service';
import ReactSnackBar from "react-js-snackbar";
import ReactPaginate from 'react-paginate';
export default class review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review:props.review,
            playlist_id:props.playlistID,
            review:'',
            title:'',
            message:'',
            Show: false,
            Showing: false,
            sanckbarMessage:'',
            reviewArray:[],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
        }
        this.validator = new SimpleReactValidator();
    }
    componentDidMount(){
        this.fatchReview()
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };
    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }
    fatchReview = () =>{
        get('/video/ShowPlaylistDetailsWithParticularEpisodeDetails/'+this.state.playlist_id+'/0')
        .then((data) => {
           // console.log(data.data)
            if(data.status==200){
               document.title='Watch '+data.data.playlist.playlist_name+' - VESDOC'
                var slice = data.data.review.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    reviewArray:data.data.review,
                    pageCount: Math.ceil(data.data.review.length / this.state.perPage),
                    content : data.data.review,
                    orgtableData : data.data.review,
                    tableData:slice
                })
              
            }
           
        }).catch(function (error) {
            console.log(error);
        }); 
    }
    show = () => {
        if (this.state.Showing) return;
    
        this.setState({ Show: true, Showing: true });
        setTimeout(() => {
          this.setState({ Show: false, Showing: false });
        }, 2000);
      };
    handleSubmit = () =>{
        if(String(localStorage.getItem('docubayUserPhone')).length>9){
            if (this.validator.allValid()) {
                const data={
                    'playlistID':this.state.playlist_id,
                    'review':this.state.review,
                    'title':this.state.title,
                    'message':this.state.message
                }
                authpost('/features/reviewSubmit/',data)
                .then(response=>{
                    console.log(response)
                    this.fatchReview()
                    if (this.state.Showing) return;
                    this.setState({ Show: true, Showing: true, sanckbarMessage:response.data.msg });
                    setTimeout(() => {
                    this.setState({ Show: false, Showing: false });
                    }, 2000);
                    this.setState({
                        // title:'',
                        // message:'',
                    })
                })
                .catch(error=>{
                    console.log(error)
                })
            }else{
                this.validator.showMessages();
                this.forceUpdate();
            }  
        }else{
            this.setState({ Show: true, Showing: true, sanckbarMessage:'Sorry! Please login First.' });
            setTimeout(() => {
            this.setState({ Show: false, Showing: false });
            }, 2000);
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});  
    }
    render() {
        const { openSnackbar, closeSnackbar } = this.props
        return (
            <div className="row">
            <div className="col-12 col-xl-12">
                <div className="comments">
                    <ul className="nav nav-tabs comments__title comments__title--tabs" id="comments__tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">
                                <h4>Reviews</h4>
                                <span>{this.state.reviewArray.length}</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-2" role="tabpanel">
                            {
                              this.state.reviewArray.length!=0?
                                <>
                                <ul class="reviews__list">
                                    {
                                        this.state.tableData.map((obj,i)=>
                                            <li class="reviews__item">
                                                <div class="reviews__autor">
                                                    <img class="reviews__avatar" src="img/avatar.svg" alt="" />
                                                    <span class="reviews__name">{obj.title}</span>
                                                    <span class="reviews__time"> {Moment(obj.date).format('f')} by {obj.name}</span>
                                                    <span class="reviews__rating">
                                                      <BsStar />{obj.retting}
                                                        
                                                    </span>
                                                </div>
                                                <p className="reviews__text">
                                                    {obj.message}
                                                </p>
                                            </li>
                                        )
                                        
                                    }
                                   
                                    {
                                        this.state.reviewArray.length>5?
                                       
                                            <div className="row" style={{float:'right',marginRight: "0px"}}>
                                                <ReactPaginate
                                                    previousLabel={"<"}
                                                    nextLabel={">"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.handlePageClick}
                                                    containerClassName={"pagination"}
                                                    subContainerClassName={"pages pagination"}
                                                    activeClassName={"active"}/>
                                                    
                                            </div>
                                            
                                        :null
                                    }
                                   
                                </ul>
                             
                                </>
                                
                            :null
                             }

                            <form action="#" className="reviews__form">
                                <div className="row">
                                    <div className="col-12 col-md-9 col-lg-10 col-xl-9">
                                        <div className="sign__group">
                                            <input type="text" name="title" className="sign__input" value={this.state.title} placeholder="Title" onChange={this.handleChange}/>
                                            <span style={{color:"red"}}>{this.validator.message('title', this.state.title, 'required',{ className: 'text-danger' })}</span>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-3 col-lg-2 col-xl-3">
                                        <div className="sign__group">
                                            <select name="review" id="select" className="sign__select" onChange={this.handleChange}>
                                                <option value="0">Rating</option>
                                                <option value="10">10</option>
                                                <option value="9">9</option>
                                                <option value="8">8</option>
                                                <option value="7">7</option>
                                                <option value="6">6</option>
                                                <option value="5">5</option>
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                            <span style={{color:"red"}}>{this.validator.message('review', this.state.review, 'required|integer',{ className: 'text-danger' })}</span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="sign__group">
                                            <textarea id="text2" name="message" className="sign__textarea" placeholder="Add review" onChange={this.handleChange} value={this.state.message}></textarea>
                                            <span style={{color:"red"}}>{this.validator.message('message', this.state.message, 'required',{ className: 'text-danger' })}</span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="button" className="sign__btn" onClick={this.handleSubmit}>Send</button>
                                    </div>
                                    
                                </div>
                            </form>
                           
                            <ReactSnackBar Icon={<span><img src='/img/icon.png' style={{width:"30px"}}/></span>} Show={this.state.Show}>
                                {this.state.sanckbarMessage}
                                </ReactSnackBar>
                        </div>
                    </div>
                </div>
            </div>

         </div>
    
        )
    }
}
