import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options)
  return (
    <div>
     <div>

      <div className="card mt-3 w-100 " style={{"maxHeight": "360px"}}>
      <img src={props.imgSrc} className="card-img-top " alt="..." style={{height:"120px",objectFit:"fill"}} />

  <div className="card-body">
    <h5 className="card-title">{props.foodName}</h5>
    <p>this is description</p>
    
    <div className="container w-100" >
      <select className='m-2 h-100 bg-black text-white rounded'>
        {
          (Array.from(Array(6),(e,i)=> {
            return (
              <option className="text-white" key={i+1} value={i+1}>{i+1}</option>
            )
          }))
        }
        </select>
      <select className='m-2 bg-black text-white rounded'>
       {priceOptions.map((data)=>{
        return (
        <option className="text-white"key={data} value={data}>{data}</option>
        )
       })}
  </select>

  <div className='d-inline fs-5'>
    TotalPrice
  </div>


    </div>
  </div>
</div>
    </div>
    </div>
  )
}

//export default Card;