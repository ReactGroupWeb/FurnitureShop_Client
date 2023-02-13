import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import "./style/hot_product.css";


export default function HotSaleProduct() {

    const [hot_products, setHotSaleProduct] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/products/get/hot_sale_product`)
            .then(res => {
                // console.log(res);
                setHotSaleProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : "";
  const userId = user ? user.user.id : "";

  console.log(userId);
  
  const handleAddToCart = async (productId, proQty) => {
      try {

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
          }
          else{
              await axios.post('http://localhost:5000/api/v1/shoppingcarts/add-cart-item', {
                  user: userId,
                  product: productId,
                  instance: 'cart',
                  quantity: proQty
              
              });
          }

          setCart(response.data);
          return response;
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

    return (

        <section className="product spad">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="fw-bold fs-1">Hot Sales Product</h2>
                    </div>
                </div>
                <div className="row product__filter">

                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={true}
                    infinite={true}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={150}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                    desktop: {
                        breakpoint: {
                        max: 3000,
                        min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                        max: 464,
                        min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                        max: 1024,
                        min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                    }}
                    showDots={true}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >

                    {hot_products.map(hot_product =>
                        <div key={hot_product.id} className="col-lg-12 col-md-6 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${hot_product.image})` }}>

                                    {hot_product.salePrice?
                                        <>
                                            <span className="label text-light bg-dark">sales</span>
                                        </>
                                        :""
                                    }

                                    <ul className="product__hover">
                                        <li>
                                            <a href="#" onClick={() => handleAddToWishlist(hot_product.id)}>
                                                {wishlist[hot_product.id] ? <img src="img/icon/red-heart.png" alt /> : <img src="img/icon/heart.png" alt />}
                                            </a>
                                        </li>
                                        <li><Link to={`/shop/product_detail/${hot_product.id}`}><img src="img/icon/search.png" alt /></Link></li>

                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>{hot_product.name}</h6>
                                    <a href="#" className="add-cart" onClick={() => handleAddToCart(hot_product.id, 1)}>+ Add To Cart</a>
                                    <div className="rating">
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                        <i className="fa fa-star-o" />
                                    </div>
                                    <h5>
                                        {hot_product.salePrice ?
                                            <>
                                                {hot_product.salePrice && typeof hot_product.salePrice === 'number'
                                                    ? hot_product.salePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                    : 'N/A'
                                                }

                                                <span>{hot_product.regularPrice && typeof hot_product.regularPrice === 'number'
                                                    ? hot_product.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                    : 'N/A'
                                                }
                                                </span>
                                            </>
                                            :
                                            <>
                                                {hot_product.regularPrice && typeof hot_product.regularPrice === 'number'
                                                    ? hot_product.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
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

                </Carousel>
                </div>
            </div>
        </section>
    )
}

