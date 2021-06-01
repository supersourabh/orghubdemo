
import React, { useState,useEffect  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Delete from '../icons/Delete';
import Edit from '../icons/Edit';



function ProductaddScreen(props){


    const [modelVisible, setModelVisible] = useState(false);
    const  [id, setId] = useState('');
    const [sellerId, setSellerId] = useState('')
    const  [name, setName] = useState('');
    const  [price, setPrice] = useState('');
    const  [file, setFile] = useState('');
    const  [breed, setBreed] = useState('');
    const  [catagory, setCatagory] = useState('');
    const  [countInStock, setCountInStock] = useState('');
    const  [discription, setDiscription] = useState('');
    
    const productList =useSelector(state=>state.productList);
    const {loading , error ,products} =productList;
    const productSave = useSelector(state=>state.productSave);

    const productDelete = useSelector(state=>state.productDelete);

    const {loading:loadingSave,success:successSave,error:errorSave} = productSave;

    const {loading: loadingDetete,   success: successDetete, error: errorDetete} = productDelete;

    const userSignin = useSelector(state => state.userSignin)

    const {userInfo} =userSignin;


    const dispatch = useDispatch();
   
        
  
    useEffect(() => {
        
        
         dispatch(listProducts());
         setModelVisible(false)
  
    },[dispatch, successSave ,successDetete])


    function imageSrc(product){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(product.image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    

    const openModal =(product)=>{
        setModelVisible(true)
        setName(product.name)
        setPrice(product.price)
        setBreed(product.breed)
        setCatagory(product.catagory)
        setCountInStock(product.countInStock)
        
    }
    const editModal =(product)=>{
        setModelVisible(true)
        setSellerId(userInfo._id)
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
        setBreed(product.breed)
        setCatagory(product.catagory)
        setCountInStock(product.countInStock)
        
    }
    const product={
        
        _id:id ,
        userId:userInfo._id ,
        name ,
        price ,
        file ,
        breed ,
        catagory ,
        countInStock , 
        discription 
    }


    const submitHandler =(e) =>{
        const formData = new FormData();
        formData.append("file" , file)
        formData.append("productId",id)
        formData.append("userId",userInfo._id)
        formData.append("id" ,id)
        formData.append("name" , name)
        formData.append("price" , price)
        formData.append("breed" , breed)
        formData.append("catagory" , catagory)
        formData.append("countInStock" ,countInStock)
        console.log(formData)
        e.preventDefault();
        
        dispatch(saveProduct(product,formData));
        
    }
    const deleteHandler =(product)=>{
        dispatch(deleteProduct(product._id));
    }

    
    
  
    return <div className="content content-margined" >
        <div claass ="product-header" >
             
             <h2>Products</h2>
        
        </div>
        {loading && <LoadingBox></LoadingBox> }
        {error &&  <MessageBox varient="danger">{error}</MessageBox> }
        {modelVisible &&
        <div className="form">
        <form onSubmit={submitHandler }  method="POST" encType ="multipart/form-data">
            <ul className="form-container">
                <li>
                    <h2>
                    { id?"Update":"Add-product"}
                    </h2>
                </li>
                <li>
                   
                    {loadingSave && <LoadingBox></LoadingBox> }
                    {errorSave &&  <MessageBox varient="danger">{errorSave}</MessageBox> }
                    {loadingDetete && <LoadingBox></LoadingBox> }
                    {errorDetete &&  <MessageBox varient="danger">{errorDetete}</MessageBox> }
                </li>
                <li>
                    <label htmlFor="Product-Nname">
                        Product-Name :
                    </label>
                    <input type="text" name="Product-Name" id="name" value={name} onChange={(e) =>setName(e.target.value)}>

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
                    <input type="file" name="file" id="file" accept=".jpg"  onChange={(e) =>setFile(e.target.files[0])}>

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
                    <textarea  name="discription" id="discription" value={discription}  onChange={(e) =>setDiscription(e.target.value)}>

                    </textarea>
                </li>
               
                    <button type="submit" className="addProductbutton"> {id? "Update":"Add-Product "}</button>
                    
                    <button type="submit" className="addProductbutton" onClick={()=>setModelVisible(false)}>Back</button>
              

            </ul>
        </form>
    </div>
    }

        <div className="product-list admin">
            <table className='table'>
                <thead>
                    <tr>
                    <th> PRODUCT-ID</th>
                    <th> SELLER-ID</th>
                    <th> NAME</th>
                    <th> PRICE</th>
                    <th> CATAGORY</th>
                    <th> BREED</th>
                    <th> STOCK</th>
                    <th>IMAGE</th>
                    <th> ACTION</th>
                   

                    </tr>
                    
                </thead>
                <tbody>
                {products.map(product=>(
                <tr key={product._id}> 
                     
                        <td>{product._id}</td>
                        <td>{product.sellerId}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.catagory}</td>
                        <td>{product.breed}</td>
                        <td >{product.countInStock}</td>
                        <td className="imgsrc" >
                            <img  src={`data:${product.image.contentType};base64,${imageSrc(product)}`}  alt="" />
                        </td>
                        <td>
                            <button className=" buttonEdit"  onClick={()=>editModal(product)}><Edit/></button>
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

    export default ProductaddScreen;