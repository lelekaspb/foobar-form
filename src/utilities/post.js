export const postOrder = async (order) => {
  const endpoint = "https://winter-foobar.herokuapp.com/order/";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(order),
  };

  try {
    const request = await fetch(endpoint, options);
    const data = await request.json();
    return data;
  } catch (err) {
    console.log("Caught error " + err);
    return undefined;
  }
};
