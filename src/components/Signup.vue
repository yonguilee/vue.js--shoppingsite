<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
        <h2 class="center">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
        <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias">
        </div>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
        <div class="field center">
            <button class="btn waves-effect waves-light deep-orange lighten-1">Signup</button>
        </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
        email: null,
        password: null,
        alias: null,
        feedback: null,
        slug: null
    }   
  },
  methods: {
      signup(){
        if(this.alias && this.email &&this.password){//세 값이 입력된다면
            //slugify로 만들어서 아이디로 구분할 것. 
            this.slug = slugify(this.alias, {
                replacement : '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
            })
            //이 별명이 이미 사용된건지 확인하는 절차 필요. 
            let ref = db.collection('users').doc(this.slug)
            ref.get().then(doc => {
                if(doc.exists){//doc이 존재한다면(=this.slug과 같은 게 있다면)
                    this.feedback ='이미 사용된 별명입니다.'
                } else {
                    //중복되지않는 정보라면, firebase auth에 새롭게 등록하는 절차 진행해야함. 
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred =>{//firebase 5.0 부터는 cred를 인자로 줘야함. 
                        //console.log(cred.user)
                        ref.set({ //can set some propety to the record
                            alias: this.alias,
                            user_id: cred.user.uid
                        })
                    }).then(() =>{//리다이렉트하기
                        this.$router.push({name: 'Index'})
                    })
                    .catch(err =>{
                        console.log(err)
                        this.feedback = err.message

                    })
                    this.feedback = '등록중입니다. 잠시만 기다려주세요' 
                    this.$swal({
                    position: 'center',
                    type: 'success',
                    title: '회원가입을 축하합니다.',
                    showConfirmButton: false,
                    timer: 2000
                 })
                }
            })
            //console.log(this.slug);
        } else{
            this.feedback = "별명을 입력해주세요."
        }
      }
  }
}
</script>

<style>

.signup{
    max-width: 400px;
    margin-top: 60px;
}

.signup .field{
    margin-bottom: 16px;
}
</style>
