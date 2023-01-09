
const { createApp } = Vue;
const app = {
    data() {
        return {
            products: [],
            temp: {},
            apiPath: 'abc111',
            url: `https://vue3-course-api.hexschool.io/v2/`,
        }
    },
    mounted() {
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
                    console.log(res.data)
                })
                .catch(err => alert(err.response.data.message))
        }
    },
}
createApp(app).mount('#app');
