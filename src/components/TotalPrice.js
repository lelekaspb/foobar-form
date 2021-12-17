export default function TotalPrice({ totalPriceBeers }) {
  // Calculating total price

  const sum = totalPriceBeers * 80;

  return <h3 className="TotalPrice">Total: {sum} kr</h3>;
}
