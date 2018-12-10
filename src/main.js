// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'


Vue.config.productionTip = false

/* sweet alert */
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})


// firebase.auth().onAuthStateChanged(() => { //로그인, 로그아웃 등의 정보를 받은 후에 웹을 표시하기 위해 firebase가 initialized 된 후 화면이 나타나도록 설정. 
//     //init app if not already created
//     if (!app) {
//         app = new Vue({
//             el: '#app',
//             router,
//             components: { App },
//             template: '<App/>'
//         })
//     }

// })