import ProductList from "./ProductList";
import TotalPrice from "./TotalPrice";
import PaymentMethod from "./PaymentMethod";
import Header from "./Header";
import { useState } from "react";

export default function Main(props) {
  const [error, setError] = useState({
    cart: false,
    payment: false,
  });

  // Adding beers to the cart
  function addToCart(productToAdd) {
    if (error.cart === true) {
      setError({ ...error, cart: false });
    }
    props.setCartItems((oldCartItems) => {
      const newCartItems = oldCartItems.concat(productToAdd);
      return newCartItems;
    });
  }

  //Removing beers from the cart
  function removeFromCart(productToRemove) {
    const indexOfFirstUnwantedItem = props.cartItems.findIndex(
      (item) => item.name === productToRemove.name
    );
    // Creating two arrays: one before the item we want to remove, and one after it
    const firstPart = props.cartItems.slice(0, indexOfFirstUnwantedItem);
    const lastPart = props.cartItems.slice(
      indexOfFirstUnwantedItem + 1,
      props.cartItems.length
    );
    // Merging two arrays into one, that will not include the unwanted item
    props.setCartItems([...firstPart, ...lastPart]);
  }

  return (
    <div className="Main">
      <Header />
      <ProductList
        products={props.products}
        cartItems={props.cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <TotalPrice totalPriceBeers={props.cartItems.length * 80} />
      <PaymentMethod
        cartItems={props.cartItems}
        setError={setError}
        error={error}
        order={props.order}
        setOrder={props.setOrder}
      />
    </div>
  );
}
