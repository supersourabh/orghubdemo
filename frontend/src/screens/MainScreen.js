import React from 'react'
import img1 from "../icons/—Pngtree—neon vegetables fruits_4526853.png"
import img2 from "../icons/fresh-vegetables-logo-359548007A-seeklogo.com.png"
import img3 from "../icons/—Pngtree—vector root icon_4155304.png"
 

export default function MainScreen(props) {

    const handler =()=>{
        props.history.push("/")
    }
    
    const loadFunction=()=>{
       // document.querySelector(".span1").style.color="green"
    }

    return (
        <div className="mainscreen" onLoad={loadFunction}>
            
            <div className="image" style={{ zIndex: -10}}>

            <svg viewBox="-10 40 350 800" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF0066" d="M46.5,-51.4C61.3,-43.1,75,-29.3,79.4,-12.8C83.7,3.8,78.9,23.3,69.6,41.1C60.4,58.9,46.8,75.1,30.4,79.1C14,83.1,-5.2,75,-23.1,67C-41,58.9,-57.6,50.9,-64,37.9C-70.4,24.9,-66.7,6.9,-63.3,-11C-59.9,-28.8,-56.9,-46.5,-46.4,-55.6C-35.9,-64.8,-18,-65.3,-1,-64.1C15.9,-62.8,31.8,-59.8,46.5,-51.4Z" transform="translate(100 100)" />
            </svg>

           

            </div>
            
                <div class="png">
                    <img className="img" src={img1} alt ="" />
                </div>
                <div class="png">
                    <img className="pngimg" src={img2} alt ="" />
                </div>
                <div class="png">
                    <img className="pngimg2" src={img3} alt ="" />
                </div>
                <div className="container">
                        <div className="brand-name">
                            <strong >OrgHub </strong>
                            <span className="tagline">if you can feel it ,then you should eat it .</span>
                        </div>
                        <div className="brand-quote">
                            <text><span className="span1">The more colorful the food,  </span><span className="span2">the better.I try to add color to my diet, which means vegetables and fruits.</span></text>
                        </div>
                </div>
                
                <div  className="main-screen">
                    <button type="button" className='main-button' onClick={handler} ><span>Lets shop</span><span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></button>
                    
                </div>
                <div className="creater">
                    <strong id="crt-strong">By:</strong><text> <span id="creater">Sourbh kotagi</span><span id="createrInf0">UVCE,Bengaluru</span> </text>
                </div>
            
        </div>
        
    )
}
