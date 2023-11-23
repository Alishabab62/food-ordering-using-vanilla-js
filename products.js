const mainContainer = document.getElementById("main-container");


function ratingColor(rating) {
    if(rating > "4"){
      return "green"
    }
    else if(rating > 3){
      return "orange";
    }
    else{
      return "red";
    }
}
const FOOD_IMAGE_URL = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
const urlPhone ="https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?lat=30.9579652&lng=75.7487779"
const urlLaptop = "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.9579652&lng=75.7487779&page_type=DESKTOP_WEB_LISTING";

const width = window.screen.width;
const url =  width > 768 ? urlLaptop : urlPhone;


async function renderProduct() {
  await fetch(urlLaptop)
    .then((data) => {
      return data.json();
    })
    .then((data2) => {
      mainContainer.innerHTML = "";
        let data = [];
        for (let i = 0; i < 16; i++) {
          const restaurantsData = data2?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (restaurantsData) {
            data = restaurantsData;
            break;
          }
        }
        for (let item of data) {
        const product = document.createElement("div");
        product.innerHTML = `
        <div class="product-container">
        <img src="${FOOD_IMAGE_URL + item.info.cloudinaryImageId}" alt="">
        <div>
            <h2 style="height:30px; overflow:hidden">${item.info.name}</h2>
            <p style="height:45px; overflow:hidden; margin:5px 0px">${item.info.cuisines.join(", ")}</p>
            <div style="display:flex; align-items:center "><h5 style="background-color:${ratingColor(item.info.avgRating)}; color:white; padding:10px; border-radius:5px; margin-right:5px;">${item.info.avgRating ? item.info.avgRating : 0} <i class="fa-regular fa-star" style=""></i></h5><h5 style="font-size:18px; padding:5px">${item.info.costForTwo}</h5><h5 style="font-size:18px; padding:5px">${item.info.locality}</h5></div>
            
        </div>
    </div>`;
        mainContainer.appendChild(product);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

window.addEventListener('load', renderProduct)
