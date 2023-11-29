import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Order from './Order';
import { OrderService, ProductService } from './Service';
const Dashboard = () => {


  const [orders, setOrders] = useState([]);
  const [showOrderDeleteAlert, setShowOrderDeleteAlert] = useState(false);
  const [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);
  const userContext = useContext(UserContext);

  const loadDataFromDatabase = useCallback(async () => {
    //load data from database
    let ordersResponse = await fetch(
      `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
      { method: "GET" }
    );

    if (ordersResponse.ok) {
      //status code is 200
      let ordersResponseBody = await ordersResponse.json();

      //get all data from products
      let productsResponse = await ProductService.fetchProducts();
      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        //read all orders data
        ordersResponseBody.forEach((order) => {
          order.product = ProductService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
        });

        setOrders(ordersResponseBody);
      }
    }
  }, [userContext.user.currentUserId])

  const onByNowClick = useCallback(async (orderId, userId, productId, quantity, isPaymentCompleted) => {
    const updateOrder = {
      id: orderId,
      productId: productId,
      userId: userId,
      quantity: quantity,
      isPaymentCompleted: true,
    }
    const orderResponse = await fetch(
      `http://localhost:5000/orders/${orderId}`,
      {
        method: "PUT",
        body: JSON.stringify(updateOrder),
        headers: { "Content-type": "application/json" },
      }
    );
    const orderResponseBody = await orderResponse.json();
    setShowOrderPlacedAlert(true);
    loadDataFromDatabase();
  }, [loadDataFromDatabase])

  const onDeleteClick = useCallback(async (orderId) => {
    console.log(orderId);
    if (window.confirm("Are you sure to delete this item from cart?")) {
      let orderResponse = await fetch(
        `http://localhost:5000/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();
        console.log(orderResponseBody);
        setShowOrderDeleteAlert(true);

        loadDataFromDatabase();
      }
    }
  }, [loadDataFromDatabase])
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';
    loadDataFromDatabase();
  }, [userContext.user.currentUserId])


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
            {
              showOrderPlacedAlert ? (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              ) : (
                ""
              )
            }
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
                  price={ord.product.price} onByNowClick={onByNowClick} onDeleteClick={onDeleteClick}
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