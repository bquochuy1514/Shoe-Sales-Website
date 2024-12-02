import html from "../../core.js";

import { connect } from "../../store.js";

const connector = connect()

function modalRemove() {
    
    return html `
        <div class="modalRemove hide">
            <div class="modalRemoveInner">
                <div class="modalRemoveInner__btn">&times</div>
                <h1>Are you sure you want to remove this product?</h1>

                <div class="modalRemove__removeBtn">
                    <div class="modalRemove__removeBtn--accept">
                        Yes
                    </div>
                        
                    <div class="modalRemove__removeBtn--reject">
                        No
                    </div>
                </div>
            </div>
        </div>
    `
}

export default connector(modalRemove)