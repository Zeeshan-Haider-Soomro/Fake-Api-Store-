import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Header from "./Header";

// import React, { useEffect, useState } from 'react'

const Crud = () => {
  const [product, setProduct] = useState([]);
  const [hit, sethit] = useState(0);
  const [loading, isSetloading] = useState(false);
  const [category, isSetCategory] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [search, isSetSearch] = useState('')
  const [isFound, setIsFound] = useState(false);
  const getData = async () => {
    isSetloading(true);
    try {
      const data = await axios.get("https://fakestoreapi.com/products");
      const res = data?.data;
      setProduct(res);
      // console.log(res);
      const makes = [...new Set(res.map((item) => item.category))];
      isSetCategory(makes);
      isSetloading(false);
      setFilteredProduct(res);

    } catch (error) {
      console.log(error);
      isSetloading(false);
    }
  };
  console.log(product);

  const handleValue = (cat) => {
    if (cat === "All") {
      setFilteredProduct(product);
    } else {
      const filteredData = product.filter((item) => item.category === cat);
      console.log(filteredData);
      setFilteredProduct(filteredData);
    }
  };

  const handleSearch = () =>{
    const filteredSearch = filteredProduct.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    if(filteredSearch.length===0){
      setIsFound(true);
    }
    else{
      setFilteredProduct(filteredSearch)
      setIsFound(false);
    }
    console.log(filteredSearch);
    
  }

  const handleEnterSearch = (e) => {
    if(e.key == "Enter"){
      handleSearch()
    }
  }


  useEffect(() => {
    getData();
  }, []);

  // console.log(loading);

  return (
    <div className="main">
      <Header/>
        <h1 className="text-center text-4xl m-5">Zeeshan's Collection</h1>
      <div className="flex justify-center items-center m-4">
        <input placeholder="search here" onKeyDown={handleEnterSearch} className="border-2 m-4 p-2" type="text" value={search} onChange={(e)=>isSetSearch(e.target.value)} />
        <select className="border-2 p-2" onChange={(e) => handleValue(e.target.value)}>
          <option value="All">All</option>
          {category.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <button onClick={handleSearch} className= "p-2 bg-slate-500 outline border-2 text-cyan-50 m-3">Search</button>
      </div>

      <div className="flex flex-wrap gap-6 m-3 justify-center">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
        
            {isFound ? <p>No Data Found</p> : 
            
            <>
            {filteredProduct.map((item) => {
              const {
                color,
                id,
                image,
                price,
                description,
                title,
                rating,


              } = item;
              return (
                <div key={id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img className="object-contain h-[250px] w-[250px]" variant="top" src={image} />
                    <Card.Body>
                      <Card.Title>Price : {price}$</Card.Title>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>
                        {description}
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
            </>}
          
            
          </>
        )}
      </div>
      <footer className="bg-black text-white text-center p-5 text-2xl">
      <p> &copy; 2024 Zeeshan Haider Soomro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Crud;
