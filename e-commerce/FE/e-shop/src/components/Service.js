export const OrderService = {
  //getPreviousOrders
  getPreviousOrders: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === true)
  },
  //getCart
  getCart: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === false)
  }
}

export const ProductService = {
  fetchProducts: () => {
    return fetch("http://localhost:5000/products", {
      method: "GET",
    })
  },
  getProductByProductId: (products, productId) => {
    return products.find(
      (prod) => prod.id === productId
    );
  }
}