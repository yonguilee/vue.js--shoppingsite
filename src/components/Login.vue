<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
        <h2 class="center">Login</h2>

        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
        </div>
        <p v-if="feedback" class="red-text center">{{feedback}}</p>
        <div class="field center btn_field">
            <button class="btn waves-effect waves-light deep-orange lighten-1">Login</button>
        </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
        email: null,
        password: null,
        feedback: null
    }
  },
  methods: {
      login(){
          //console.log(this.email, this.password)
          if(this.email && this.password){
              firebase.auth().signInWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                  //console.log(cred.user)
                  this.$router.push({name: 'Index'})//로그인완료된 후에는 메인페이지이동
              }).catch(err => {
                  this.feedback = err.message
              })
              this.feedback = null;//feedback 초기화
          }else{
              this.feedback = '아이디와 비밀번호를 입력해주세요.'
          }
      }
  }
}
</script>

<style>

.login {
    max-width: 400px;
    margin-top: 60px;
}

.btn_field{
    margin: 40px 0 16px 0;

}

</style>

