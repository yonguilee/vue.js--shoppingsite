<template>
  <div class="navbar">
    <nav class="navbox grey darken-3">
        <div class="container">
          <router-link :to="{name : 'Index'}" class="brand-logo left">Awesome Shop</router-link>

          <ul class="right">
            <li><router-link :to="{name : 'Add'}">상품등록</router-link></li>
            <li><router-link :to="{name : 'Cart'}"><i class="material-icons white-text">local_grocery_store</i></router-link></li>
            <!-- <li><router-link :to="{name : 'Wish'}"><i class="material-icons white-text">favorite</i></router-link></li> -->
            <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
            <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
            <li v-if="user"><a>{{user.email}}</a></li>
            <li v-if="user"><a @click="logout">Logout</a></li>
          </ul>
        </div>
    </nav>  
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data () {
    return {
      user: null
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Index'})
        
      })
    }
  },
  created(){
    //let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){//user 값이 null이 아니라면(=로그인된상태라면)
        this.user = user
        console.log(user);
      }else {//로그아웃된 상태라면 
        this.user = null
      }
    })


  }
}
</script>


<style scoped>

.navbar input{
 width: 200px;
 float: right;
  
}

.left_menu li{

  
}
</style>

