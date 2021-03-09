import React from 'react'

export default function Home(props) {
    console.warn(props)
    return (
        <div>
            <h1>Home Components</h1>
            
            <div className="cart-wrapper">
                <div className="img-wrapper item">
                    <img src="https://www.fdfproject.com/wp-content/uploads/2018/12/iphone-png.png" />
                </div>
                <div className="text-wrapper item">
                    <span>
                        I-Phone
                    </span>
                    <span>
                        Price: $1000.00
                    </span>
                </div>
                <div className="btn-wrapper item">
                    <button 
                    onClick={
                        ()=>{props.addToCartHandler({pice:1000,name:'i phone 11'})}
                        }
                    >
                        Add To Cart</button>
                </div>
                <div className="btn-wrapper item">
                    <button 
                    onClick={
                        ()=>{props.removeToCartHandler({pice:1000,name:'i phone 11'})}
                        }
                    >
                        Remove To Cart</button>
                </div>
            </div>
        </div>
    )
}
