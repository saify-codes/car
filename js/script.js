// Available cars
var cars = [
  {
    make: "BMW",
    model: "X5",
    color: "Silver",
    price: 60_000,
    description: "A luxurious and powerful SUV with advanced technology.",
    category: "SUV",
    img:"x5.jpg"
  },
  {
    make: "Audi",
    model: "A4",
    color: "Black",
    price: 40_000,
    description: "A refined and elegant sedan with a comfortable interior.",
    category: "Sedan",
    img:"a4.jpg"
  },
  {
    make: "Ford",
    model: "Ranger",
    color: "White",
    price: 45_000,
    description: "A powerful 4WD pickup truck for off-road adventures.",
    category: "4WD",
    img:"ranger.jpg"
  },
  {
    make: "Lamborghini",
    model: "Aventador",
    color: "Yellow",
    price: 500_000,
    description: "An iconic and high-performance sports car.",
    category: "Sports Car",
    img:"aventador.jpg"
  },
  {
    make: "Ferrari",
    model: "488 GTB",
    color: "Red",
    price: 400_000,
    description:"A stunning and exhilarating supercar with breathtaking speed.",
    category: "Sports Car",
    img:"gtb.jpg"
  },
  {
    make: "Porsche",
    model: "911",
    color: "Blue",
    price: 300000,
    description:
      "A legendary sports car known for its timeless design and performance.",
    category: "Sports Car",
    img:"911.jpg"
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    color: "White",
    price: 50_000,
    description:"A stylish and sophisticated luxury sedan with cutting-edge features.",
    category: "Sedan",
    img:"c-class.jpg"
  },
  {
    make: "Tesla",
    model: "Model S",
    color: "Blue",
    price: 80_000,
    description:"An all-electric sedan with exceptional range and innovative technology.",
    category: "Sedan",
    img:"model-s.jpg"
  },
  {
    make: "Chevrolet",
    model: "Camaro",
    color: "Yellow",
    price: 50_000,
    description:"A high-performance sports car with aggressive styling and thrilling performance.",
    category: "Sports Car",
    img:"camaro.jpg"
  },
  {
    make: "Toyota",
    model: "Highlander",
    color: "Pearl White",
    price: 42_000,
    description:"A spacious and reliable SUV with advanced safety features.",
    category: "SUV",
    img:"highlander.jpg"
  },

];

const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
const wrapper = document.querySelector(".card-wrapper");
const cartWrapper = document.querySelector(".cart");

if (wrapper)
  cars.forEach((car, index) => {
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col">
                <div class="card">
                    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="assets/${car.img}" class="img-fluid" />
                        <a href="#!">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${car.make}</h5>
                        <p class="card-text">${car.description}</p>
                        <table class="mb-3 w-100">
                            <tr>
                                <td class="">color</td>
                                <td class="">${car.color}</td>
                            </tr>
                            <tr>
                                <td>model</td>
                                <td>${car.model}</td>
                            </tr>
                            <tr>
                                <td>category</td>
                                <td>${car.category}</td>
                            </tr>
                            <tr>
                                <td>price</td>
                                <td><strong class="text-danger">AUD ${car.price}</strong></td>
                            </tr>
                        </table>
                        <a href="#!" id="${index}" class="btn btn-block btn-primary" onclick="bookCar(this.id)">Book</a>
                    </div>
                </div>
            </div>
    `
    );
  });

if (cartWrapper) {
  tableBody = cartWrapper.querySelector("tbody");
  cart.forEach((carId) => {
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `
            <tr>
                <td>${cars[carId].make} ${cars[carId].model}</td>
                <td class="text-end"><button id="${carId}" type="button" class="btn btn-light" data-mdb-ripple-color="dark" onclick="removeCar(this.id)"><i class="fas fa-trash text-danger"></i></button></td>
            </tr>
        `
    );
  });

  if (cart.length == 0) {
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `
              <tr>
                  <td class="text-center" colspan="2">No bookings yet 😥</td>
            </tr>
          `
    );
  }
}

function bookCar(id) {
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire("Car booked!", "", "success");
  } else {
    Swal.fire("Booked already!", "", "info");
  }
}

function removeCar(id) {
  let index = cart.indexOf(id);
  if (index != -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}

function removeAllCar() {
  if (confirm("Are you sure?")) {
    localStorage.clear();
    alert("Your booking list is now empty 😁");
    location.href = "index.html";
  }
}

function checkout() {
  if (cart.length > 0) {
    localStorage.clear();
    alert("Thank you for your order");
    location.href = "index.html";
  } else {
    alert(
      "Your order cannot be processed as you have not reserved any cars 🤣"
    );
  }
}
