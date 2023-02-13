import React from "react";
import "./styles/my-dashboard.css";

export const MyDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="icon-stat first">
                <div className="row">
                  <div className="col-xs-8 text-left">
                    <span className="icon-stat-label">Total Cost</span>
                    <span className="icon-stat-value">
                      $ 0
                    </span>
                  </div>
                  <div className="col-xs-4 text-center">
                    <i className="fa-solid fa-sack-dollar icon-stat-visual bg-warning" />
                  </div>
                </div>
                <div className="icon-stat-footer">
                  <i className="fa-solid fa-clock" /> Updated Now
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="icon-stat second">
                <div className="row">
                  <div className="col-xs-8 text-left">
                    <span className="icon-stat-label">Total Purchase</span>
                    <span className="icon-stat-value">
                      0
                    </span>
                  </div>
                  <div className="col-xs-4 text-center">
                    <i className="fa-solid fa-cash-register icon-stat-visual bg-danger" />
                  </div>
                </div>
                <div className="icon-stat-footer">
                  <i className="fa-solid fa-clock" /> Updated Now
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="icon-stat third">
                <div className="row">
                  <div className="col-xs-8 text-left">
                    <span className="icon-stat-label">Total Delivered</span>
                    <span className="icon-stat-value">
                      0
                    </span>
                  </div>
                  <div className="col-xs-4 text-center">
                    <i className="fa-solid fa-truck icon-stat-visual bg-dark" />
                  </div>
                </div>
                <div className="icon-stat-footer">
                  <i className="fa-solid fa-clock" /> Updated Now
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="icon-stat fourth">
                <div className="row">
                  <div className="col-xs-8 text-left">
                    <span className="icon-stat-label">Total Cancelled</span>
                    <span className="icon-stat-value">
                     0
                    </span>
                  </div>
                  <div className="col-xs-4 text-center">
                    <i className="fa-solid fa-ban icon-stat-visual bg-secondary" />
                  </div>
                </div>
                <div className="icon-stat-footer">
                  <i className="fa-solid fa-clock" /> Updated Now
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="panel panel-default">
                <div className="panel-heading">Latest Order</div>
                <div className="panel-body">
                  
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>SubTotal</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Zip Code</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          1
                        </td>
                        <td>
                          $ 30.00
                        </td>
                        <td>
                          $ 5
                        </td>
                        <td>
                          $ 4.5
                        </td>
                        <td>
                          $ 12.00
                        </td>
                        <td>
                          Vanneth
                        </td>
                        <td>
                          You
                        </td>
                        <td>
                          010610966
                        </td>
                        <td>
                          vanneth@gmail.com
                        </td>
                        <td>
                          + 855
                        </td>
                        <td>
                          success
                        </td>
                        <td>
                          Fri, 10th Feb, 2023
                        </td>
                        <td>
                          <a href="/" className="btn btn-info btn-sm">
                            <i className="fa-solid fa-eye" /> Details
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
