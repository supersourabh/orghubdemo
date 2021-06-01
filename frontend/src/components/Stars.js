import React from 'react';

export default function Stars(props){

    const {stars ,reviews} =props;


  

   return  <div className  ="product-rating">
        <div>
               <span>
               <i className={stars>=1?"fa fa-star":stars>=0.5?"fa fa-star-half-o":"fa fa-star-o"}></i>
               </span>
               <span>
               <i className={stars>=2?"fa fa-star":stars>=1.5?"fa fa-star-half-o":"fa fa-star-o"}></i>
               </span>
               <span>
               <i className={stars>=3?"fa fa-star":stars>=2.5?"fa fa-star-half-o":"fa fa-star-o"}></i>
               </span>
               <span>
               <i className={stars>=4?"fa fa-star":stars>=3.5?"fa fa-star-half-o":"fa fa-star-o"}></i>
               </span>
               <span>
               <i className={stars>=5?"fa fa-star":stars>=4.5?"fa fa-star-half-o":"fa fa-star-o "}></i>
               </span>
        </div>
       <div>
              
           <b> {"Reviews: "+ reviews} </b> 
            
              
       </div>
     </div>
}