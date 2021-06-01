import React from 'react';
import { Link } from 'react-router-dom';
import Stars from './Stars';



export default function Products(props) {

  const { product } = props;

  function image(){
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(product.image.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

  const img =image()


  const mimeType = product.image.contentType

  return <div className="product">

    <Link to={ '/Products/' + product._id } >
        <img src={`data:${mimeType};base64,${img}`} alt=""/>
    </Link>
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