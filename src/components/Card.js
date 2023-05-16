import React, { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart()
  const priceref = useRef()

  let options = props.options;
  let priceOptions = Object.keys(options)

  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  let foodItem = props.foodItems

  const handleCart =async() => {
    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice,qty:qty, size:size})
    console.log(data)


  }
  let finalPrice= qty * parseInt(options[size]);
  useEffect(()=> {
    setSize(priceref.current.value)

  },[])
  return (
    <div>
     <div>

      <div className="card mt-3 w-100 " style={{"maxHeight": "360px"}}>
      <img src={props.foodItem.img} className="card-img-top " alt="..." style={{height:"120px",objectFit:"fill"}} />

  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <p>this is description</p>
    
    <div className="container w-100" >
      <select className='m-2 h-100 bg-black text-white rounded' onChange={(e)=> setQty(e.target.value)}>
        {
          (Array.from(Array(6),(e,i)=> {
            return (
              <option className="text-white" key={i+1} value={i+1}>{i+1}</option>
            )
          }))
        }
        </select>
      <select className='m-2 bg-black text-white rounded' ref={priceref} onChange={(e)=> setSize(e.target.value)}>
       {priceOptions.map((data)=>{
        return (
        <option className="text-white"key={data} value={data}>{data}</option>
        )
       })}
  </select>

  <div className='d-inline fs-5'>
    {finalPrice}/-
  </div>
  <hr/>
  <button className='btn bg-black text-white justify-center ms-2' onClick={handleCart}>Add to cart</button>


    </div>
  </div>
</div>
    </div>
    </div>
  )
}

//export default Card;