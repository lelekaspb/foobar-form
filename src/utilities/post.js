export const postOrder = async () => {
  console.log("postOrder");

  const order = localStorage.getItem("order");
  console.log(order);

  const endpoint = "https://winter-foobar.herokuapp.com/order/";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: order,
  };

  try {
    const request = await fetch(endpoint, options);
    const data = await request.json();
    console.log(data);
    localStorage.setItem("response", JSON.stringify(data));
  } catch (err) {
    console.log("Caught error " + err);
  }
};
