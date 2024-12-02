import html from "../../core.js";

import { connect } from "../../store.js";

const connector = connect()

function modalEdit() {
    
    return html `
        <div class="modalEdit hide">
            <div class="modalEditInner">
                <div class ="modalEditInner__header"> 
                    <h1>Edit product</h1>
                    <div class="modalEditInner__btn">&times</div>
                </div>

                <div class="modalEditInner__body">
                    <h1> Product Name </h1>
                    <input class = "editName" type="text" placeholder = "Product Name">
                    <h1> Product Price </h1>
                    <input class = "editPrice" type="text" placeholder = "Product Price">
                    <h1> Product Description </h1>
                    <input class = "editDesc" type="text" placeholder = "Product Description">
                    <h1> Product Quantity </h1>
                    <input class="editQuantity" type="number" placeholder="Product Quantity" min="1">

                    <h1> Product Image Link </h1>
                    <input class = "editImage" type="text" placeholder = "Product Image Link">
                </div>

                <div class="confirmEditBtn">
                    Confirm
                </div>
            </div>
        </div>
    `
}

export default connector(modalEdit)