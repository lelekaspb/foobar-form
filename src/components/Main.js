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

  return (
    <div className="Main">
      <Header />
      <ProductList
        products={props.products}
        cartItems={props.cartItems}
        addToCart={addToCart}
        removeFromCart={props.removeFromCart}
      />
      <TotalPrice totalPriceBeers={props.totalPriceBeers} />
      <PaymentMethod
        cartItems={props.cartItems}
        setError={setError}
        error={error}
        buildOrder={props.buildOrder}
      />
    </div>
  );
}
