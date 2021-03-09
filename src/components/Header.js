import React,{ useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {checkAuth} from '../utils/auth'
import {authpost,get,post} from '../utils/service'
import { slide as Menu } from 'react-burger-menu'
import { Modal } from 'react-responsive-modal';
import Skeleton from 'react-loading-skeleton';
import { BsChevronRight } from "react-icons/bs"; 
import { AiOutlineHome,AiFillAndroid,AiOutlineMessage,AiOutlineAndroid } from "react-icons/ai";
import { RiPlayListAddLine,RiMovie2Line,RiContactsLine } from "react-icons/ri";
import { MdHistory,MdLocalMovies } from "react-icons/md";
import MobileMenu from './MobileMenu'
import './login.css'
import './sidebar.css'
import './search.css'
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
const { htmlToText } = require('html-to-text');


function Header(props) {
    const [opened] = useState(true);
    const [open,setOpen] = useState(false)
    const [searchSkeleton,setSearchSkeleton] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [channel_name,setChannel_name] = useState('')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [searchName,setSearchName] = useState('')
    const [searchDivDisplay,setSearchDivDisplay] = useState('none')
    const [searchResult,setSearchResult] = useState([])
    const [categoryResult,setCategoryResult] = useState([])
    useEffect(() => {
        get("/video/category/")
        .then((response) => {
            // console.log(response)
            setCategoryResult(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    },[]);
  
    const { location } = props; 
    const signout= e=>{
        e.preventDefault();
         const data = { 
             user_id:localStorage.getItem('docubayUserID'),
             logged_id:localStorage.getItem('docubayUserLoggedID')  
             
         }
         authpost('/auth/logout/', data)
         .then((data) => {
          if(data.data.sms=='Log Out Successfull'){
            checkAuth.signout();
           localStorage.removeItem('docubayUserToken');
           localStorage.removeItem('docubayUserRefreshToken');
           localStorage.removeItem('docubayUserPhone');
           localStorage.removeItem('docubayUserEmail');
           localStorage.removeItem('docubayUserName');
           localStorage.removeItem('docubayUserChannelName');
           localStorage.removeItem('docubayUserProfileImage');
           localStorage.removeItem('docubayUserLoggedID');
           localStorage.removeItem('docubayUserID');
           props.history.push('/login')
          }
         }).catch(function (error) {
         
             console.log(error);
         });  
         
    }
    if (location.pathname.match(/login/)) 
  { return null; } 
  if (location.pathname.match(/register/)) 
  { return null; }
  if (location.pathname.match(/searchPage/)) 
  { return null; }
  
  const myStudio = () =>{
    // console.log(1)
    authpost("/auth/viewProfile/")
    .then((response) => {
        //console.log(response)
        if(response.data.channel_status==false){
            setEmail(response.data.email)
          //  console.log(response.data.name)
            if(response.data.name!='Your Name'){
                setName(response.data.name)
            }
            
            setOpen(true)
        }else{
          
            var url="http://localhost:3001/continueLogin?token="+urlCrypt.cryptObj(String(localStorage.getItem('docubayAdminToken')))+"&tokenNew="+urlCrypt.cryptObj(String(localStorage.getItem('docubayAdminRefreshToken')))+"&Phone="+urlCrypt.cryptObj(String(localStorage.getItem('docubayAdminPhone')))+"&Email="+urlCrypt.cryptObj(String(response.data.email))+"&Name="+urlCrypt.cryptObj(String(response.data.name))+"&channelName="+urlCrypt.cryptObj(String(response.data.channel_name))+"&image="+urlCrypt.cryptObj(String(response.data.image))+"&loggedID="+urlCrypt.cryptObj(String(localStorage.getItem('docubayLoggedid')))+"&userID="+urlCrypt.cryptObj(String(localStorage.getItem('docubayAdminid')))
            window.open(url);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true)
     var formdata = new FormData(e.target);
     var formdata1 = [...formdata];
     var data = {
        name: formdata1[0][1],
        email: formdata1[1][1],
        channel_name: formdata1[2][1],
        img:0
    };
     authpost("/auth/updateProfile/",data)
     .then((response) => {
            //  console.log(response)
             localStorage.setItem('docubayUserEmail', response.data.email);
             localStorage.setItem('docubayUserName', response.data.name);
             localStorage.setItem('docubayUserChannelName', response.data.channel_name);
             localStorage.setItem('docubayUserProfileImage', response.data.image);

             
             var url="http://localhost:3001/continueLogin?token="+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserToken')))+"&tokenNew="+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserRefreshToken')))+"&Phone="+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserPhone')))+"&Email="+urlCrypt.cryptObj(String(response.data.email))+"&Name="+urlCrypt.cryptObj(String(response.data.name))+"&channelName="+urlCrypt.cryptObj(String(response.data.channel_name))+"&image="+urlCrypt.cryptObj(String(response.data.image))+"&loggedID="+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserLoggedID')))+"&userID="+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserID')))
             setOpen(false)
             setLoading(false)
             window.open(url);
  
     })
     .catch(function (error) {
         console.log(error);
     });
}
const onCloseModal = () => {
    setOpen(false)

  };





const handleChange = (e)=>{
    e.preventDefault();
    setSearchName(e.target.value)
    // console.log(String(e.target.value).length)
    if(String(e.target.value).length>0){
        setSearchSkeleton(true)
        // console.log('SearchDiv Open')
        setSearchDivDisplay('flow-root')
        const data={
            'search_item':searchName
        }
        post("/features/searchplaylist/",data)
        .then((response) => {
            // console.log(response)
            setSearchResult(response.data)
            setTimeout(function(){ setSearchSkeleton(false) }, 1000);
        })
        .catch(function (error) {
            console.log(error);
        });






    }else{
        // console.log('SearchDiv Close')
        setSearchDivDisplay('none')
    }
}
const handleBlur = (e) =>{
    // setSearchName('')
    // console.log('SearchDiv Close')
//    setSearchDivDisplay('none')
}
const clickSearchResult = (id)=>{
    // console.log(id)
    setSearchName('')
    setSearchDivDisplay('none')
}
 
const menuClick = (url) =>{
    //console.log(url)
    document.getElementById("react-burger-cross-btn").click();
    if(url=='getApps'){
        window.open('https://google.com')
    }else if(url=='studio'){
        myStudio()
    }else{
        props.history.push(url)
    }
}   

    return (
        <header className="header header--static nav-sticky" >
            <span className="MobileMenu">
                <Menu>
                    <div className="profileDiv row" style={{margin:0,display:"flex",borderBottom:"solid 1px #333d4f"}}>
                        <div style={{lineHeight:"21px",width:"93%"}}>
                        {!checkAuth.isAuthenticated ?
                            <>
                                <span style={{fontSize:"16.5px",fontWeight:"600"}}>Log in </span><br/>
                                <span style={{fontSize:"14.5px",fontWeight:"600",color:"#90929d"}}>For a better experience.</span>
                            </>
                        :
                            <>
                            <span style={{fontSize:"16.5px",fontWeight:"600"}}>{localStorage.getItem('docubayUserName')}</span><br/>
                            <span style={{fontSize:"14.5px",fontWeight:"600",color:"#90929d"}}>{localStorage.getItem('docubayUserPhone')}</span>
                            </>
                        }
                        </div>
 			{!checkAuth.isAuthenticated ?
                        <div style={{paddingTop:"15px"}} onClick={()=>menuClick('/login')}>
                            <BsChevronRight style={{float:"right"}}/>
                        </div>
			:

                        <div style={{paddingTop:"15px"}} onClick={()=>menuClick('/profile')}>
                            <BsChevronRight style={{float:"right"}}/>
                        </div>
			}
                    </div>
                    <div className="menuContantDiv">
                    <div className="menuTextDiv row" onClick={()=>menuClick('getApps')}>
                            <div className="menuIcon"> <AiFillAndroid /></div>
                          <div  className="menuTextDivDe"><span className="menuText" style={{paddingTop:0}}>Get Apps</span><span className="menuTextDes">For better experience.</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('/about')}>
                            <div className="menuIcon"> <AiOutlineMessage /></div>
                          <div  className="menuTextDivDe"><span className="menuText">About Us</span><span className="menuTextDes">Know about VESDOC</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('studio')}>
                            <div className="menuIcon"> <AiOutlineHome /></div>
                          <div  className="menuTextDivDe"><span className="menuText">My Studio</span><span className="menuTextDes">For Upload Content</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('/watchLater')}>
                            <div className="menuIcon"> <RiPlayListAddLine /></div>
                          <div  className="menuTextDivDe"><span className="menuText">Watchlist</span><span className="menuTextDes">Save to watch later</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('/watchHistory')} style={{paddingTop:"5px",paddingBottom:"15px"}}>
                            <div className="menuIcon"> <MdHistory /></div>
                          <div  className="menuTextDivDe"><span className="menuText1">Watch History</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('/CategoryMobile')} style={{paddingTop:"5px",paddingBottom:"15px"}}>
                            <div className="menuIcon"> <RiMovie2Line /></div>
                          <div  className="menuTextDivDe"><span className="menuText1">Genres</span></div>
                        </div>
                        <div className="menuTextDiv row" onClick={()=>menuClick('/contact')} style={{paddingTop:"5px",paddingBottom:"15px"}}>
                            <div className="menuIcon"> <RiContactsLine /></div>
                          <div  className="menuTextDivDe"><span className="menuText1">Contacy Us</span></div>
                        </div>
                       
                       
                    </div>
                    <div>
                        <div className="buttonStyle">
                           
                            <center><span onClick={()=>menuClick('/privacy')} className="linkStyle">Privacy Policy</span> <span  className="linkStyle">•</span> <span onClick={()=>menuClick('/terms')} className="linkStyle">Terms of Use</span></center>
                            <center  className="linkStyle">Copyright © 2021 VESDOC. All Rights Reserved. </center>
                            {/* <center  className="linkStyle">Developed by Quantex Consulting Services PVT. LTD. </center> */}
                        </div>
                    </div>
                  {/* <MobileMenu /> */}
                 
                </Menu>
            </span>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__content">
                      


                          
                            <Link to="/" className="header__logo">
                                <img src="img/logo.png" style={{width:"66px"}} alt="vesDoc" />
                            </Link>

                          
                            <ul className="header__nav">
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/">
                                        Home
                                        
                                    </Link>
                              
                                </li>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/about" >
                                        About
                                    </Link>
                                </li>
                                <li className="header__nav-item">
								    <a className="header__nav-link" href="#" role="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Genres <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.93893 3.30334C1.08141 3.30334 0.384766 2.60669 0.384766 1.75047C0.384766 0.894254 1.08141 0.196308 1.93893 0.196308C2.79644 0.196308 3.49309 0.894254 3.49309 1.75047C3.49309 2.60669 2.79644 3.30334 1.93893 3.30334Z"></path></svg></a>
                                    <ul className="dropdown-menu header__nav-menu" aria-labelledby="dropdownMenu1">
                                        {
                                            categoryResult.map((obj,i)=>
                                                <li key={i}><Link to={"/CategorySearch?MhT="+urlCrypt.cryptObj(String(obj.category_name))}>{obj.category_name}</Link></li>
                                            )
                                        }
                                     
                                    </ul>
							</li>
                                {/* {!checkAuth.isAuthenticated ?
                                <li className="header__nav-item profile-on">
                                    <Link className="header__nav-link" to="/login">Sign In</Link>
                                </li>
                                :
                                <div className="profile-on">
                                    <li className="header__nav-item"><Link className="header__nav-link" to="/profile">My Account</Link></li>
                                    <li className="header__nav-item"><Link to="/" className="header__nav-link">My Channel</Link></li>
                                    <li className="header__nav-item"><a href="#" className="header__nav-link" onClick={signout}>Log Out</a></li>
                                </div>
                                } */}
                                
                                
                            </ul>
                            <div className="header__actions">

                                <form action="#" className="header__form mobileHidek">
                                    <input className="header__form-input" type="text" placeholder="I'm looking for..." onChange={handleChange} onBlur={handleBlur} value={searchName}/>
                                    <button className="header__form-btn" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
                                        </svg>
                                    </button>
                                    <button type="button" className="header__form-close">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M14.3345 0.000183105H5.66549C2.26791 0.000183105 0.000488281 2.43278 0.000488281 5.91618V14.0842C0.000488281 17.5709 2.26186 20.0002 5.66549 20.0002H14.3335C17.7381 20.0002 20.0005 17.5709 20.0005 14.0842V5.91618C20.0005 2.42969 17.7383 0.000183105 14.3345 0.000183105ZM5.66549 1.50018H14.3345C16.885 1.50018 18.5005 3.23515 18.5005 5.91618V14.0842C18.5005 16.7653 16.8849 18.5002 14.3335 18.5002H5.66549C3.11525 18.5002 1.50049 16.7655 1.50049 14.0842V5.91618C1.50049 3.23856 3.12083 1.50018 5.66549 1.50018ZM7.07071 7.0624C7.33701 6.79616 7.75367 6.772 8.04726 6.98988L8.13137 7.06251L9.99909 8.93062L11.8652 7.06455C12.1581 6.77166 12.6329 6.77166 12.9258 7.06455C13.1921 7.33082 13.2163 7.74748 12.9984 8.04109L12.9258 8.12521L11.0596 9.99139L12.9274 11.8595C13.2202 12.1524 13.2202 12.6273 12.9273 12.9202C12.661 13.1864 12.2443 13.2106 11.9507 12.9927L11.8666 12.9201L9.99898 11.052L8.13382 12.9172C7.84093 13.2101 7.36605 13.2101 7.07316 12.9172C6.80689 12.6509 6.78269 12.2343 7.00054 11.9407L7.07316 11.8566L8.93843 9.99128L7.0706 8.12306C6.77774 7.83013 6.77779 7.35526 7.07071 7.0624Z"
                                            ></path>
                                        </svg>
                                    </button>
                                </form>
                                <div className="searchDiv" style={{display:searchDivDisplay}}>
                                    
                                    {
                                        searchSkeleton==false?
                                            searchResult.length>0?
                                                searchResult.map((obj,i)=>
                                                    <Link to={"/details?IDPlAyLI="+urlCrypt.cryptObj(String(obj.id))} key={i}>
                                                        <div className="row col-md-12 searchRow" onClick={()=>clickSearchResult(obj.id)}>
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
                                            <div className="row col-md-12 searchRow">
                                                <div className="refDiv1" style={{height:"65px",width: "100%"}}>
                                                    <center style={{color:"white",marginTop: "19px"}}>No Result Found</center>
                                                </div>
                                            </div>
                                        : [1,2,3,4,5].map((obj,i)=>
                                            <div className="row col-md-12 searchRow" key={i}>
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

                                </div>






                                <Link to='/searchPage' className=" mobileHidek3">
                                    <button className="header__search" type="button" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg>
                                    </button>
                                </Link>
                                {!checkAuth.isAuthenticated ?
                                    <Link to="/login" className="header__user">
                                        <span>Sign in</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"
                                            ></path>
                                        </svg>
                                    </Link>
                                    :
                                    <>
                                  
                                    <li className="header__nav-item profile-off">
                                        <a className="header__nav-link header__nav-link--more" href="#" role="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <svg className="svg-icon" viewBox="0 0 20 20">
                                                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                                            </svg>
                                        </a>

                                        <ul className="dropdown-menu header__nav-menu header__nav-menu--scroll " aria-labelledby="dropdownMenu3" data-scrollbar="true" tabIndex="-1" style={{overflow: "hidden", outline: "none", position: "absolute", willChange: "transform", top: "0px", left: "0px", transform: "translate3d(0px, 61px, 0px)"}} x-placement="bottom-start">
                                        <div className="scroll-content" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                                        <li><span className="myStudio" style={{cursor:"pointer"}} onClick={()=>myStudio()}>My Studio</span></li>
                                            <li><Link to="/watchLater">Watch Later</Link></li>
                                            <li><Link to="/watchHistory">Watch History</Link></li>
                                           
                                            {/* <li><Link to ={'/CreatorDetails?id='+urlCrypt.cryptObj(String(localStorage.getItem('docubayUserID')))}>My Channel</Link></li> */}
                                            <li><Link to="/profile">My Account</Link></li>
                                            <li><a href="#" onClick={signout}>Log Out</a></li>
                                        </div>
                                      
                                        </ul>
                                    </li>
                                    <Modal open={open} onClose={onCloseModal} center>
                                        <div className="col-md-12 RepotTextarea1" style={{padding:"0px 16px 16px 20px"}} >
                                        <form onSubmit={handleSubmit}>                                                      
                                            <h4 style={{color:"white"}}>Create Channel</h4> 
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1" className="textModal">Your Name</label><br/>
                                                <input type="text" className="form-control textField" name="name" required defaultValue={name}  placeholder="Enter Your Name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"  className="textModal">Email ID</label><br/>
                                                <input type="text" className="form-control textField" name="email" required defaultValue={email}  placeholder="Enter Your Email ID" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1"  className="textModal">Channel Name</label><br/>
                                                <input type="text" className="form-control textField" name="channel_name" required defaultValue={channel_name}  placeholder="Enter Channel Name" />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary buttonText" style={{float:"right"}} disabled={Loading}>{Loading ? 'Loading...' : 'Create Channel'}</button>

                                            </div>
                                            </form>
                                        </div>
                                    </Modal>
                                        
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
   
  }
  export default withRouter(Header)