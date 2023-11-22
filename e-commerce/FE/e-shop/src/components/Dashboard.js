import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Order from './Order';
import { OrderService, ProductService } from './Service';
const Dashboard = () => {


  const [orders, setOrders] = useState([]);
  console.log('rendring');
  const userContext = useContext(UserContext);

  const loadDataFromDatabase = async () => {
    let ordersResponse = await fetch(
      `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
      { method: "GET" }
    );
    if (ordersResponse.ok) {
      //status code is 200
      let ordersResponseBody = await ordersResponse.json();

      //get all data from products
      let productsResponse = await fetch("http://localhost:5000/products", {
        method: "GET",
      });
      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        //read all orders data
        ordersResponseBody.forEach((order) => {
          order.product = ProductService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
        });
        console.log(ordersResponseBody);
        setOrders(ordersResponseBody);
      }
    }
  }
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';
    loadDataFromDatabase();
  },[userContext.user.currentUserId])


  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard
          <button className='btn btn-sm btn-info' onClick={loadDataFromDatabase}><i className='fa fa-refresh mx-2'></i>Refresh</button>
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          {/* previous orders starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history"></i> Previous Orders{" "}
              <span className="badge bg-primary">
                {OrderService.getPreviousOrders(orders).length}
              </span>
            </h4>

            {OrderService.getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              ""
            )}

            {OrderService.getPreviousOrders(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                />
              );
            })}
          </div>
          {/* previous orders ends*/}

          {/* cart starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i> Cart{" "}
              <span className="badge bg-primary ">
                {OrderService.getCart(orders).length}
              </span>
            </h4>

            {OrderService.getCart(orders).length === 0 ? (
              <div className="text-danger">No products in your cart</div>
            ) : (
              ""
            )}

            {OrderService.getCart(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                />
              );
            })}
          </div>
          {/* cart ends*/}
        </div>
      </div>
    </div>
  )
}

export default Dashboard