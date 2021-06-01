import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { imageProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function ImageScreen(props) {

    const dispatch = useDispatch()

    const productImage = useSelector(state => state.productImage)

    const {image ,loading , error} = productImage;
    console.log(image);
    const id = props.match.params.id

    useEffect(() => {
        
        dispatch(imageProduct(id))
        
    }, [dispatch, id ])
        
    

    function imageSrc(image){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }


    return (


        <div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox varient="dager" >{error.message}</MessageBox>}
            <img src={ `http://localhost:3000/Products/${props.match.params.id}` } alt=""/>
            <img src={ `data:${image.contentType};base64,${imageSrc(image)}` } alt=""/>
        </div>
    )
}
