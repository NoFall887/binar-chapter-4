class App {
  constructor() {
    this.searchButton = document.getElementById("search-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  init() {
    // Register click lister
    this.searchButton.onclick = this.run;
  }

  run = async (e) => {
    e.preventDefault();
    const dateValue = document.getElementById("date").value;
    const timeValue = document.getElementById("time").value;
    const passengerValue = document.getElementById("passenger").value;

    await this.load();
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
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
