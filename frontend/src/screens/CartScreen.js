import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import Delete from '../icons/Delete';


function CartScreen(props){

    const cart = useSelector(state=>state.cart)

    const {cartItems} = cart ;

    const productId = props.match.params.id;
    
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;

    
    const dispatch = useDispatch()

    const removeFromCartHandler=(productId) =>{
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler =()=>{
        props.history.push("/signin?redirect=shipping");
    }
   
    const addProductHandler=() =>{
        props.history.push("/");
    }
 
    useEffect(() => {
        dispatch(addToCart(productId , qty))

        if (productId){
            dispatch(addToCart(productId , qty))
        }
       
    }, [dispatch, productId, qty])



    function image(product){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(product.image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

   



    return <div className="cart">
    <div className="cart-list">
        <ul className="cart-list-container">
            
        
          
    {  
        cartItems.length === 0 ?
             <div className="empty-cart">
                <MessageBox  > Cart is empty </MessageBox> 
        
             </div>:
                    <li>
                        <h3 id="cart-h3">

                        Shopping Cart

                        </h3>
                        <h3>
                            Quantity(in kg)
                        </h3>
                    
                        <h3>
                            Price/ kg
                        </h3>
                        <h3>
                            Delete
                        </h3>
                    
                    
                        
                    </li>
                 
           }  
            {
                cartItems.map( item => 
                    <li key={item._id}>
                            <div className="cart-image">
                            <img src={`data:${item.image.contentType};base64,${image(item)}`} alt=""/>
                            </div>
                            <div className="cart-name" >
                                    <div>
                                    Name :
                                        <Link to={ "/Products/"+item.product }>
                                             {item.name}
                                        </Link>
                                    
                                    </div>
                                 
                                 
                                        
                                    
                            </div>
                            
                            <div className="cart-qty">
                                      <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                          
                                      {[...Array(item.countInStock).keys()].map(x=>
                                      <option key={x+1} value={x+1}>{x+1}</option>
                                      )}
                                      </select>
                                      
                                  
                                 
                            </div>
                               
                            <div className="cart-price">
                                 &#8377; {item.price}
                            </div>
                            <div className="cart-delete">
                         
                                 <button type="button" className="delete-button" onClick={()=> removeFromCartHandler(item.product)}>
                                       

                                       <Delete/>

                                 </button>
                                   
                            </div>
                        
                        </li>)
                    
            }
                <li>
                    <button className="button" id="addmorebutton"onClick={addProductHandler}>Add more</button>
                </li>
          
        </ul>
    </div>

    {
                    cartItems.length === 0 ? '' :
                     
    
    <div className="cart-action">
        <h3>
            Total of ({cartItems.reduce((a,c) => a+c.qty, 0)} items)
            :
             &#8377;{cartItems.reduce((a ,c)=> a + c.price * c.qty ,0)}
        </h3>

        <button onClick={checkoutHandler} className ="button" disabled={cartItems.length === 0} >
            Proceed to checkout
        </button>

    </div> 
    
    }
        
    </div>
}

export default CartScreen;