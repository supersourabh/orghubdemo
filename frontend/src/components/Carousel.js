import { Carousel } from 'react-bootstrap';
import { useState } from "react";


export default function ControlledCarousel(props) {

  const {adsProducts}=props;

  console.log(adsProducts);

  function image(ads){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(ads.media.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
        {
          adsProducts.map(ads=>
            <Carousel.Item pause="hover">
              <div className="carousel-div " >
                  
                  {
                    ads.media.contentType==="image/jpeg"? 
                      <img style={{height:400 , width:"auto"}} 
                        src={`data:${ads.media.contentType};base64,${image(ads)}`} 
                        alt={ads.name}
                      />:
                      <video width="50%" height='300' autoPlay loop   >
                        <source src={`data:${ads.media.contentType};base64,${image(ads)}`} type="video/mp4"/>
                      </video> 
                                    
                  }

              </div>
                
                <Carousel.Caption>
                  <h3 style={{color : "green"}}>{ads.name}</h3>
                  <p>{ads.discription}</p>
                </Carousel.Caption>
              </Carousel.Item>
          )
        
        }
       
      </Carousel>
    
    );
  }