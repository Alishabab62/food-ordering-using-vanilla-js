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

async function renderProduct() {
  await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.9579652&lng=75.7487779&page_type=DESKTOP_WEB_LISTING")
    .then((data) => {
      return data.json();
    })
    .then((data2) => {
        console.log(data2.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        mainContainer.innerHTML = "";
        let finalData = data2.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      for (let item of finalData) {
        const product = document.createElement("div");
        product.innerHTML = `
        <div class="product-container">
        <img src="${FOOD_IMAGE_URL + item.info.cloudinaryImageId}" alt="">
        <div>
            <h2 style="height:30px; overflow:hidden">${item.info.name}</h2>
            <p style="height:45px; overflow:hidden; margin:5px 0px">${item.info.cuisines.join(", ")}</p>
            <div style="display:flex; background-color:${ratingColor(item.info.avgRating)}; width:fit-content; color:white; padding:10px; border-radius:5px"><h5>${item.info.avgRating} <i class="fa-regular fa-star" style="margin-right:5px"></i></h5></div>
            
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
