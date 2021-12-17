import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import TotalPrice from "./TotalPrice";
import PaymentMethod from "./PaymentMethod";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [totalPriceBeers, setTotalPriceBeers] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      console.log("Beers on tap:", beersOnTap);
      const newProducts = oldProducts.filter((beer) => beersOnTap.includes(beer.name));
      console.log("Available beers:", newProducts);
      return newProducts;
    });
  }

  // Incrementing the number of beers in the cart
  function addBeersToTotalPrice() {
    setTotalPriceBeers((oldTotalPriceBeers) => {
      return oldTotalPriceBeers + 1;
    });
  }

  // Decrementing the number of beers in the cart
  function removeBeersFromTotalPrice() {
    setTotalPriceBeers((oldTotalPriceBeers) => {
      return oldTotalPriceBeers - 1;
    });
  }

  // Adding beers to the cart
  function addToCart(productToAdd) {
    if (errorMessage === "You need to select the beers") {
      setErrorMessage("");
    }
    setCartItems((oldCartItems) => {
      const newCartItems = oldCartItems.concat(productToAdd);
      return newCartItems;
    });
  }

  //Removing beers from the cart
  function removeFromCart(productToRemove) {
    const indexOfFirstUnwantedItem = cartItems.findIndex((item) => item.name === productToRemove.name);

    console.log("Index of first unwanted item:", indexOfFirstUnwantedItem);

    // Creating two arrays: one before the item we want to remove, and one after it

    const firstPart = cartItems.slice(0, indexOfFirstUnwantedItem);
    const lastPart = cartItems.slice(indexOfFirstUnwantedItem + 1, cartItems.length);

    // Merging two arrays into one, that will not include the unwanted item

    setCartItems([...firstPart, ...lastPart]);
  }

  console.log("Items in cart:", cartItems);

  return (
    <div className="Main">
      <img className="mainLogo" src="icons/foobar-logo.svg" alt="Foobar logo" />
      <ProductList
        products={products}
        addBeersToTotalPrice={addBeersToTotalPrice}
        removeBeersFromTotalPrice={removeBeersFromTotalPrice}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <TotalPrice totalPriceBeers={totalPriceBeers} />
      <PaymentMethod cartItems={cartItems} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
    </div>
  );
}
