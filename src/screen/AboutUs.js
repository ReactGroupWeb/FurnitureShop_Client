import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function AboutUs(){

    const [userAdmin, setUserAdmin] = useState([]);
    const [userClient, setUserClient] = useState(0);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axios.all([
            axios.get('http://localhost:5000/api/v1/users/get/user-admin'),
            axios.get('http://localhost:5000/api/v1/users/get/count'),
            axios.get('http://localhost:5000/api/v1/categories/get/category-count')
        ])
        .then(axios.spread((userAdminResponse, userClientResponse, categoriesResponse) => {
            setUserAdmin(userAdminResponse.data);
            setUserClient(userClientResponse.data);
            setCategories(categoriesResponse.data);
        }))
        .catch(err => console.log(err));
    }, [setUserAdmin, setUserClient, setCategories]);

    return(
        <div>
            {/* BreaadCrumb */}
            <section className="breadcrumb-option">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="breadcrumb__text">
                        <h4>About Us</h4>
                        <div className="breadcrumb__links">
                        <Link to="/">Home</Link>
                        <span>About Us</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <section className="about spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="about__pic">
                        <img src="img/about/about-banner.jpg"   />
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about__item">
                        <h4>Who We Are ?</h4>
                        <p>Contextual advertising programs sometimes have strict policies that need to be adhered too.
                        Let’s take Google as an example.</p>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about__item">
                        <h4>Who We Do ?</h4>
                        <p>In this digital generation where information can be easily obtained within seconds, business
                        cards still have retained their importance.</p>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about__item">
                        <h4>Why Choose Us</h4>
                        <p>A two or three storey house is the ideal way to maximise the piece of earth on which our home
                        sits, but for older or infirm people.</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="testimonial">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 p-0">
                    <div className="testimonial__text">
                        <span className="icon_quotations" />
                        <p>“I've just discovered Film and Furniture and am obsessed ! Such a brilliant idea and really , really wonderfully done . It's going to be a regular in my internet browsing activities ... !”
                        </p>
                        <div className="testimonial__author">
                        <div className="testimonial__author__pic">
                            <img src="https://i.pinimg.com/564x/73/f1/79/73f179719a2f9e414adfc203240905d6.jpg"   />
                        </div>
                        <div className="testimonial__author__text">
                            <h5>Christopher Lee</h5>
                            <p>Civil Enginnering</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 p-0">
                    <div className="testimonial__pic set-bg" style={{backgroundImage : `url(https://i.pinimg.com/564x/73/f1/79/73f179719a2f9e414adfc203240905d6.jpg)`}}/>
                    </div>
                </div>
                </div>
            </section>
            <section className="counter spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                        <h2 className="cn_num">{userClient.userCount}</h2>
                        </div>
                        <span>Our <br />Clients</span>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                        <h2 className="cn_num">{categories.countCategory}</h2>
                        </div>
                        <span>Total <br />Categories</span>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                        <h2 className="cn_num">1</h2>
                        </div>
                        <span>In <br />Country</span>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                        <h2 className="cn_num">98</h2>
                        <strong>%</strong>
                        </div>
                        <span>Happy <br />Customer</span>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="team spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="section-title">
                        <span>Our Team</span>
                        <h2>Meet Our Team</h2>
                    </div>
                    </div>
                </div>
                <div className="row">

                    {userAdmin.map((user) => (
                        <div className="col-lg-3 col-md-6 col-sm-6" key={user._id}>
                            <Card style={{ border: "none" }}>
                                <Card.Img src={user.image} style={{ height: "360px", objectFit: "cover", maxHeight: "360px" }} />
                                <Card.Body className="text-start px-0 py-4">
                                    <Card.Title as="h4" style={{ color: "#111111 !important", fontWeight: "700" }} > {user.name}</Card.Title>
                                    <Card.Text>{user.isAdmin === true ? "Admin": ""}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                </div>
            </section>
            <section className="clients spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="section-title">
                        <span>Partner</span>
                        <h2>Happy Clients</h2>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-1.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-2.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-3.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-4.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-5.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-6.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-7.png"   /></a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" className="client__item"><img src="img/clients/client-8.png"   /></a>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}