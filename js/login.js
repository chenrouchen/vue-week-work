const url = `https://vue3-course-api.hexschool.io/v2/`;
const { createApp } = Vue;
const app = {
    data() {
        return {
            userData: {
                username: "",
                password: ""
            }
        }
    },
    created() {

    },
    methods: {
        login() {
            axios.post(`${url}admin/signin`, this.userData)
                .then(res => {
                    alert(res.data.message);
                    const { token, expired } = res.data;
                    axios.defaults.headers.common['Authorization'] = token;
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'admin.html';

                })
                .catch(err => { alert('登入失敗,請重新登入') })
        }
    },

}
createApp(app).mount('#app');
