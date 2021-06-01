import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { userAdminInfo } from '../../actions/adminActions';

export default function LineUsersChart() {

   


    const userAdminDetailsInfo = useSelector(state => state.userAdminDetailsInfo)

    const {userInfo}  =userAdminDetailsInfo;

    const dispatch = useDispatch()
    

   const userMapPresent=(userInfo ,year)=>{  return(userInfo.map(created =>(
           
       created.createdAt
   )
   ))}
   const userpresentmap=userMapPresent(userInfo )

    
  
   
    

    useEffect(() => {

        dispatch(userAdminInfo())
        
    }, [dispatch])


    const data = {
        labels: [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [
            {
                label: 'ORSERS IN 2021( M )',

                data: [0 ,1 ,4 ,10 ,7, 44 ,32 ,45 ,12 , 22 ,56 ,34],

                backgroundColor: ['rgba(246, 36, 89, .2)'],

                borderColor: [' rgba(20,200,280,.4)'],

                pointBackgroundColor: 'rgba(20,200,60,.7)',

                ppointBorderColor: 'rgba(200,200,280,.4)',

            },
            {
                label: 'ORSERS IN 2020( M )',
                data: [1, 6, 10, 2, 5, 8, 7, 4, 6, 9, 6, 9],
                backgroundColor: ['rgba(155,200,100,.7)'],
                borderColor: [' rgba(20,00,280,.4)'],
                pointBackgroundColor: 'rgba(2,20,60,.7)',
                ppointBorderColor: 'rgba(200,200,20,.4)',
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Line Chart'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 150,
                    stepSize: 5
                }
            }]
        }
    }

    return (
        <div>
            <Line data={data} options={options} />
            <div>{userInfo.map(maping=>(
                    <div>{maping.createdAt.substring(5 ,7)==="03"&&"yes"} </div>))}
                  
                    <div>{userpresentmap}</div>
                </div>
        </div>
    )
}
