export default function Popup(props) {
  return (
    <article className="Popup">
      <div className="closeModal">
        <button aria-label="close" onClick={props.togglePopup}></button>
      </div>
      <div className="popUpInfo">
        <section>
          <h2>{props.name}</h2>
          <div>
            <p>Category: {props.category}</p>
            <p>Alcohol: {props.alcohol}%</p>
          </div>
          <p>{props.description}</p>
        </section>
        <section>
          <picture>
            <source type="image/webp" srcSet={props.beerImageWebp} />
            <source type="image/png" srcSet={props.beerImagePng} />
            <img src={props.beerImagePng} alt={props.beerImageAlt} />
          </picture>
        </section>
      </div>
    </article>
  );
}
