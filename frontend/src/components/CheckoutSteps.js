import React from 'react';

function CheckoutSteps(props) {
    return <div className="checkoutsteps">
            <div className={props.step1?"active":""}>Signin </div>
            <div className={props.step2?"active":""}> Shipping </div>
            <div className={props.step3?"active":""}> Payment </div>
            <div className={props.step4?"active":""}>Place Order</div>
            
    </div>
}

export {CheckoutSteps};