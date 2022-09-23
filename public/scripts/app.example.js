class App {
  constructor() {
    this.searchButton = document.getElementById("search-btn");
    this.carContainerElement = document.getElementById("search-result");
    this.date = document.getElementById("date");
    this.time = document.getElementById("time");
    this.passenger = document.getElementById("passenger");
  }

  init() {
    // Register click lister
    this.searchButton.onclick = this.run;
    // set default value
    this.date.value = new Date().toLocaleDateString("en-CA");
    this.time.value = "00:00:00";
    this.passenger.value = 1;
  }

  run = async (e) => {
    e && e.preventDefault();
    this.clear();
    const dateValue = this.date.value;
    const timeValue = this.time.value;
    const passengerValue = parseInt(this.passenger.value);
    const dateTimeValue = new Date(`${dateValue} ${timeValue}`);

    await this.load(dateTimeValue, passengerValue);
    Car.list.forEach((car) => {
      // const node = document.createElement("div");
      // node.innerHTML = car.render();
      this.carContainerElement.innerHTML += car.render();
      // this.carContainerElement.appendChild(node);
    });
  };

  async load(dateFilter, passengerFilter) {
    const cars = await Binar.listCars((car) => {
      return car.availableAt >= dateFilter && car.capacity >= passengerFilter;
    });
    console.log(cars);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
