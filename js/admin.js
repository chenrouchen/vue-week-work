import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let productModal = null;
let deleteModal = null;
createApp({
    data() {
        return {
            products: [],
            apiPath: 'abc111',
            url: `https://vue3-course-api.hexschool.io/v2/`,
            tempProduct: { imagesUrl: [] },
            isNew: false
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
            keyboard: false
        });
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkApi();

    },
    methods: {
        checkApi() {
            axios.post(`${this.url}api/user/check`)
                .then(() => this.getProducts())
                .catch(err => {
                    alert(err.response.data.message);
                    window.location = 'login.html';
                })
        },
        getProducts() {
            axios.get(`${this.url}api/${this.apiPath}/admin/products`)
                .then(res => {
                    this.products = res.data.products;
                })
                .catch(err => alert(err.response.data.message))
        },
        updateProduct() {
            let api = `api/${this.apiPath}/admin/product`;
            let http = 'post';
            //判斷是否為修改產品
            if (!this.isNew) {
                api = `api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }
            axios[http](`${this.url}${api}`, { data: this.tempProduct })
                .then(res => {
                    alert(res.data.message);
                    productModal.hide();
                    this.getProducts();
                })
                .catch(err => alert(err.response.data.message))
        },
        openModal(state, item) {
            if (state === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();

            } else if (state === 'edit') {
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();

            } else if (state === 'delete') {
                this.tempProduct = { ...item };
                deleteModal.show();
            }
        },
        deleteProduct(id) {
            axios.delete(`${this.url}api/${this.apiPath}/admin/product/${id}`)
                .then(res => {
                    alert(res.data.message);
                    deleteModal.hide();
                    this.getProducts();
                })
                .catch(err => alert(err.response.data.message))
        },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        }
    },
}).mount('#app');
