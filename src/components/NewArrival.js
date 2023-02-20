import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function NewArrival () {
    const [products, setProducts]= useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/products/get/new_arrival_product")
        .then(res=> setProducts(res.data) )
        .catch(err => console.log(err) )
    }, []);

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(token) : "";
    const userId = user ? user.user.id : "";

    const handleAddToCart = async (productId, proQty) => {
        try {

            const productResponse = await axios.get(`http://localhost:5000/api/product/${productId}`);
            const subStractCountInStock = productResponse.data;
            subStractCountInStock.countInStock -= proQty;

            // get all the data of cart item by each user id
            const response = await axios.get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`);
            const items = response.data;

            // check the exist cart item that is already exist
            const existCartItem = items.find((item) => item.product._id === productId);
            if(existCartItem){
                existCartItem.quantity += proQty;
                await axios.put(`http://localhost:5000/api/v1/shoppingcarts/update-cart/${existCartItem._id}`, { quantity: existCartItem.quantity });

                // implement the subStraction of Product Count In Stock
                await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
            }
            else{
                await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                    user: userId,
                    product: productId,
                    instance: 'cart',
                    quantity: proQty
                });

                // implement the subStraction of Product Count In Stock
                await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
            }

            setCart(response.data);
            return cart;
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddToWishlist = async (productId, qty) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                user: userId,
                product: productId,
                instance: 'wishlist',
                quantity: qty
            });

            setWishlist({...wishlist, [productId]: response.data });
            return response;
        } catch (err) {
            console.log(err)
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    return(
    <section className="product spad">
      <div className="container">
        <div className="row mb-5">
                <div className="col-12 text-center mb-5">
                    <h2 className="fw-bold fs-1">New Arrival Products</h2>
                </div>
            </div>
        <div className="row product__filter">
        {products.map(product=>
            <div key={product.id} className="col-lg-3 col-md-6 col-6">
                <div className="product__item">
                    <div className="product__item__pic set-bg" style={{backgroundImage : `url(${product.image})`}}>
                    <p className="label bg-dark text-light">New</p>
                    
                        <ul className="product__hover">
                            <li>
                                <a href="#" onClick={() => handleAddToWishlist(product.id, 0)}>
                                    {wishlist[product.id] ? <img src="img/icon/red-heart.png"   /> : <img src="img/icon/heart.png"   />}
                                </a>
                            </li>
                            <li><Link to={`/shop/product_detail/${product.id}`}  onClick={scrollToTop}><img src="img/icon/search.png"   /></Link></li>
                            
                        </ul>
                    </div>
                    <div className="product__item__text">
                    <h6>{product.name}</h6>
                    <a href="#" className="add-cart" onClick={() => handleAddToCart(product.id, 1)}>+ Add To Cart</a>
                    <div className="rating">
                        {product.rating ? 
                            <>
                                <i className="fa fa-star star-rating" />
                                <i className="fa fa-star star-rating" />
                                <i className="fa fa-star star-rating" />
                                <i className="fa fa-star star-rating" />
                                <i className="fa fa-star star-rating" />
                            </>
                            :
                            <>
                                <i className="fa fa-star-o" />
                                <i className="fa fa-star-o" />
                                <i className="fa fa-star-o" />
                                <i className="fa fa-star-o" />
                                <i className="fa fa-star-o" />
                            </>
                        }
                    </div>
                    <h5>${product.regularPrice.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
    )
}
