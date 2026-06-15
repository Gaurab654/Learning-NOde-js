function getData(dataId, getNextData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data", dataId);
      if (getNextData) {
        getNextData();
      }
    }, 2000);
  });
}
getData(1)
  .then((res) => {
    return getData(2);
  })
  .then((res) => {
    return getData(3);
  })
  .then((res) => {
    return getData(4);
  })
  .then((res) => {
    return getData(5);
  })
  .then((res) => {
    console.log(res);
  });
