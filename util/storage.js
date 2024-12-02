const PRODUCTS_STORAGE_KEY = 'PRODUCTS';

export default {
    get() {
        // Lấy danh sách sản phẩm từ localStorage
        return JSON.parse(localStorage.getItem(PRODUCTS_STORAGE_KEY)) || [];
    },
    set(products) {
        // Lưu danh sách sản phẩm vào localStorage
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    },
};
