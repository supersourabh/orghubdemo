import React, { useState,useEffect  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { deleteProduct, saveProduct, sellerProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Delete from '../icons/Delete';
import Edit from '../icons/Edit';



function SellerScreen(props){


    const [modelVisible, setModelVisible] = useState(false);
    const  [id, setId] = useState('');
    const  [name, setName] = useState('');
    const  [price, setPrice] = useState('');
    const  [file, setFile] = useState('');
    const  [breed, setBreed] = useState('');
    const  [catagory, setCatagory] = useState('');
    const  [countInStock, setCountInStock] = useState('');
    const  [discription, setDiscription] = useState('');
    
   
    const productSave = useSelector(state=>state.productSave);

    const productDelete = useSelector(state=>state.productDelete);

    const {loading:loadingSave,success:successSave,error:errorSave} = productSave;

    const {loading: loadingDetete,   success: successDetete, error: errorDetete} = productDelete;

    const sellerProductsList = useSelector(state => state.sellerProductsList)

    const{loading , error , productsList} =sellerProductsList;

    const userSignin = useSelector(state => state.userSignin)

    const{userInfo }= userSignin;

    const dispatch = useDispatch();
   
        
  
    useEffect(() => {
        if(successSave){

            setModelVisible(false);
           
        }
        
         dispatch(sellerProducts(userInfo._id));

  
    },[dispatch, successSave, successDetete, userInfo._id])



    function imageSrc(product){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(product.image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    
 
    const openModal =(product)=>{
        
        setModelVisible(true);
        setName(product.name);
        setPrice(product.price);
        setBreed(product.breed);
        setCatagory(product.catagory);
        setCountInStock(product.countInStock);
        
    }
    const editModal =(product)=>{
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price)
        setBreed(product.breed);
        setCatagory(product.catagory);
        setCountInStock(product.countInStock);
        console.log("edit model")
    }


    const submitHandler =(e) =>{
        const formData = new FormData();
        formData.append("file" , file)
        formData.append("userId" ,userInfo._id)
        formData.append("name" , name)
        formData.append("price" , price)
        formData.append("breed" , breed)
        formData.append("catagory" , catagory)
        formData.append("countInStock" ,countInStock)
        
        
        e.preventDefault();
            
        dispatch(saveProduct({userId:userInfo._id , _id:id  ,name ,price ,file ,breed ,catagory ,countInStock , discription },formData));
        
         }
    const deleteHandler =(product)=>{
        dispatch(deleteProduct(product._id));
    }


  
    
  
    return <div className="content content-margined" >
        <div claass ="product-header" >
             
             <h2>Products</h2>
         
        
        </div>
        <div>
                    {loading && <LoadingBox></LoadingBox> }
                    {error &&  <MessageBox varient="danger">{error}</MessageBox> }
                    {loadingSave && <LoadingBox></LoadingBox> }
                
                    
        </div>
        {
            modelVisible &&
        <div className="form">
        
        <form onSubmit={submitHandler} method="POST" encType ="multipart/form-data" >
            <ul className="form-container">
                <li>
                    <h2>
                    { id?"Update":"Add-product"}
                    </h2>
                </li>
                <li>
                    {errorSave &&  <MessageBox varient="danger">{errorSave}</MessageBox> }
                    {loading?"" :loadingDetete && <LoadingBox></LoadingBox> }
                    {errorDetete &&  <MessageBox varient="danger">{errorDetete}</MessageBox> }

                </li>
              
                <li>
                    <label htmlFor="name">
                        Product-Name :
                    </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) =>setName(e.target.value)}>

                    </input>
                </li>

                <li>
                    <label htmlFor="price">
                        Price/kg :
                    </label>
                    <input type="text" name="price" id="price" value={price} onChange={(e) =>setPrice(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="file">
                        Product-Image (upto 500kb):
                    </label>
                    <input type="file" name="file" id="image"  onChange={(e) =>setFile(e.target.files[0])}>

                    </input>
                </li>
                <li>
                    <label htmlFor="breed">
                        Breed:
                    </label>
                    <input type="text" name="breed" id="breed" value={breed} onChange={(e) =>setBreed(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="catagory">
                        Catagory :
                    </label>
                    <input type="text" name="catagory" id="catagory" value={catagory} onChange={(e) =>setCatagory(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        count in stock :
                    </label>
                    <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) =>setCountInStock(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="discription">
                        Discription :
                    </label>
                    <textarea  name="discription" id="discription" value={discription} onChange={(e) =>setDiscription(e.target.value)}>

                    </textarea>
                </li>
               
                    <button type="submit" className="addProductbutton"> {id? "Update":"Add-Product "}</button>
                    
                    <button type="submit" className="addProductbutton" onClick={()=>setModelVisible(false)}>Back</button>
              

            </ul>
        </form>
    </div>
    }

        <div className="product-list">
            <table className='table'>
                <thead>
                    <tr>
                    <th> ID</th>
                    <th> NAME</th>
                    <th> PRICE</th>
                    <th> CATAGORY</th>
                    <th> BREED</th>
                    <th> STOCK</th>
                    <th> IMAGE</th>
                    <th> ACTION</th>
                   

                    </tr>
                    
                </thead>
                <tbody>
                {
                    productsList.map(product=>(
                <tr key={product._id}> 
                        
                     
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.catagory}</td>
                        <td>{product.breed}</td>
                        <td>{product.countInStock}</td>
                        <td className="imgsrc">
                            <img src={`data:${product.image.contentType};base64,${imageSrc(product)}`} alt = ""/>
                        </td>
                        <td>
                            <button className="buttonEdit" onClick={()=>editModal(product)}><Edit/></button>
                            <button className="buttonDelete" onClick={()=>deleteHandler(product)}><Delete/></button>
                        </td>
                    
                </tr>
                   
                    
            ))
            }
                </tbody>
           
               
            </table>
            <button className=" button" id="addProduct" onClick={()=>openModal({})}>Add-Product</button>
            

        </div>
           
    </div>
    
    
    
    
    
    
    
    
    }

    export default SellerScreen;