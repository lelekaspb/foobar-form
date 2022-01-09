import Landing from "./components/Landing";
import Main from "./components/Main";
import Creditcard from "./components/Creditcard";
import Mobilepay from "./components/Mobilepay";
import Confirmation from "./components/Confirmation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState({ items: "", id: "" });

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://winter-foobar.herokuapp.com/");
      const data = await res.json();
      checkTaps(data);
    }
    async function fetchBeerTypes() {
      const res = await fetch("https://winter-foobar.herokuapp.com/beertypes");
      const data = await res.json();
      setProducts(data);
      fetchData();
    }
    fetchBeerTypes();
  }, []);

  // Checking beers in taps and updating displayed products to those that are currently available
  function checkTaps(data) {
    setProducts((oldProducts) => {
      const beersOnTap = data.taps.map((tap) => tap.beer);
      const newProducts = oldProducts.filter((beer) =>
        beersOnTap.includes(beer.name)
      );
      return newProducts;
    });
  }

  // empty cart and order states (after confirmation)
  const clearState = () => {
    setOrder({ items: "", id: "" });
    setCartItems([]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/beers"
            element={
              <Main
                products={products}
                cartItems={cartItems}
                setCartItems={setCartItems}
                order={order}
                setOrder={setOrder}
              />
            }
          />
          <Route
            path="/creditcard"
            element={<Creditcard order={order} setOrder={setOrder} />}
          />
          <Route
            path="/mobilepay"
            element={<Mobilepay order={order} setOrder={setOrder} />}
          />
          <Route
            path="/confirmation"
            element={
              <Confirmation
                order={order.items}
                id={order.id}
                clearState={clearState}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
