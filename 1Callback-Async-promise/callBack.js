//call back hell
function getData(dataId, getNextData) {
  setTimeout(() => {
    console.log("data", dataId);
    if (getNextData) {
      getNextData();
    }
  }, 2000);
}
console.log("fetching first Data");
getData(1, () => {
  console.log("fetching second Data");
  getData(2, () => {
    console.log("fetching third Data");
    getData(3, () => {
      console.log("fetching fourth Data");
      getData(4);
    });
  });
});
