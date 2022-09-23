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
    const tempDate = new Date();
    this.time.value = `${tempDate.getHours()}:${tempDate.getMinutes()}`;
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

    if (Car.list.length === 0) {
      this.carContainerElement.innerHTML +=
        '<p class="d-flex justify-content-center">No cars available</p>';
    }
    Car.list.forEach((car) => {
      this.carContainerElement.innerHTML += car.render();
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
