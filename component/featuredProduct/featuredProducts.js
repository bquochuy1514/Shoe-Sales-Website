import html from "../../core.js";
import { connect } from "../../store.js";

const connector = connect()

function featuredProducts({products}) {
    return html `
        <h1> Hello </h1>
    `
}

// ${products.map(product => console.log(product))}

export default connector(featuredProducts)