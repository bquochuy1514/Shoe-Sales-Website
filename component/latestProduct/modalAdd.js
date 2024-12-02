import html from "../../core.js";

import { connect } from "../../store.js";

const connector = connect()

function modalAdd() {
    
    return html `
        <div class="modal hide">
            <div class="modal__inner">
                <div class="modal__header">
                    <span>Add product to Shoe store</span>
                    <div class="closeModalBtn">&times</div>
                </div>
                <div class="modal__body">
                    <form action="javascript:void(0);">
                        <div class="image">
                            <img src="./assets/images/shoes_4847893.png" alt="">
                        </div>
                        <div class="inputBox">
                            <input type="text" name="" id="productName" placeholder="Product Name">
                        </div>
                        <div class="inputBox">
                            <input type="text" name="" id="productPrice" placeholder="Product Price">
                        </div>
                        <div class="inputBox">
                            <input type="text" name="" id="productDesc" placeholder="Product Description">
                        </div>
                        <div class="inputBox">
                            <input type="text" name="" id="productImage" placeholder="Product image link address (No Background!)">
                        </div>
                        <div class="inputBox">
                            <input type="number" name="" id="productQuantity" placeholder="Product Quantity">
                        </div>
                        <div class="addbtn">
                            ADD PRODUCT
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}

export default connector(modalAdd)