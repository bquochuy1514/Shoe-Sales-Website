console.log('main')
import { attach } from "./store.js"
import latestWrapper from "./component/latestProduct/latestWrapper.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

attach(latestWrapper, document.querySelector('.products'))


// =================== Kết thúc xử lí slides ===================

window.initializeEventListeners = initializeEventListeners

// ----------------- Xử lí modal popup thêm sản phẩm ------------------
let removeIndex = null;
let editIndex = null;
function initializeEventListeners() {
    
    handleAddModal()

    handleRemoveModal()

    handleEditModal()
    
    handleDetailsModal()

    handleImportExcel()

    handleExportExcel()
}

// Gọi lại hàm này sau mỗi lần render
initializeEventListeners();

// ========================= Kết thúc modal popup =====================

function handleAddModal() {
    const openModalBtn = $(".products .openModalBtn"); // Thay bằng class thực tế
    if (openModalBtn) {
        openModalBtn.addEventListener("click", () => {
            $(".modal").classList.remove("hide");
        });
    }

    // Nút đóng modal
    const closeModalBtn = $(".closeModalBtn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            console.log('cc')
            $('.modal').classList.add('hide')
        });
    }

    //Nút xác nhận add sản phẩm
    const addBtn = $('.products .addbtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const productName = $('.modal__body #productName').value.trim();
            const productPrice = $('.modal__body #productPrice').value.replace('đ', '').replace('₫', '').trim();
            const productImage = $('.modal__body #productImage').value.trim();
            const productDesc = $('.modal__body #productDesc').value.trim();
            const productQuantity = parseInt($('.modal__body #productQuantity').value.trim(), 10) || 1;

            if (productName && productPrice && productImage && productDesc) {
                dispatch('add', {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    desc: productDesc,
                    quantity: productQuantity,
                });
            }
        });
    }

}

function handleRemoveModal() {
    //Nút mở modal xoá
    const removeProductBtns = $$('.box-container__card .removeProductBtn');
    if (removeProductBtns) {
        removeProductBtns.forEach(removeProductBtn => {
            removeProductBtn.addEventListener('click', (e) => {
                removeIndex = e.currentTarget.dataset.index; // Lưu index
                console.log(removeIndex)
                $('.modalRemove').classList.remove('hide');
            });
        });
    }

    //Nút xác nhận xoá
    const acceptRemoveBtn = $('.modalRemove__removeBtn--accept')
    if(acceptRemoveBtn) {
        acceptRemoveBtn.addEventListener('click', () => {
            if (removeIndex !== null) {
                dispatch('remove', removeIndex); // Gửi hành động xóa
                $('.modalRemove').classList.add('hide'); // Đóng modal
            }
        })
    }

    //Nút huỷ modal xoá
    const closeRemoveModal = $('.modalRemoveInner__btn')
    const noBtnRemoveModal = $('.modalRemove__removeBtn--reject')
    if (closeRemoveModal && noBtnRemoveModal) {
        closeRemoveModal.addEventListener('click', () => {
            $('.modalRemove').classList.add('hide')
        })

        noBtnRemoveModal.addEventListener('click', () => {
            $('.modalRemove').classList.add('hide')
        })
    }
}

