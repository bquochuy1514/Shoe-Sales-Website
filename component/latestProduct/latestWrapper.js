console.log('wrapperProducts')
import html from "../../core.js";
import { connect } from "../../store.js";
import latestProducts from "./latestProducts.js"; //Items
import modalAdd from "./modalAdd.js";
import modalRemove from "./modalRemove.js";
import modalEdit from "./modalEdit.js";

const connector = connect()

function latestWrapper({products}) {
    return html `
        <h1 class="heading"><span>product</span> management</h1>
        <div class="box-container">
            ${products.map((product, index) => latestProducts({product, index}))}
        </div>

        <div class ="add">
            <button class ="btn openModalBtn"> Add Product </button>
        </div>

        <div class="import">
            <label for="importExcel" class="btn">Import from Excel</label>
            <input type="file" id="importExcel" style="display: none;" accept=".xlsx" />
        </div>

        <div class="export">
            <button class="btn" onclick="exportToExcel()">Export to Excel</button>
        </div>

        ${modalAdd()}
        
        ${modalRemove()}

        ${modalEdit()}
    `
}

export default connector(latestWrapper)