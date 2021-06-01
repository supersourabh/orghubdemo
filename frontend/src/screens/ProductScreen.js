
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct , likesProduct} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Stars from '../components/Stars';


function ProductScreen(props){

  const [qty ,setQty] = useState(1);
  

  const productDetails = useSelector(state => state.productDetails);
  const {product ,loading , error} = productDetails ;

  const productLike = useSelector(state => state.productLike)
  const { Likes } =productLike

  function imageSrc(product){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(product.image.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

  const dispatch = useDispatch();

  const productId=props.match.params.id;

  useEffect(() => {

    dispatch(detailsProduct(productId ));
    
  },[dispatch,  productId])

  const handlerAddToCart =() =>{
    props.history.push("/cart/" + productId + "?qty=" + qty)
  }

  const likeHandler=(productId , e)=>{
    e.preventDefault()
    dispatch(likesProduct( productId))
  
  }

  const showReviewHandler = () =>{
    
    alert("show clicked")
}

 

  return <div>
    <div className="back-to-results">
       <Link to="/" >back to results</Link>
    </div>
    {loading? 
       <LoadingBox>  </LoadingBox> :
         error?
      <MessageBox   varient="danger">
        {error}
      </MessageBox>:(
       <div className="details">
      <div className="details-image">
        <img src={`data:${product.image.contentType};base64,${imageSrc(product)}`} alt ="product"/>
      </div>
      <div className="details-info">

        <ul>
          <li>
            <h4>{product.name}</h4>
          </li>
          <li>
            <b>Price :{product.price} </b> &#8377;/kg
          </li>
          <li>
              likes :{Likes ? Likes : product.likes} {"  "}<button type="button" className="buttonDelete" onClick={(e)=>likeHandler( product._id, e)}>	 &#128077;  </button>
          </li>
          <li>
            <Stars stars={product.stars} reviews={product.reviews} ></Stars>
            <b type="button" onClick={showReviewHandler} className="showButton" > Show </b>

          </li>
         
          <li>
            <b>Discription:</b>
                  <div  className='discription'>
                    {product.discription}
                  </div>
          </li>
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>
          <b>Price :{ product.price } </b> &#8377;
          </li>
          <li>
          
           <b> Status:</b>{
              product.countInStock>0?
              <span className="success"> In Stock </span>
            : 
            <span className="danger"> Unavailable </span>
            
            }

          </li>
          <li>
            Quantity(in kg):
            
            <select  value={qty} onChange ={(e)=>{setQty(e.target.value)} } >
            
              {[...Array(product.countInStock).keys()].map(x=>
              <option key={x+1} value={x+1}>{x+1}</option>
              )}
           

            </select>
          </li>
          <li >
            {product.countInStock>0?
            <button className="button" onClick={handlerAddToCart} >Add To Cart</button>:
            <button  id="button" disabled>OUT OF STOCK</button>}
          </li>
        </ul>
     

      </div>

    </div>
   

    )
      
    }
   
    </div>
  }
    
  

export default ProductScreen ;