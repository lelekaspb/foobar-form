import ProductList from "./ProductList";
import TotalPrice from "./TotalPrice";
import PaymentMethod from "./PaymentMethod";

export default function Main(props) {
  return (
    <div className="Main">
      <ProductList
        products={props.products}
        cartItems={props.cartItems}
        addToCart={props.addToCart}
        removeFromCart={props.removeFromCart}
      />
      <TotalPrice totalPriceBeers={props.totalPriceBeers} />
      <PaymentMethod
        cartItems={props.cartItems}
        setErrorMessage={props.setErrorMessage}
        errorMessage={props.errorMessage}
        buildOrder={props.buildOrder}
      />
    </div>
  );
}
