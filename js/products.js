const apiPath = 'abc111';
const url = `https://vue3-course-api.hexschool.io/v2/`;
const token = document.cookie;
const config = {
    headers: { Authorization: token },
}
const { createApp } = Vue;
const app = {
    data() {
        return {
            products: [],
            temp: {}
        }
    },
    created() {
        if (token == "" || token == undefined) {
            alert('請先登入');
            window.location = 'login.html';
        }
        axios.get(`${url}api/${apiPath}/admin/products/all`, config)
            .then(res => this.products = Object.values(res.data.products))
            .catch(err => console.log(err))

    },
    methods: {

    },
}
createApp(app).mount('#app');
