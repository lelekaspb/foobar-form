import Header from "./components/Header";
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
  // const [orderID, setOrderID] = useState("");

  useEffect(() => {
    console.log(order);
  }, [order]);

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

  //Removing beers from the cart
  function removeFromCart(productToRemove) {
    const indexOfFirstUnwantedItem = cartItems.findIndex(
      (item) => item.name === productToRemove.name
    );
    // Creating two arrays: one before the item we want to remove, and one after it
    const firstPart = cartItems.slice(0, indexOfFirstUnwantedItem);
    const lastPart = cartItems.slice(
      indexOfFirstUnwantedItem + 1,
      cartItems.length
    );
    // Merging two arrays into one, that will not include the unwanted item
    setCartItems([...firstPart, ...lastPart]);
  }

  function buildOrder() {
    const counts = [];
    const uniqueBeers = [];
    const ordered = [];

    // Counting how many beers of each type is in the order
    cartItems.forEach((item) => {
      counts[item.name] = (counts[item.name] || 0) + 1;

      // Adding unique beers to an array
      if (counts[item.name] === 1) {
        uniqueBeers.push(item);
      }
    });

    // Building the order for posting
    uniqueBeers.forEach((elem) => {
      const oneBeerType = { name: elem.name, amount: counts[elem.name] };
      ordered.push(oneBeerType);
    });

    // set order state
    setOrder({ ...order, items: ordered });
  }

  const clearState = () => {
    //setOrderID("");
    setOrder({ items: "", id: "" });
    setCartItems([]);
  };

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/beers"
            element={
              <Main
                products={products}
                removeFromCart={removeFromCart}
                totalPriceBeers={cartItems.length * 80}
                cartItems={cartItems}
                setCartItems={setCartItems}
                buildOrder={buildOrder}
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
