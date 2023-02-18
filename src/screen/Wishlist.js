import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Wishlist() {

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [wishlistItems, setWishlistItem] = useState([]);
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(token) : "";
    const userId = user ? user.user.id : "";

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/shoppingcarts/wishlist-item/${userId}`)
        .then(res => setWishlistItem(res.data))
        .catch(err => console.log(err));
    }, [wishlistItems]);

    // move wishlist item to shopping carts
    const handleMoveToCart = async (productId, proQty) => {
        try {
            const moveToCart = await axios.put(`http://localhost:5000/api/v1/shoppingcarts/move-to-cart/${productId}`, {
                user: userId,
                product: productId,
                instance: 'cart',
                quantity: proQty
            });
            setCart(moveToCart.data);
            return cart;
        } catch (err) { console.log(err) }
        
    }

    // remove wishlist item from wishlist page
    const handleRemoveFromWishlist = async (productId) => {
        try {
            const removeWishlsitItem = await axios.delete(`http://localhost:5000/api/v1/shoppingcarts/remove/wishlist-item/${productId}`, cart);
            setWishlist(removeWishlsitItem.data);
        } catch (err) { console.log(err) }
        return wishlist;
    }


    return (
        <div>
            <section className="breadcrumb-option mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Wishlist</h4>
                                <div className="breadcrumb__links">
                                    <Link to="/">Home</Link>
                                    <Link to="/shop">Shop</Link>
                                    <span>Wishlist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product spad" style={{ marginTop: "90px" }}>
                <div className="container">

                    <div className="row product__filter">

                        {wishlistItems.length === 0 ?
                        
                            <>
                                <div className="col-lg-12 text-center">
                                    <h1>Wishlist is empty...</h1>
                                    <p>Please go to shop and Add product</p>
                                    <Link to="/shop" className="btn btn-success btn-sm px-4 py-2 fw-bold text-center">Shop Now <i class="fas fa-shopping-cart ms-1"></i></Link>
                                </div>
                            </>
                            :
                            <>
                                {wishlistItems.map(wishlistItem =>
                                    <div key={wishlistItem.id} className="col-lg-3 col-md-6 col-6 mb-3">
                                        <div className="product__item">
                                            <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${wishlistItem.product.image})` }}>

                                                {wishlistItem.product.salePrice?
                                                    <>
                                                        <span className="label text-light bg-dark">sales</span>
                                                    </>
                                                    :""
                                                }

                                                <ul className="product__hover">
                                                    <li><a href="#" onClick={() => handleRemoveFromWishlist(wishlistItem.id)}><img src="img/icon/trash-bin.png" /></a></li>
                                                    <li><Link to={`/shop/product_detail/${wishlistItem.product.id}`}><img src="img/icon/search.png"   /></Link></li>
                                                </ul>
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{wishlistItem.product.name}</h6>
                                                <a href="#" className="add-cart" onClick={() => handleMoveToCart(wishlistItem.id, 1)}>Move To Cart <i className="fas fa-shopping-cart ms-3"></i> </a>
                                                <div className="rating">
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                    <i className="fa fa-star-o" />
                                                </div>
                                                <h5>
                                                    {wishlistItem.product.salePrice ?
                                                        <>
                                                            {wishlistItem.product.salePrice && typeof wishlistItem.product.salePrice === 'number'
                                                                ? wishlistItem.product.salePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                                : 'N/A'
                                                            }

                                                            <span>{wishlistItem.product.regularPrice && typeof wishlistItem.product.regularPrice === 'number'
                                                                ? wishlistItem.product.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                                : 'N/A'
                                                            }
                                                            </span>
                                                        </>
                                                        :
                                                        <>
                                                            {wishlistItem.product.regularPrice && typeof wishlistItem.product.regularPrice === 'number'
                                                                ? wishlistItem.product.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                                : 'N/A'
                                                            }
                                                        </>
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
                                )}
                            </>

                        }

                        
                    </div>

                </div>
            </section>
        </div>
    )
}

