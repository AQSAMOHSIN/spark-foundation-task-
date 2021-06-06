response
  .then(() => {
    console.log("promise resolve");
  })
  .catch((e) => {
    console.log("promise is rejected ", e);
  });
