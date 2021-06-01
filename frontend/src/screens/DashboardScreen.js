import React, { useEffect, useState } from 'react'
import BarChart from '../components/charts/BarChart'
import DoughnutChart from '../components/charts/DoughnutChart'
import LineUsersChart from '../components/charts/LineUsersChart'
import LineSellersChart from '../components/charts/LineSellersChart'
import DoughnutCatagoryChart from '../components/charts/DoughnutCatagoryChart'

export default function DashboardScreen(props) {

    const [userChart, setUserChart] = useState()
    const [sellerChart, setSellerChart] = useState()
    const [productChart, setProductChart] = useState()
    const [ordersChart, setOrdersChart] = useState()
    const [catagory, setCatagory] = useState()



    useEffect(() => {

        setUserChart(true)
        setSellerChart(false)
        setProductChart(false)
        setOrdersChart(false)
        setCatagory(false)
        
    }, [])
    const usersDataChart =()=>{

    
        setUserChart(true)

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
        
        
    }
    const ordersDataChart =()=>{
        setOrdersChart(true)
        setUserChart(false)
        setSellerChart(false)
        setProductChart(false)
        setCatagory(false)
        
        
        
    }
    
    const catagoryDataChart =()=>{
        setCatagory(true)
        setOrdersChart(false)
        setUserChart(false)
        setSellerChart(false)
        setProductChart(false)
     
        
        
        
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
            
              

            </div>
            
        </div>
    )
}


