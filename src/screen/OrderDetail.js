import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function OrderDetail() {
    const style={
        borderBottom: 'none !important'
      }
  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>My Order</h4>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <Link to="/my-dashboard">My Dashboard</Link>
                  <span>My Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb */}

      <section className="shop spad">
        {/* start shop page */}
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <Card style={{ border: "none" }}>
                <Card.Img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnIa4R9Niz9G6xK76UgHM-R4t-C1PwwZSxYw&usqp=CAU"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    maxHeight: "260px",
                  }}
                />
                <Card.Body className="text-start px-0 py-4">
                  <Card.Title
                    as="h6"
                    style={{ color: "#111111 !important", fontWeight: "600" }}
                  >
                    Piqué Biker Jacket
                  </Card.Title>
                  <Card.Title as="h5" className="fw-bold">
                    Price: $67.24
                  </Card.Title>
                  <Card.Text>Amount: 5</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Card style={{ border: "none" }}>
                <Card.Img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62QsigD9JXBUvf6SEVR91hvJkMYmh5WBUBA&usqp=CAU"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    maxHeight: "260px",
                  }}
                />
                <Card.Body className="text-start px-0 py-4">
                  <Card.Title
                    as="h6"
                    style={{ color: "#111111 !important", fontWeight: "600" }}
                  >
                    Piqué Biker Jacket
                  </Card.Title>
                  <Card.Title as="h5" className="fw-bold">
                    Price: $67.24
                  </Card.Title>
                  <Card.Text>Amount: 5</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Card style={{ border: "none" }}>
                <Card.Img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyzqg_rg84JooPLuTuqVWzyhaC-6LGE9-VA&usqp=CAU"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    maxHeight: "260px",
                  }}
                />
                <Card.Body className="text-start px-0 py-4">
                  <Card.Title
                    as="h6"
                    style={{ color: "#111111 !important", fontWeight: "600" }}
                  >
                    Piqué Biker Jacket
                  </Card.Title>
                  <Card.Title as="h5" className="fw-bold">
                    Price: $67.24
                  </Card.Title>
                  <Card.Text>Amount: 5</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <Card style={{ border: "none" }}>
                <Card.Img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxNCw6XgntJuYz4vbDRODMZ1yyUM-H_wu3Ow&usqp=CAU"
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    maxHeight: "260px",
                  }}
                />
                <Card.Body className="text-start px-0 py-4">
                  <Card.Title
                    as="h6"
                    style={{ color: "#111111 !important", fontWeight: "600" }}
                  >
                    Piqué Biker Jacket
                  </Card.Title>
                  <Card.Title as="h5" className="fw-bold">
                    Price: $67.24
                  </Card.Title>
                  <Card.Text>Amount: 5</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        {/* end shop page */}
      </section>

      {/* <section className="checkout spad"> */}
        <div className="container mb-5">
          <div className="checkout__form">
            <form action="#">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="checkout__order">
                    <h4 className="order__title">My order</h4>
                    {/* <div className="checkout__order__products">
                      Product <span>Total</span>
                    </div>
                    <ul className="checkout__total__products">
                      <li>
                        01. Vanilla salted caramel <span>$ 300.0</span>
                      </li>
                      <li>
                        02. German chocolate <span>$ 170.0</span>
                      </li>
                      <li>
                        03. Sweet autumn <span>$ 170.0</span>
                      </li>
                      <li>
                        04. Cluten free mini dozen <span>$ 110.0</span>
                      </li>
                    </ul> */}
                    <table className='table checkout__order__products table-striped'>
                        <thead >
                            <tr>
                                <th colSpan={2}>Product</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Qty</th>
                                <th className='text-center'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            
                                <tr className="checkout__total__products">
                                    <td style={{width: "10px"}}>01.</td>
                                    <td>Piqué Biker Jacket</td>
                                    <td className='text-center'>$50.00</td>
                                    <td className='text-center'>5</td>
                                    <td className='text-center'>$250.00</td>
                                </tr>
                                <tr className="checkout__total__products">
                                    <td style={{width: "10px"}}>02.</td>
                                    <td>Piqué Biker Jacket</td>
                                    <td className='text-center'>$50.00</td>
                                    <td className='text-center'>5</td>
                                    <td className='text-center'>$250.00</td>
                                </tr>
                                <tr className="checkout__total__products">
                                    <td style={{width: "10px"}}>03.</td>
                                    <td>Piqué Biker Jacket</td>
                                    <td className='text-center'>$50.00</td>
                                    <td className='text-center'>5</td>
                                    <td className='text-center'>$250.00</td>
                                </tr>
                    
                            
                        </tbody>
                    </table>
                    <ul className="checkout__total__all" style={style}>
                      <li>
                        Subtotal <span>$750.00</span>
                      </li>
                      <li>
                        Tax <span>$75.00</span>
                      </li>
                      <li>
                        Total <span>$825.00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      {/* </section> */}
    </div>
  );
}
