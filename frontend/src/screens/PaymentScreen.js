import React from 'react'

export default function PaymentScreen(props) {

    function loadScript(src){
        return new Promise((resolve)=>{
            const script = document.createElement('script')
            script.src = src
            document.body.appendChild(script) 
            script.onload =()=>{
                resolve(true)
            }
            script.onerror=()=>{
                resolve(false)
            }
            
        })
       
    }



     async function displayHandler(){
         const orderId= "608f8bc2399a7051ec7ece37"
        
        const res =  await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert("are you online...")
        }
        const key_id='rzp_test_4wdLrJPfx6m2NE'

        const data = await fetch(`http://localhost:5000/api/razorpay/order/${orderId}`,{ method :'GET' }).then((t)=>t.json())

        console.log(data)




        const options = {
            "key":key_id, // Enter the Key ID generated from the Dashboard
            "amount": 10000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": 'userInfo.name',
            "description": "Test Transaction",
            "order_id": (data.id).toString(), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name":"smfois"
            },
            
            "theme": {
                "color": "#3399cc"
            }
        };
      
        var rzp1 = new window.Razorpay(options); 
        rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    }); 
    }
    return (
        <div>
            <button onClick={displayHandler}>pay</button>
        </div>
    )
}
