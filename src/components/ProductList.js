import Product from "./Product";

export default function ProductList(props) {
  // Creating an array with Product components
  const listOfBeers = props.products.map((product) => (
    <Product
      cartItems={props.cartItems}
      addToCart={props.addToCart}
      removeFromCart={props.removeFromCart}
      key={product.name}
      {...product}
    />
  ));
  return <section className="ProductList">{listOfBeers}</section>;
}
