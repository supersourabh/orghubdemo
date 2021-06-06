import './App.css';
import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import signinScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import ProductaddScreen from './screens/ProductaddScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import {  signout } from './actions/userActions';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/privateRoute';
import AdmineRoute from './components/AdminRoute';
import UsersListScreen from './screens/UsersListScreen';
import SellerScreen from './screens/SellerScreen';
import DashboardScreen from './screens/DashboardScreen';
import { useEffect, useState } from 'react';
import MainScreen from './screens/MainScreen';
import PaymentScreen from './screens/PaymentScreen';
import ImageScreen from './screens/ImageScreen';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignin)

  const { userInfo } = userSignin;

  //const profileImage = useSelector(state => state.profileImage)

  //const{loading: loadingImg , error :errorImg , data }= profileImage;

  

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }
  const removeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  const [search, setSearch] = useState(false)

const searching=()=>{
  if(search){
    setSearch(false)
  }
  if(!search){
    setSearch(true)
  }
}


const dispatch = useDispatch()

useEffect(() => {
  if(userInfo){
    
    //dispatch(imageUser(userInfo))
  
  }



}, [dispatch, userInfo])

 

  const signoutHandler = () => {
    dispatch(signout())
  };





  return (
    < BrowserRouter>
    
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className=".open" onClick={openMenu}>&#9776;</button>
            <Link to="/" >OrgHub</Link>
          </div>
          <div className="header-links">
          {
            search? 
            
                <input type="text" autoFocus placeholder="Search... "  ></input>
            
            : ""
          }
          <div>

            <Link className="fa fa-fw fa-search" to="#" onClick={searching}></Link>

          </div>

          
          

          {
              userInfo ?
              <>
              <div className="dropdown">

                  <div>
                    <b id="profileName">Hi.. {userInfo.name}</b>
                  </div>

                  
                  {" "}
                  <i className="fa fa-caret-down" ></i>

                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderHistory" >Order-History</Link>
                    </li>
                    {
                      userInfo.seller &&
                        <li>
                          <Link to="/seller" >Your-Products</Link>
                        </li> 
                    }


                    <li> 
                        <Link to="/profile" >Profile</Link>
                    </li>

                    <li>
                      

                        <Link to="/" onClick={signoutHandler}>Sign Out</Link>

                     

                    </li>


                  </ul>
                </div>
                </>
                :
                <div>
                  <Link className="fa fa-fw fa-user" to="/signin">  </Link>
                </div>
                  
               
              
            }
            <div>

              <a className="fa fa-fw fa-envelope" href={"mailto:business@gmail.com"} style={{cursor:"pointer"}}> </a>

            </div>
            <div>
              <Link className="cart-icon fa fa-shopping-cart" to={`/cart`}>   {
                cartItems.length > 0 &&
                (<span className='badge'> {cartItems.length} </span>)
              }
              </Link>
            </div>
            

            

           
            {
              userInfo && userInfo.isAdmin &&
              <div className="dropdown ">
                <Link to="/" > 
                  <div className="admin-app-dropdown">
                    <text style={{color:"#fff" ,fontWeight:"bold" , color : "#7bff72"}} >{"_Admin_"}</text>
                    <i style={{color:"#fff"}} className="fa fa-caret-down"></i>               
                  </div>
                 
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"> Dashboad</Link>
                  </li>
                  <li>
                    <Link to="/Products"> ProductsList</Link>
                  </li>
                  <li>
                    <Link to="/ordersList"> Orders</Link>
                  </li>
                  <li>
                    <Link to="/usersList"> Users</Link>
                  </li>

                </ul>
              </div>

            }


          </div>
        </header>
        <aside className="sidebar">
          <h3>shopping cetageries</h3>
          <button className="sidebar-close-button" onClick={removeMenu} >X</button>
          <ul className="sidebar-list">
            <li>
              <Link to='/'>fruits</Link>
            </li>
            <li>
              <Link to='/' >vegitables</Link>
            </li>

          </ul>

        </aside>

        <main className="main">

          <div className="contents">

            <Route path="/orghubdemo" exact={true} component={MainScreen} />

            <Route path="/" exact={true} component={HomeScreen} />

            <Route path="/Products/:id" component={ProductScreen} />

            <Route path="/shipping" component={ShippingScreen} />

            <Route path="/payment" component={PaymentMethodScreen} />

            <Route path="/placeorder" component={PlaceOrderScreen} />

            <AdmineRoute path="/ordersList" exact component={OrdersListScreen} ></AdmineRoute>

            <AdmineRoute path="/usersList" exact component={UsersListScreen} ></AdmineRoute>

            <Route path="/orders/:id" component={OrderScreen} />

            <Route path="/register" component={RegisterScreen} />

            <Route path="/signin" component={signinScreen} />

            <Route path="/cart/:id?" exact={false} component={CartScreen} />

            <Route path="/Products/image/:id" exact component={ImageScreen} />

            <Route path="/orderHistory" component={OrderHistoryScreen} />

            <Route path="/Products" exact component={ProductaddScreen} />

            <Route path="/seller" exact component={SellerScreen} />

            <Route path="/paymentScreen"  component={PaymentScreen} />

            <AdmineRoute path="/dashboard" exact component={DashboardScreen}></AdmineRoute>

            <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>



           

          </div>
        </main>
        <footer className="footer">
          all rights reserved
        </footer>
      </div>
      </BrowserRouter>
      )
}


export default App;
