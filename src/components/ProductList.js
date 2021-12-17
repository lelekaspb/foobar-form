import Product from "./Product";

export default function ProductList(props) {
  // Creating an array with Product components
  const listOfBeers = props.products.map((product) => (
    <Product
      addBeersToTotalPrice={props.addBeersToTotalPrice}
      removeBeersFromTotalPrice={props.removeBeersFromTotalPrice}
      addToCart={props.addToCart}
      removeFromCart={props.removeFromCart}
      key={product.name}
      {...product}
    />
  ));
  return <section className="ProductList">{listOfBeers}</section>;
}
