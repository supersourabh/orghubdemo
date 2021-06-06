import React, { useEffect, useState } from 'react'
import BarChart from '../components/charts/BarChart'
import DoughnutChart from '../components/charts/DoughnutChart'
import LineUsersChart from '../components/charts/LineUsersChart'
import LineSellersChart from '../components/charts/LineSellersChart'
import DoughnutCatagoryChart from '../components/charts/DoughnutCatagoryChart'
import { adsAction, adsCreateAction, adsDeleteAction } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import {Button} from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Delete from '../icons/Delete'

export default function DashboardScreen(props) {

    const [userChart, setUserChart] = useState(false)
    const [sellerChart, setSellerChart] = useState(false)
    const [productChart, setProductChart] = useState(false)
    const [ordersChart, setOrdersChart] = useState(false)
    const [catagory, setCatagory] = useState(false)
    const [ads, setAds] = useState(false)
    const [name, setName] = useState()
    const [discription, setDiscription] = useState()
    const [file, setFile] = useState()
    const [adsOpen, setAdsOpen] = useState(false)

    const adsCreate = useSelector(state => state.adsCreate)

    const {loading , error , success} = adsCreate;

    const adsServe = useSelector(state => state.adsServe)

    const{loading:loadingAds , error:errorAds ,adsProducts}=adsServe;

    const adsDelete = useSelector(state => state.adsDelete)

    const {success:successDelete , loading:loadingDelete , error:errorDelete}=adsDelete;

    const dispatch = useDispatch()  

    useEffect(() => {

        setUserChart(true)
     
    }, [adsOpen, dispatch, success, successDelete])

    function image(ads){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(ads.media.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    



    const formData = new FormData()
    formData.append("name" , name)
    formData.append("discription" , discription)
    formData.append("file" , file)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(adsCreateAction(formData))
    }

    const usersDataChart =()=>{

    
        setUserChart(true)
        setAds(false)
        setSellerChart(false)
        setProductChart(false)
        setOrdersChart(false)
        setCatagory(false)
        
        
        
    }
    const sellersDataChart =()=>{

        setSellerChart(true)
        setUserChart(false)
        setProductChart(false)
        setOrdersChart(false)
        setCatagory(false)
        
        
    }
    const productsDataChart =()=>{
        setProductChart(true)
        
        setUserChart(false)
        setSellerChart(false)
        setOrdersChart(false)
        setCatagory(false)
        setAds(false)

        
    }
    const ordersDataChart =()=>{
        setOrdersChart(true)
        setUserChart(false)
        setSellerChart(false)
        setProductChart(false)
        setCatagory(false)
        setAds(false)
        
        
        
    }
    
    const catagoryDataChart =()=>{
        setCatagory(true)
        setOrdersChart(false)
        setUserChart(false)
        setSellerChart(false)
        setProductChart(false)
        setAds(false)

    }
    const adsHandler =()=>{
        setCatagory(false)
        setOrdersChart(false)
        setUserChart(false)
        setSellerChart(false)
        setProductChart(false)
        setAds(true)
        dispatch(adsAction())
     
    }
    const adsOpenHandler =(e)=>{
        e.preventDefault()
        setAdsOpen(!adsOpen)
        
    }
    const adsDeleteHandler =(id)=>{

        dispatch(adsDeleteAction(id))
        successDelete && dispatch(adsAction())

    }

    

    return (
        <div className="dashboard">
            <div className='navigation'>
                <ul>
                    <h1> OrgHub-Details</h1>
                    
                       
                    <li>
                        <button  onClick={usersDataChart} >Users </button>
                    </li>
                    
                   
                    <li>
                        <button  onClick={sellersDataChart} >Sellers </button>
                    </li>
                   
                    
                    <li>
                        <button  onClick={productsDataChart} >Products </button>
                    </li>
                    
                    
                    <li>
                        <button  onClick={ordersDataChart} >Orders </button>
                    </li>
                    <li>
                        <button  onClick={catagoryDataChart} >Catagory-distribution </button>
                    </li>
                    <li>
                        <button  onClick={adsHandler} >Ads Mentainence</button>
                    </li>
                    
                   
                </ul>
            </div>
            <div className='charts'>
                {
                    userChart ?
                    <LineUsersChart/>:''
                }
            
                {
                    sellerChart ?
                  <LineSellersChart/>:""
                }
            
                {
                    productChart ?
                    <DoughnutChart/> :''
                }
            
                {
                    ordersChart ?
                    <BarChart/>:''
                }
                {
                    catagory?
                   < DoughnutCatagoryChart/>:''
                }
            {
                ads ?
                <div className="ads">

                    <div className="button-open">

                        <button type="button" className="btn btn-info" onClick={(e)=>adsOpenHandler(e)}>Upload Ads</button> 


                    </div>

                
                {
                    adsOpen ?
                    <div className="adsForm">


                    <form onSubmit={submitHandler} method="POST" >

                        <ul>
                            <li>
                                <h1>Adds Create</h1>

                            </li>
                            {<li>
                                {

                                loading? <LoadingBox/>:
                                error ? <MessageBox varient="danger">{error}</MessageBox>:
                                success&&<MessageBox varient="success">Ads create success</MessageBox>
                                }
                            </li>}

                            
                            <li>
                                <label htmlFor="name">
                                    Name  :
                                </label>
                                <input type="text" name="name"  onChange={(e)=>setName(e.target.value)} required placeholder="Enter Name of Ads-product"></input>
                            </li>
                            <li>
                                <label htmlFor="discription">
                                    Discription  :
                                </label>
                                <input type="text" name="discription"  onChange={(e)=>setDiscription(e.target.value)} required placeholder="Enter Discription of Ads-product"></input>
                            </li>
                        
                            <li>
                                <label htmlFor="file">
                                    Media  :
                                </label>
                                <input type="file" name="file" onChange={(e)=>setFile(e.target.files[0])} required placeholder="Enter media file"></input>
                            </li>
                            <li>
                                <Button as="input" type="submit" value="Submit" />
                            </li>
                        </ul>

                    </form>

                    </div>
                    :"" 
                }
                {
                loadingAds ?<LoadingBox></LoadingBox>:
                errorAds || errorDelete ?<MessageBox varient="danger">{error?error:errorDelete}</MessageBox>:
                adsProducts.map(ads =>
                            
                            <div className="mainAds" >

                                <div className="infoAds" >

                                    <h4>Name : <b style={{color:"#fff"}}>{ads.name}</b></h4>

                                    <h4>Discription : <p style={{color : "#fff"}}>{ads.discription}</p></h4>

                                    <button type="button" className="btn btn-danger" style={{backgroundColor:"#faf" ,width : "35%"}} onClick={(e)=>adsDeleteHandler(ads._id)}> <Delete/></button> 

                                </div>
                                <div className="mediaAds">
                                    {
                                        ads.media.contentType==="image/jpeg"? 
                                        <img src={`data:${ads.media.contentType};base64,${image(ads)}`} alt='ads'/>:
                                        <video width="auto" height="150" controls >
                                            <source src={`data:${ads.media.contentType};base64,${image(ads)}`} type="video/mp4"/>
                                        </video> 
                                    
                                    }

                                </div>

                            </div>
                        ) 
                        
                }
                
                </div>
                
                :""}
              

            </div>
            
            
        </div>
    )
}