function handleEditModal() {
    //Nút huỷ modal chỉnh sửa
   const closeEditBtn = $('.modalEditInner__btn')
   closeEditBtn.addEventListener('click', () => {
        $('.modalEdit').classList.add('hide')
   })

   //Nút mở modal chỉnh sửa 
   const editIcons = $$('.card__heart')
   if (editIcons.length > 0) {
       editIcons.forEach(editIcon => {
            editIcon.addEventListener('click', (e) => {
                editIndex = e.currentTarget.dataset.index
                const divCha = $(`.box-container__card[data-index="${editIndex}"]`)

                if(divCha) {
                    openEditModal(divCha);
                }
            })
       })
   }

   //Hàm mở modal chỉnh sửa
   function openEditModal(divCha) {
        dispatch('showDetails', editIndex);
        const editName = $('.editName')
        const editPrice = $('.editPrice')
        const editImage = $('.editImage')
        const editDesc = $('.editDesc')
        const editQuantity = $('.editQuantity')

        const name = divCha.querySelector('.card__title span').textContent.trim();
        const price = divCha.querySelector('.card__price span').textContent.replace('₫', '').trim();
        const image = divCha.querySelector('.card__img img').src;
        const desc = $('.modalDetails .details span').textContent.trim()
        const quantity = $('.modalDetails .box__quantity .quantity').textContent.trim()

        
        editName.value = name
        editPrice.value = price
        editImage.value = image
        editDesc.value = desc
        editQuantity.value = quantity
        $('.modalEdit').classList.remove('hide')
    }

    //Nút xác nhận chỉnh sửa sản phẩm (Confirm)
    const confirmEditBtn = $('.confirmEditBtn')
    if(confirmEditBtn) {
        confirmEditBtn.addEventListener('click', () => {
            const editName = $('.editName').value.trim()
            const editPrice = $('.editPrice').value.replace('₫', '').trim()
            const editImage = $('.editImage').value.trim()
            const editDesc = $('.editDesc').value.trim()
            const editQuantity = $('.editQuantity').value.trim()
            
            if(editName !== '' && editPrice !== '' && editImage !== '') {
                dispatch('updateProduct', {
                    name: editName,
                    price: editPrice,
                    image: editImage,
                    desc: editDesc,
                    quantity: editQuantity
                }, editIndex)

                $('.modalEdit').classList.add('hide');
            }
        })
    }
}


function handleDetailsModal() {
    //Nút tắt Modal Details
    const closeDetailsBtn = $('.closeDetailsBtn')
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            $('.modalDetails').classList.add('hide')
        })
    }

    //Nút mở Modal Details
    const seeDetailsBtns = $$('.card__action button')
    if (seeDetailsBtns.length > 0) {
        seeDetailsBtns.forEach(seeDetailsBtn => {
            seeDetailsBtn.addEventListener('click', (e) => {
                const indexDetail = e.target.closest('.box-container__card').dataset.index
                dispatch('showDetails', indexDetail);
                $('.modalDetails').classList.remove('hide')
            })
        })
    }
}

function handleImportExcel() {
    // Hàm xử lý Import từ Excel
    function importFromExcel(event) {
        console.log('concac')
        const file = event.target.files[0];
        if (!file) {
            alert("No file selected!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet); // Chuyển đổi thành JSON

                if (jsonData.length === 0) {
                    alert("The file is empty or improperly formatted!");
                    return;
                }

                // Duyệt qua từng dòng dữ liệu trong file Excel
                jsonData.forEach(product => {
                    dispatch("add", {
                        name: product.name || "",
                        price: product.price || "",
                        image: product.image || "",
                        desc: product.desc || "",
                        quantity: parseInt(product.quantity) || 1
                    });
                });

                alert("Products imported successfully!");
            } catch (error) {
                console.error("Error importing data from Excel: ", error);
                alert("Failed to import data. Please check the file format!");
            }
        };

        reader.readAsArrayBuffer(file);
    }

    // Gắn sự kiện vào input file
    document.querySelector("#importExcel")?.addEventListener("change", importFromExcel);
}

function handleExportExcel() {
    // Hàm xuất dữ liệu từ localStorage ra file Excel
    function exportToExcel() {
        // Lấy dữ liệu từ localStorage
        const data = JSON.parse(localStorage.getItem('PRODUCTS')) || [];
        console.log('data', data)
        console.log('Export')

        if (data.length === 0) {
            alert("No data to export!");
            return;
        }

        try {
            // Chuyển đổi dữ liệu thành worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

            // Xuất file Excel
            XLSX.writeFile(workbook, "products.xlsx");
            alert("Export successful!");
        } catch (error) {
            console.error("Error exporting data: ", error);
            alert("Failed to export data to Excel.");
        }
    }

    // Gắn hàm vào window để gọi từ HTML
    window.exportToExcel = exportToExcel;
}