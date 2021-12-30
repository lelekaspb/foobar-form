import Product from "./Product";

function ProductList({ products, cartItems, addToCart, removeFromCart }) {
  // Creating an array with Product components
  const listOfBeers = products.map((product) => (
    <Product
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      key={product.name}
      {...product}
    />
  ));
  return <section className="ProductList">{listOfBeers}</section>;
}

export default ProductList;
