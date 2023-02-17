import React, { useState, useEffect } from "react";
import { Link, useParams, NavLink } from 'react-router-dom'
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "./styles/product-detail.css";

export default function ProductDetail() {
const params = useParams();
const [product, setProduct] = useState([]);
const [product_images, setProductImages] = useState([]);
const [relatedProducts, setRelatedProducts] = useState([]);
const productID = params.id;

    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/api/v1/products/${productID}`)
            .then(res => {
                setProduct(res.data);
                setProductImages(res.data.images);

                axios.get(`http://localhost:5000/api/v1/products/get/product_category/${res.data.category._id}`)
                .then(res => setRelatedProducts(res.data))
                .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
            });
            
        } catch (err) { console.log(err); }
        
    }, [productID]);

    // useEffect(() => {
    //     // fetch the related product by category
    //     axios.get(`http://localhost:5000/api/v1/products/get/related-product?category=${productByCategory}`)
    //     .then(res => setRelatedProducts(res.data))
    //     .catch(err => console.log(err));
    // });

    // console.log(productByCategory);

    return (
        <div>
            <section className="shop-details">
                <div className="product__details__pic">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product__details__breadcrumb">
                                    <Link to="/">Home</Link>
                                    <Link to="/shop">Shop</Link>
                                    <span>{product.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                
                            </div>
                            <div className="col-lg-6 col-md-9">
                            
                                {product_images.length === 0 ?
                                    <>
                                        <div className="product__thumb__pic set-bg product-img">
                                            <img src={product.image} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Carousel 
                                            startIndex={0}
                                            showStatus={false} 
                                            showIndicators={false} 
                                            showArrows={false} 
                                            infiniteLoop={true}
                                            autoPlay={true} 
                                            interval={3000}
                                        >
                                            {product_images.map(product_imgs => (
                                                <div className="product__thumb__pic set-bg product-img" key={product_imgs}>
                                                    <img src={product_imgs} />
                                                </div>    
                                            ))}
                                        </Carousel>
                                    </>
                                }
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__details__content">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <div className="product__details__text">
                                    <h4>{product.name}</h4>
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-o" />
                                        <span> - {product.rating} Reviews</span>


                                    </div>
                                    <h3>
                                        {product.salePrice && typeof product.salePrice === 'number'
                                            ? product.salePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                            : 'N/A'
                                        }

                                        <span>
                                            {product.regularPrice && typeof product.regularPrice === 'number'
                                                ? product.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                                : 'N/A'
                                            }
                                        </span>
                                    </h3>

                                    <p>{product.description}</p>

                                    <div className="product__details__cart__option">
                                        <div className="quantity">
                                            <div className="pro-qty">
                                                <input type="text" defaultValue={1} />
                                            </div>
                                        </div>
                                        <a href="#" className="primary-btn">add to cart</a>
                                    </div>

                                    <div className="product__details__btns__option">
                                        <a href="#"><i className="fa fa-heart" /> add to wishlist</a>
                                    </div>
                                    
                                    <div className="product__details__last__option">
                                        <h5><span>Guaranteed Safe Checkout</span></h5>
                                        <img src="img/shop-details/details-payment.png"   />
                                        <ul>
                                            <li><span>SKU:</span> {product.sku}</li>
                                            <li>
                                                <span>
                                                    Categories: 
                                                </span> 
                                                <span className="ms-1">
                                                    {(product && product.category) ? product.category.name : ""}
                                                </span>
                                            
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product__details__tab">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Customer
                                                Previews(5)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Additional
                                                information</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="tabs-5" role="tabpanel">
                                            <div className="product__details__tab__content">
                                                <p className="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                    solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                                    ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                                    pharetras loremos.</p>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="tabs-6" role="tabpanel">
                                            <div className="product__details__tab__content">
                                                <div className="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="tabs-7" role="tabpanel">
                                            <div className="product__details__tab__content">
                                                <p className="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                                    solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                                    ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                                    pharetras loremos.</p>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p>
                                                </div>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                                        from synthetic materials, not natural like wool. Polyester suits become
                                                        creased easily and are known for not being breathable. Polyester suits
                                                        tend to have a shine to them compared to wool and cotton suits, this can
                                                        make the suit look cheap. The texture of velvet is luxurious and
                                                        breathable. Velvet is a great choice for dinner party jacket and can be
                                                        worn all year round.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="related spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3 className="related-title">Related Product</h3>
                        </div>
                    </div>
                    <div className="row">
                        {relatedProducts.map((product) => (

                       
                            <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6" >
                                <div className="product__item" key={product._id}>
                                    <div className="product__item__pic set-bg" style={{backgroundImage : `url(${product.image})`}}>

                                        {product.salePrice ? <p className="label text-light bg-dark float-start">sales</p> : " " }
                                        {product.countInStock >= 0 && product.countInStock <= 20 ?  <p className="float-end text-light bg-danger fw-bold remaining">Remaining: {product.countInStock}</p> : " " }
                                        
                                        <ul className="product__hover">
                                            <li><a href="#"><i className="far fa-heart"></i></a></li>
                                            <li><Link to={`/shop/product_detail/${product._id}`}><i className="fas fa-search"></i></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6>{product.name}</h6>
                                        <a href="#" className="add-cart">+ Add To Cart</a>
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
                                                    ${product.salePrice ? product.salePrice.toFixed(2) : 'N/A' }
                                                    <span>${product.regularPrice ? product.regularPrice.toFixed(2) : 'N/A' }</span>
                                                </>
                                                :
                                                <> ${product.regularPrice ? product.regularPrice.toFixed(2) : 'N/A' } </>
                                            }
                                        </h5>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}