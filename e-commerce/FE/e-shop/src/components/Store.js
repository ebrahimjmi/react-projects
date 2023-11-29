import React, { useEffect, useState } from 'react'
import { BrandsService } from './Service';


const Store = () => {

  const [brands, setBrand] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/brands", {
        method: "GET",
      })
      const result = await response.json();
      result.forEach((brd) => {
        brd.isChecked = true;
      })
      setBrand(result);
    })();

    (async () => {
      const response = await fetch("http://localhost:5000/categories", {
        method: "GET",
      })
      const result = await response.json();
      result.forEach((brd) => {
        brd.isChecked = true;
      })
      setCategory(result);
    })()
  }, [])

  const updateBrandIsChecked = (id) => {
    const updatedData = brands.map((brd) => {
      if(brd.id === id) {
        brd.isChecked = !brd.isChecked;
      }
      return brd;
    })
    setBrand(updatedData);
  }

  const updateCategoryIsChecked = (id) => {
    const updatedData = category.map((cat) => {
      if(cat.id === id) {
        cat.isChecked = !cat.isChecked;
      }
      return cat;
    })
    setCategory(updatedData);
  }

  return (
    <div className='row'>
      <div className='col-lg-3'>
        <div className='list-group list-group-flush'>
          <h5>Brands</h5>
          {
            brands.map((brd) => <div className="form-check" key={brd.id}>
              <label className="form-check-label" htmlFor="exampleCheckbox">
                {brd.brandName}
              </label>
              <input className="form-check-input" type="checkbox" checked={brd.isChecked} id="exampleCheckbox" onChange={() => updateBrandIsChecked(brd.id)} />
            </div>)
          }
        </div>

        <div>
          <h5>Categories</h5>
          {
            category.map((cat) => <div className="form-check" key={cat.id}>
              <label className="form-check-label" htmlFor="exampleCheckbox">
                {cat.categoryName}
              </label>
              <input className="form-check-input" checked={cat.isChecked} type="checkbox" id="exampleCheckbox" onChange={() => updateCategoryIsChecked(cat.id)}  />
            </div>)
          }
        </div>
      </div>
      <div className='col-lg-9'>

      </div>
    </div>
  )
}

export default Store