import storage from "./util/storage.js";

console.log('reducer');

const init = {
    products: storage.get()
};

const actions = {
    add({ products }, args) {
        const { name, price, image, desc, quantity } = args;

        // Kiểm tra sản phẩm đã tồn tại
        const existingProduct = products.find(product => product.name === name);

        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại, cộng dồn số lượng
            existingProduct.quantity = parseInt(existingProduct.quantity || 1) + parseInt(quantity || 1);
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            products.push({
                name,
                price,
                image,
                desc,
                quantity: parseInt(quantity) || 1, // Số lượng mặc định là 1
            });
        }

        // Lưu lại vào localStorage
        storage.set(products);
    },
    
    remove({ products }, index) {
        products.splice(index, 1);
        storage.set(products);
    },

    updateProduct({ products }, ...first) {
        const [newProduct, index] = first;
        products[index] = newProduct;
        storage.set(products);
    },

    showDetails({ products }, index) {
        const product = products[index];
        if (product) {
            const modal = document.querySelector('.modalDetails');
            const imgElement = modal.querySelector('.productImageDetails');
            const nameElement = modal.querySelector('.details h2');
            const priceElement = modal.querySelector('.details h3');
            const descElement = modal.querySelector('.details span');
            const quantityElement = modal.querySelector('.box__quantity .quantity');
    
            nameElement.innerHTML = product.name;
            imgElement.src = product.image;
            priceElement.innerHTML = `${product.price}₫`;
            descElement.innerHTML = product.desc;
            quantityElement.innerHTML = product.quantity;
        }
    }
    ,

    getDesc({ products }, index) {
        const desc = products[index].desc;
        return desc;
    }
};

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);
    return state;
}
