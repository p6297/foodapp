import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.css';

function Home() {
  const[search,setSearch] = useState("");
  const [food_data, setFood_data] = useState([]);
  const [food_category, setFood_category] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setFood_data(data[0]);
      setFood_category(data[1]);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousal">
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      <button className="btn btn-outline-success  bg-dark"  type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/600x500/?pizza" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/600x500/?burger" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/600x500/?hotdog" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
    </button>
</div>
</div>
      <div className="container">
        {
          food_category.length !== 0 ? food_category.map((data) => {
            return (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  food_data.length !== 0 ? food_data.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))  ) 
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-sm-6 col-lg-3'>
                        <Card
                          foodName={filterItems.name}
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img}
                        ></Card>
                      </div>
                    )
                  }) : <div>no such data</div>
                }
              </div>
            )
          }) : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home;