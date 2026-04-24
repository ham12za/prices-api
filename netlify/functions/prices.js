exports.handler = async function () {
  const url =
    "https://script.google.com/macros/s/AKfycbwTn2IMcfhR8cgxOvSk92le0oEjWizado4qF_8Ul3Z-vDXJo6Adj-cpIlUsOSjVIrmbdQ/exec";

  const response = await fetch(url, {
    redirect: "follow"
  });

  const data = await response.text();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: data
  };
};
