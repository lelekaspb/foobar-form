import { useEffect, useState } from "react";
import Popup from "./Popup";

function Product(props) {
  const getInitialAmount = () => {
    const temp = props.cartItems.filter((item) => item.name === props.name);
    return temp.length;
  };

  const [amount, setAmount] = useState(getInitialAmount());
  const [popupOpen, setPopupOpen] = useState(false);

  // Toggling pop up window
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    const togglePopup = () => {
      setPopupOpen(!popupOpen);
    };
    if (popupOpen) {
      window.addEventListener("click", togglePopup);
      return () => window.removeEventListener("click", togglePopup);
    }
  }, [popupOpen]);

  // Setting path to images with the glasses
  const imageName = props.name.replaceAll(" ", "").toLowerCase();
  const beerImagePng = `images/beers-png/${imageName}.png`;
  const beerImageWebp = `images/beers-webp/${imageName}.webp`;
  const beerImageAlt = `Glass with ${props.name} label`;

  const plus = () => {
    // Incrementing the number of beers selected
    setAmount((oldAmount) => {
      if (oldAmount === 99) {
        return 99;
      }
      return oldAmount + 1;
    });
    // Calling functions to add beers to the cart
    if (amount < 99) {
      props.addToCart({
        name: props.name,
      });
    }
  };

  // Decrementing the number of beers selected
  const minus = () => {
    setAmount((oldAmount) => {
      if (oldAmount > 0) {
        return oldAmount - 1;
      }
      return 0;
    });
    // Calling functions to remove beers from the cart
    if (amount > 0) {
      props.removeFromCart({
        name: props.name,
      });
    }
  };

  return (
    <article className="Product">
      <section>
        <picture>
          <source type="image/webp" srcSet={beerImageWebp} />
          <source type="image/png" srcSet={beerImagePng} />
          <img src={beerImagePng} alt={beerImageAlt} />
        </picture>
        <h2>{props.name}</h2>
        <h3>80 kr</h3>
        <button className="about" onClick={togglePopup}>
          About
        </button>
        {popupOpen && (
          <Popup
            togglePopup={togglePopup}
            name={props.name}
            description={props.description.overallImpression}
            alcohol={props.alc}
            category={props.category}
            label={props.label}
            beerImagePng={beerImagePng}
            beerImageWebp={beerImageWebp}
            beerImageAlt={beerImageAlt}
          />
        )}
      </section>
      <section className="plusMinus">
        <button aria-label="plus sign" onClick={plus}></button>
        <p>{amount}</p>
        <button aria-label="minus sign" onClick={minus}></button>
      </section>
    </article>
  );
}

export default Product;
