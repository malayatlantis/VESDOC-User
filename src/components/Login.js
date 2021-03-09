import React,{useState,useRef,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {post} from '../utils/service'
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import './login.css'
import {checkAuth} from '../utils/auth';
export default function Login(props) {
    const [details,setDetails] = useState({phone:"",otpVisible:0,signInbtn:1,spin:false});
    const [phoneErr,setPhoneErr] = useState({})
    const [otpContent,setOtp] = useState({otpMsg:"",otpMsgColor:"",ist:0,sec:0,third:0,fourth:0,fifth:0,sixth:0})
    useEffect(() => {
        if(checkAuth.isAuthenticated){
            props.history.push('/')
        }
       
      },[]);
    const handleSubmit =e=>{
        e.preventDefault()
        // console.log(details.phone.length)
        
        setOtp({
            otpMsg:'',
        })
        setPhoneErr({
            phoneShort:'',
            phoneLong:'',
            phoneBlank:''
        })
        
        const isValid = fromValidation();
        
        if (isValid){
            setPhoneErr({
                phoneShort:'',
                phoneLong:'',
                phoneBlank:''
            })
            
            setOtp({
                otpMsg:'',
                otpMsgColor:'red',
            })
            const data = { 
                phone:details.phone,  
                role:2,
              }
            post('/auth/checkphone/', data)
            .then((data) => {
                if(data.data.msg=='Phone found') {
                    let otpin = Math.floor(100000 + Math.random() * 900000)
                    console.log(otpin)
                    setDetails({
                        ...details,
                        getOtp:otpin,
                        otpVisible:1,
                        signInbtn:0
                    })
                    setOtp({
                        ...otpContent,
                        otpMsg:'',
                        otpMsgColor:'green'
                    })
                    const sdata = { 
                        phone:details.phone,  
                        msg:'Please use this OTP '+otpin+' for complete the login process in VESDOC. Do not share it with anyone.',
                    }
                    post('/auth/sendsMS/', sdata)
                    .then((data) => {
                        setOtp({
                            ...otpContent,
                            otpMsg:'OTP Send Successfully',
                            otpMsgColor:'green'
                        })
                        
                    }).catch(function (error) {
                       
                        console.log(error);
                    });  
                }else{
                    setOtp({
                        otpMsg:'Invalid Phone Number',
                        otpMsgColor:'red',
                    })
                   
                }
              
            }).catch(function (error) {
               console.log(error);
              
            }) 
            // post('/auth/login/',details)
            // .then(response=>{
            //     console.log(response)
            //     props.history.push('/')
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
        }
    }
    const handleResend =e=>{
        e.preventDefault()

        const isValid = fromValidation();
        
        if (isValid){
            setPhoneErr({
                phoneShort:'',
                phoneLong:'',
                phoneBlank:''
            })
            setDetails({
                ...details,
                otpVisible:1,
                signInbtn:0
            })
            setOtp({
                otpMsg:'',
                otpMsgColor:'red',
            })
            const data = { 
                phone:details.phone,  
                role:2,
              }
            post('/auth/checkphone/', data)
            .then((data) => {
                if(data.data.msg=='Phone found') {
                    let otpin = Math.floor(100000 + Math.random() * 900000)
                    console.log(otpin)
                    setDetails({
                        ...details,
                        getOtp:otpin,
                    })
                    setOtp({
                        ...otpContent,
                        otpMsg:'',
                        otpMsgColor:'green'
                    })
                    const sdata = { 
                        phone:details.phone,  
                        msg:'Please use this OTP '+otpin+' for complete the login process in Vesdoc. Do not share it with anyone.',
                    }
                    post('/auth/sendsMS/', sdata)
                    .then((data) => {
                        setOtp({
                            ...otpContent,
                            otpMsg:'OTP Send Successfully',
                            otpMsgColor:'green'
                        })
                    }).catch(function (error) {
                       
                        console.log(error);
                    });  
                }else{
                    setOtp({
                        otpMsg:'Invalid Phone Number',
                        otpMsgColor:'red',
                    })
                }
              
            }).catch(function (error) {
               console.log(error);
              
            }) 
            // post('/auth/login/',details)
            // .then(response=>{
            //     console.log(response)
            //     props.history.push('/')
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
        }
    }
    const fromValidation=()=>{
        const phoneErr = {};
        let isValid;
        // console.log(details.phone)
        if(details.phone.trim().length < 10 && details.phone.trim().length != 0){
            setPhoneErr({
                ...phoneErr,
                phoneShort:"Phone No is too short"
            })
            // phoneErr.phoneShort ="Phone No is too short";
            return isValid = false;
        }
        if(details.phone.trim().length > 10 ){
            setPhoneErr({
                ...phoneErr,
                phoneLong:"Phone No is too long"
            })
            // phoneErr.phoneShort ="Phone No is too long";
            return isValid = false;
        }
        if(details.phone.trim().length == 0){
            setPhoneErr({
                ...phoneErr,
                phoneBlank:"Please Enter 10 digit Phone Number"
            })
            // phoneErr.phoneShort ="Phone No is too long";
            return isValid = false;
        }
        return isValid =true;
        // console.log(phoneErr)
    }
    const clickEvent=(first,last,prv)=>{
        if(last !='none'){
            if(first.target.value){
                document.getElementById(last).focus();
            }
        }
        if( prv != 'none'){
            if(!first.target.value){
                document.getElementById(prv).focus();
            }
        }
        
    }
    const handleLogin=e=>{
        e.preventDefault();
        let otp = otpContent.ist+otpContent.sec+otpContent.third+otpContent.fourth+otpContent.fifth+otpContent.sixth
        console.log(otp)
        console.log(details.getOtp)
       
        const loginData ={
            'phone':details.phone,
            'role':2
        }
        if(otp == details.getOtp){
            post('/auth/login/',loginData)
            .then(data=>{
                if(data.data.msg=='Already You have Logged In'){
                    
                    setOtp({
                        ...otpContent,
                        otpMsgColor:'red',
                        otpMsg:'Already You have Logged in anywhere.',
                        login_status:1,
                        id:data.data.id
                    })
                }else{
                    setDetails({
                        spin:true
                    })
                    
                    checkAuth.authenticate();
                    var token=JSON.parse(data.data.tokens.replace(/'/g, '"'));
                    localStorage.setItem('docubayUserToken', token.access);
                    localStorage.setItem('docubayUserRefreshToken', token.refresh);
                    localStorage.setItem('docubayUserPhone', data.data.phone);
                    localStorage.setItem('docubayUserEmail', data.data.email);
                    localStorage.setItem('docubayUserName', data.data.name);
                    localStorage.setItem('docubayUserChannelName', data.data.channel_name);
                    localStorage.setItem('docubayUserProfileImage', data.data.profile_image);
                    localStorage.setItem('docubayUserLoggedID', data.data.logged_id);
                    localStorage.setItem('docubayUserID', data.data.id);
                    let timer1 = setTimeout(() => props.history.push('/'), 2000)
                    // props.history.push('/')
                }

            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            
            setOtp({
                ...otpContent,
                otpMsgColor:'red',
                otpMsg:'Otp Not Match.',
            })

        }


    }
    const handleLogout = e=>{
        e.preventDefault();
        
        const loginData ={
            'phone':details.phone,
            'role':2
        }
        let otp = otpContent.ist+otpContent.sec+otpContent.third+otpContent.fourth+otpContent.fifth+otpContent.sixth
        console.log(otp)
        if(otp == details.getOtp){
            const logoutdata = { 
                user_id:otpContent.id,  
                
            }
            post('/auth/LoggoutAllDeviceForgate/', logoutdata)
            .then((data) => {
            }).catch(function (error) {
            
                console.log(error);
            }); 
            post('/auth/login/',loginData)
            .then(data=>{
                if(data.data.msg=='Already You have Logged In'){
                    
                    setOtp({
                        ...otpContent,
                        otpMsgColor:'red',
                        otpMsg:'Already You have Logged in anywhere.',
                        login_status:1,
                        id:data.data.id
                    })
                }else{
                    setDetails({
                        spin:true
                    })
                    checkAuth.authenticate();
                    var token=JSON.parse(data.data.tokens.replace(/'/g, '"'));
                    localStorage.setItem('docubayUserToken', token.access);
                    localStorage.setItem('docubayUserRefreshToken', token.refresh);
                    localStorage.setItem('docubayUserPhone', data.data.phone);
                    localStorage.setItem('docubayUserEmail', data.data.email);
                    localStorage.setItem('docubayUserName', data.data.name);
                    localStorage.setItem('docubayUserChannelName', data.data.channel_name);
                    localStorage.setItem('docubayUserProfileImage', data.data.profile_image);
                    localStorage.setItem('docubayUserLoggedID', data.data.logged_id);
                    localStorage.setItem('docubayUserID', data.data.id);
                    let timer1 = setTimeout(() => props.history.push('/'), 2000)
                }

            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            setOtp({
                ...otpContent,
                otpMsgColor:'red',
                otpMsg:'Otp Not Match.',
            })
        }


    }
    const errorRemove=()=>{
        setOtp({
            otpMsg:''
        })
        setPhoneErr({
            phoneShort:'',
            phoneLong:'',
            phoneBlank:''
        })
    }
    const moveSignUp=()=>{
        setDetails({
            spin:true
        })
        setTimeout(() => props.history.push('/register'), 2000)
    }
    const otpSetFun=(e,id)=>{
        if(id == 'ist'){
            setOtp({
                ...otpContent,
                ist:e.target.value
            })
        }
        if(id == 'sec'){
            setOtp({...otpContent,sec:e.target.value})
        }
        if(id == 'third'){
            setOtp({...otpContent,third:e.target.value})
        }
        if(id == 'fourth'){
            setOtp({...otpContent,fourth:e.target.value})
        }
        if(id == 'fifth'){
            setOtp({...otpContent,fifth:e.target.value})
        }
        if(id == 'sixth'){
            setOtp({...otpContent,sixth:e.target.value})
        }
    }
    return (
        
        <LoadingMask loading={details.spin} text={"loading..."}>
       
        <div className="sign section--full-bg" data-bg="img/bg.jpg" style={{background: "url('img/bg.jpg') center center / cover no-repeat"}}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            
                            <form onSubmit={handleSubmit} className="sign__form">
                                
                                <Link to="/login" className="sign__logo">
                                    <img src="img/logo.png" style={{width:"180px"}} alt="" />
                                </Link>
                                {details.signInbtn == 1?
                                <>
                                <div className="sign__group">
                                    <input 
                                    type="text" 
                                    className="sign__input" 
                                    placeholder="Phone Number" 
                                    onChange={e=>setDetails({...details,phone:e.target.value})}
                                    onKeyUp={e=>errorRemove()}
                                    value={details.phone}
                                   />
                                   {Object.keys(phoneErr).map((key,i)=>{
                                       return <div style={{color:'red'}} key={i}>{phoneErr[key]}</div>
                                   })}
                                </div>
                                <div style={{color:otpContent.otpMsgColor}} >{otpContent.otpMsg}</div>
                                </>
                                :
                                null
                                }
                                
                                {
                                    details.otpVisible == 1?
                                    <>
                                    <div id="otpsec">
                                        <h5 className="hl">ENTER OTP</h5>
                                        <div className="userInput">
                                            <input className="abc" type="text" id='ist' maxLength="1" onKeyUp={e=>clickEvent(e,'sec','none')} onChange={e=>otpSetFun(e,'ist')}/>
                                            <input className="abc" type="text" id="sec" maxLength="1" onKeyUp={e=>clickEvent(e,'third','ist')} onChange={e=>otpSetFun(e,'sec')}/>
                                            <input className="abc" type="text" id="third" maxLength="1" onKeyUp={e=>clickEvent(e,'fourth','sec')} onChange={e=>otpSetFun(e,'third')}/>
                                            <input className="abc" type="text" id="fourth" maxLength="1" onKeyUp={e=>clickEvent(e,'fifth','third')} onChange={e=>otpSetFun(e,'fourth')}/>
                                            <input className="abc" type="text" id="fifth" maxLength="1" onKeyUp={e=>clickEvent(e,'sixth','fourth')} onChange={e=>otpSetFun(e,'fifth')}/>
                                            <input className="abc" type="text" id="sixth" maxLength="1" onKeyUp={e=>clickEvent(e,'none','fifth')} onChange={e=>otpSetFun(e,'sixth')}/>
                                        </div>
                                    </div>
                                    
                                    <button className="sign__btn"  onClick={handleResend} type="button">Resend</button>
                                    <button className="sign__btn"  onClick={handleLogin} type="button">Confirm</button>
                                    <div style={{color:otpContent.otpMsgColor}} >{otpContent.otpMsg}</div>
                                    </>
                                    :
                                    null
                                }
                                {
                                    details.signInbtn == 1?
                                    <button className="sign__btn"  type="submit">Sign in</button>
                                    :
                                    null
                                }  
                                {
                                    otpContent.login_status == 1?
                                    <>
                                    <span className="sign__text">Logout all Devices and Login ?<Link onClick={handleLogout}>Click Here !</Link></span>
                                    </>
                                    :
                                    null
                                }
                               <span className="sign__text">Don't have an account? <a to="#" style={{cursor:"pointer",color:"#2f80ed"}} onClick={moveSignUp}>Sign up!</a></span>
                               <span className="sign__text">Back to Home? <Link to="/">Home !</Link></span>

                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </LoadingMask>
    )
}
