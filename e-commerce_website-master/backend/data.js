
import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          name: 'divya',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products: [
        {  // _id:"1",
            name:"slim shirt",
            slug: 'nike1-shirt',
            category:"shirts",
            image:"/images/p1.jpg",
            countInstock: 12,
            brand:"Nike",
            rating:4.5,
            numReviews:10,
            description:"high quality product",
            price:14

        },
        
        {   //_id:"3",
            name:"Adidas slim pant",
            slug: 'adidas-slim-pant',
            category:"shirts",
            image:"/images/p3.jpg",
            countInstock: 12,
            brand:"Adidas",
            rating:4.5,
            numReviews:10,
            description:"high quality product",
            price:18

        },
    ]
}
export default data;