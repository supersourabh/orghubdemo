import bcrypt from 'bcryptjs'

export default {
    users :[
        {
            name :"sourabh",
            email :"skkotagi111@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin :true ,
            seller : true
            
        },
        {
            name :"sourabh kotagi",
            email :"skkotagi123@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin :true ,
            seller : false
            
        }
    ],
    products:[
        {
    
        name      :'tomato1',
        image     :'/images/tomato.jpg',
        breed     :'jakpot',
        catagory : 'jawar',
        price     :'10',
        stars     :4.5,
        reviews   :120,
        countInStock:8

    },
    {
     
        name      :'tomato2',
        image     :'/images/tomato.jpg',
        breed     :'jakpot',
        catagory : 'jawar',
        price     :'10',
        stars     :3.5,
        reviews   :190,
        countInStock:6
    },
    {
       
        name      :'bengan',
        image     :'/images/tomato.jpg',
        breed     :'jakpot',
        catagory : 'jawar',
        price     :'10',
        stars     :2.5,
        reviews   :12045,
        countInStock:5

    },
    {
    
        name      :'papaya',
        image     :'/images/tomato.jpg',
        breed     :'jakpot',
        catagory : 'jawar',
        price     :'10',
        stars     :5.0,
        reviews   :110,
        countInStock:100

    }

    ]
}