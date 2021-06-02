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
            
            <div className="image" style={{ zIndex: 0}}>

                <svg  viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg">
                    <path x="500" y="300" fill="#e90066" d="M46.5,-51.4C61.3,-43.1,75,-29.3,79.4,-12.8C83.7,3.8,78.9,23.3,69.6,41.1C60.4,58.9,46.8,75.1,30.4,79.1C14,83.1,-5.2,75,-23.1,67C-41,58.9,-57.6,50.9,-64,37.9C-70.4,24.9,-66.7,6.9,-63.3,-11C-59.9,-28.8,-56.9,-46.5,-46.4,-55.6C-35.9,-64.8,-18,-65.3,-1,-64.1C15.9,-62.8,31.8,-59.8,46.5,-51.4Z" transform="translate(100 100)" />
                </svg>

            </div>
            <div className="image" style={{ zIndex: 0 ,rotate:"90deg",position:"absolute",top:"65%",bottom:0,width:"100%"}}>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#00cba9" fill-opacity="1" d="M0,32L24,69.3C48,107,96,181,144,181.3C192,181,240,107,288,101.3C336,96,384,160,432,176C480,192,528,160,576,122.7C624,85,672,43,720,48C768,53,816,107,864,112C912,117,960,75,1008,74.7C1056,75,1104,117,1152,133.3C1200,149,1248,139,1296,112C1344,85,1392,43,1416,21.3L1440,0L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
            </svg>

            </div>
            <div className="image" style={{ zIndex: 0 ,position:"absolute",top:"4%",right:"5%",width:"40%"}}>

            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fcf" d="M41.4,-42.2C51.8,-31.1,57.1,-15.5,56.5,-0.5C56,14.5,49.7,28.9,39.3,41.2C28.9,53.5,14.5,63.5,2.9,60.6C-8.6,57.6,-17.2,41.7,-30.3,29.4C-43.5,17.2,-61.2,8.6,-65.5,-4.3C-69.8,-17.2,-60.7,-34.3,-47.5,-45.5C-34.3,-56.6,-17.2,-61.6,-0.8,-60.8C15.5,-60,31.1,-53.3,41.4,-42.2Z" transform="translate(100 100)" />
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
