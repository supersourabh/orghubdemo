import React from 'react';
import { Link } from 'react-router-dom';
import Stars from './Stars';



export default function Products(props) {

  const { product } = props;

  function image(product){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(product.image.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

  const img =image(product)


  const mimeType = product.image.contentType

  return <div className="product">
    
    <div className="product-image">
      <Link to={ '/Products/' + product._id } >

        <img src={`data:${mimeType};base64,${img}`} alt=""/>

      </Link>
    </div>
    <div className="product-details">
      <Link to={ '/Products/' + product._id } >
        <div className="product-name">
          { product.name }
        </div>
      </Link>
      <div className="product-brand">
        { product.breed }
      </div>
      <div className="product-price">
        &#8377;{ product.price }/kg
      </div>

      <Stars stars={ product.stars } reviews={ product.reviews } ></Stars>
      <div>
      </div>


    </div>

  </div>
}