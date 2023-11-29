import React from 'react'

const Order = (props) => {
  const {orderId, userId, productId, quantity, isPaymentCompleted, onByNowClick, onDeleteClick} = props;
  console.log(onDeleteClick);
  return (
    <div className="card my-2 shadow">
    <div className="card-body">
      <h6>
        <i className="fa fa-arrow-right"></i> {props.productName}
       {
        props.isPaymentCompleted ? "" : <div className='float-right'>
        <button className='btn btn-info btn-sm mx-2 text-white' onClick={() => onByNowClick(orderId, userId, productId, quantity, isPaymentCompleted)}><i className='fa fa-truck mx-2'></i>By Now</button>
        <button className='btn btn-sm btn-danger' onClick={(orderId) => onDeleteClick(orderId)}><i className='fa fa-trash'></i></button>
        </div>
       }
      </h6>

      <table className="table table-sm table-borderless mt-1">
        <tbody>
          <tr>
            <td style={{ width: "100px" }}>Quantity:</td>
            <td>{props.quantity}</td>
          </tr>
          <tr>
            <td style={{ width: "100px" }}>Price:</td>
            <td>$ {props.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default React.memo(Order)