import ProductList from "./ProductList";
import TotalPrice from "./TotalPrice";
import PaymentMethod from "./PaymentMethod";
import Header from "./Header";
import { useState } from "react";

function Main({ cartItems, setCartItems, products, order, setOrder }) {
  const [error, setError] = useState({
    cart: false,
    payment: false,
  });

  // Adding beers to the cart
  const addToCart = (productToAdd) => {
    if (error.cart === true) {
      setError({ ...error, cart: false });
    }
    setCartItems((oldCartItems) => {
      const newCartItems = oldCartItems.concat(productToAdd);
      return newCartItems;
    });
  };

  //Removing beers from the cart
  const removeFromCart = (productToRemove) => {
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
  };

  return (
    <div className="Main">
      <Header />
      <ProductList
        products={products}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <TotalPrice totalPriceBeers={cartItems.length * 80} />
      <PaymentMethod
        cartItems={cartItems}
        setError={setError}
        error={error}
        order={order}
        setOrder={setOrder}
      />
    </div>
  );
}

export default Main;
