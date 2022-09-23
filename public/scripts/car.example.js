class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="shadow-sm p-3 result__car-card rounded-3">
    <div>
    <img src="${this.image}" class="result__car-img" alt="car">
    <p class="car-name">${this.model}</p>
    <p class="price">${this.rentPerDay} / hari</p>
    <p>${this.description}</p>
    </div>
    <div>
    <div class="d-flex align-items-center mb-3">
      <img src="./images/fi_users.svg" class="me-3">
      ${this.capacity} orang
    </div>
    <div class="d-flex align-items-center mb-3">
      <img src="./images/fi_settings.svg" class="me-3">
      ${this.transmission}
    </div>
    <div class="d-flex align-items-center mb-4">
      <img src="./images/fi_calendar.svg" class="me-3">
      Tahun ${this.year}
    </div>
    <button class="btn btn-success __main-btn search-result-btn">Pilih Mobil</button>
    </div>
  </div>
    `;
  }
}
