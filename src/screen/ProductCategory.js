import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import Sidebar from '../components/Sidebar';
import './styles/paginate.css';
import Pagination from '../components/Pagination';

export default function ProductCategory(){
   
    const [products, setProducts]= useState([]);
    
    // pagination properties
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prev = () => { setCurrentPage (currentPage - 1)};
    const next = () => { setCurrentPage (currentPage + 1)};

    const params = useParams();
    const categoryId = params.id;

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:5000/api/v1/products/get/product_category/${categoryId}`)
            .then(res=> setProducts(res.data))
            .catch(err => console.log(err))
        }, 10);
    });

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(token) : "";
    const userId = user ? user.user.id : "";
   
    const handleAddToCart = async (productId, proQty) => {
        try {

            // get the product data by product id
            const productResponse = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
            const subStractCountInStock = productResponse.data;

            // substract the countInStock of product by 1
            subStractCountInStock.countInStock -= proQty;

            // get all the data of cart item by each user id
            const response = await axios.get(`http://localhost:5000/api/v1/shoppingcarts/cart-item/${userId}`);
            const items = response.data;

            // check the exist cart item that is already exist
            const existCartItem = items.find(item => item.product._id === productId);
            if(existCartItem){
                existCartItem.quantity += proQty;
                await axios.put(`http://localhost:5000/api/v1/shoppingcarts/update-cart/${existCartItem._id}`, {
                    quantity: existCartItem.quantity
                });

                // implement the update of substract count_in_stock
                await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
            }
            else{
                await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                    user: userId,
                    product: productId,
                    instance: 'cart',
                    quantity: proQty
                
                });

                // implement the update of substract count_in_stock
                await axios.put(`http://localhost:5000/api/v1/products/update_count_in_stock/${productId}`, subStractCountInStock);
            }

            setCart(response.data);
            return cart;
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddToWishlist = async (productId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                user: userId,
                product: productId,
                instance: 'wishlist'
            });

            setWishlist({...wishlist, [productId]: response.data });
            return response;
        } catch (err) {
            console.log(err)
        }
    }
    
    return(
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="breadcrumb__text">
                        <h4>Shop</h4>
                        <div className="breadcrumb__links">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                        <span>{products && products.name ? products.name : ""}</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="shop spad">
                {/* start shop page */}
                <div className="container">
                    <div className="row">
                        {/* start sidebar */}
                        <Sidebar/>
                        {/* end sidebar */}
                        <div className="col-lg-9">
                        <div className="shop__product__option">
                            <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="shop__product__option__left">
                                <p>Showing {itemPerPage}–{currentPage} of 126 results</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="shop__product__option__right">
                                <p>Sort by Price:</p>
                                <select>
                                    <option value>Low To High</option>
                                    <option value>$0 - $55</option>
                                    <option value>$55 - $100</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* start products */}
                        <div className="row">
                        {currentItems.map((product)=> (
                       
                            <div key={product._id} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                             
                                    <div className="product__item__pic set-bg" style={{backgroundImage : `url(${product.image})`}}>

                                        {product.salePrice ? <span className="label text-light bg-dark">sales</span> : " " }
                                        {product.countInStock >= 0 && product.countInStock <= 20 ?  <p className="float-end text-light bg-danger fw-bold remaining">Remaining: {product.countInStock}</p> : " " }
                                        
                                        <ul className="product__hover">
                                            <li>
                                                <a href="#" onClick={() => handleAddToWishlist(product._id)}>
                                                    {wishlist[product._id] ? <i className="far fa-heart text-danger"></i> : <i className="far fa-heart"></i>}
                                                </a>
                                            </li>
                                            <li><Link to={`/shop/product_detail/${product._id}`}><i className="fas fa-search"></i></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                    <h6>{product.name}</h6>
                                    <a href="#" className={ product.countInStock === 0 ? 'disabled': 'add-cart'} onClick={() => handleAddToCart(product._id, 1)}>
                                        { product.countInStock === 0 ? 'Add To Cart is not available': '+ Add To Cart'}
                                    </a>
                                    <div className="rating">
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                    </div>
                                    <h5>
                                        {product.salePrice ?
                                            <>
                                                ${product.salePrice  ? product.salePrice.toFixed(2) : 'N/A' }
                                                <span>${product.regularPrice ? product.regularPrice.toFixed(2) : 'N/A' }</span>
                                            </>
                                            :
                                            <> ${product.regularPrice ? product.regularPrice.toFixed(2) : 'N/A' } </>
                                        }
                                        
                                    </h5>
                                    <div className="product__color__select">
                                        <label htmlFor="pc-4">
                                        <input type="radio" id="pc-4" />
                                        </label>
                                        <label className="active black" htmlFor="pc-5">
                                        <input type="radio" id="pc-5" />
                                        </label>
                                        <label className="grey" htmlFor="pc-6">
                                        <input type="radio" id="pc-6" />
                                        </label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                        {/* end products */}

                        {/* start pagination */}
                        <div className="row">
                            <div className="col-lg-12">
                                {
                                    products.length > itemPerPage 
                                        ? (<div>
                                            <Pagination
                                              itemsPerPage={itemPerPage }
                                              totalItems={products.length}
                                              paginate={paginate}
                                              currentPage={currentPage}
                                              prev={prev}
                                              next={next}
                                            />
                                          </div>
                                        ) : ("")
                                }
                                
                            </div>
                        </div>
                        {/* end pagination */}
                        </div>
                    </div>
                </div>
                {/* end shop page */}
            </section>
        </div>
   
    )
}