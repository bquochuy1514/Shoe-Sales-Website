console.log('latestProducts')

import html from "../../core.js";
import { connect } from "../../store.js";

const connector = connect()

function latestProducts({product, index}) {
    
    return html `
        <div class="box-container__card" data-index = "${index}">
                <div class="card__heart" data-index = "${index}">
                    <i class="fa-solid fa-wrench"></i>
                </div>

                <div class="card__cart removeProductBtn" data-index="${index}">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>

                <div class="box-container__img">
                    <div class="card__img">
                        <img src="${product.image}" alt="">
                    </div>
                </div>

                <div class="card__title">
                    <span>
                        ${product.name}
                    </span>
                </div>

                <div class="card__price">
                    <span>
                        ${product.price}₫
                    </span>
                </div>

                <div class="card__action">
                    <button data-index = "${index}">See details</button>
                </div>
        </div>
    `
}


    
    export default connector(latestProducts)
    /* <div class="card__size">
        <h3>Size: </h3>
        <span>36</span>
        <span>37</span>
        <span>38</span>
        <span>39</span>
    </div>
    <div class="card__color">
        <h3>Color: </h3>
        <span class="card__color--green"></span>
        <span class="card__color--red"></span>
        <span class="card__color--black"></span>
    </div> */