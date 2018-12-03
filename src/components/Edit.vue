<template>
  <div class="add">
    <div class="add-item container">
    <h2 class="center-align"> Edit Item</h2>
    <form @submit.prevent="Edititem">
        <div class="row">
          <div class="input-field col s8">
            <p class="sub_title">Item Title</p>
            <input type="text" name="title" class="validate" v-model="item.title">          
          </div>
          <div class="input-field col s8">
            <p class="sub_title">Price </p>        
            <input type="text" name="price" v-model="item.price">
          </div>
          <div class="input-field col s12">
            <p class="sub_title">Description </p> 
            <textarea id="textarea2" class="materialize-textarea" data-length="120"  v-model="item.content"></textarea>
          </div>
        </div>
        <div class="row">
          <p class="sub_title">Tag </p>
          <div class="col s4">
            <input type="text" name="tag" v-model="item.tags[0]">
           <label for="tag"> Tag 1</label>
          </div>
          <div class="col s4">
            <input type="text" name="tag" v-model="item.tags[1]">
           <label for="tag"> Tag 2</label>
          </div>
          <div class="col s4">
            <input type="text" name="tag" v-model="item.tags[2]">
           <label for="tag"> Tag 3</label>
          </div>
        </div>

        <div class="divider"></div>
        <!--color pick-->
        <div class="color_pick">
          <p class="sub_title">Color </p>
          <p>
            <label>
              <input type="checkbox"  name="color"  value="Red" v-model="item.colors"/>
              <span>Red</span>
            </label>
          </p>

          <p>
            <label>
              <input type="checkbox" name="color" value="Yellow" v-model="item.colors"/>
              <span>Yellow</span>
            </label>
          </p>

          <p>
            <label>
              <input type="checkbox" name="color" value="Green" v-model="item.colors"/>
              <span>Green</span>
            </label>
          </p>

          <p>
            <label>
              <input type="checkbox" name="color" value="White" v-model="item.colors"/>
              <span>White</span>
            </label>
          </p>

          <p>
            <label>
              <input type="checkbox" name="color" value="Black" v-model="item.colors"/>
              <span>Black</span>
            </label>
          </p>
        </div>

        <div class="divider"></div>
        <div class="row quantity">
          <p class="sub_title">Size </p>
          <div class="col s4">
            <p>S</p>
            <div class="input-field inline">
              <input type="text" v-model="item.S">
            </div>
          </div>
          <div class="col s4">
            <p>M</p>
            <div class="input-field inline">
              <input type="text" v-model="item.M">
            </div>
          </div>
          <div class="col s4">
            <p>L</p>
            <div class="input-field inline">
              <input type="text" v-model="item.L">
            </div>
          </div>
        </div>

        <div class="field center-align btn_box">
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <button class="btn waves-effect waves-light deep-orange lighten-1">Update Item</button>
        </div>
    </form>
  </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
  name: 'Edit',
  data () {
    return {
      item: null,
      feedback: null
    }
  },
  methods: {
    Edititem(){ //form의 버튼을 누르면 자동으로 이 submit이 실행되나봄.
          if(this.item.title && this.item.price && this.item.content){
              this.feedback=null
              //create a slug
              this.item.slug = slugify(this.item.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g,//globally하게 지움.
                  lower: true //소문자로하기.
              })
              console.log(this.item.slug);//slug확인해보기

              db.collection('items').doc(this.item.id).update({
                  title: this.item.title,
                  price: this.item.price,
                  content: this.item.content,
                  tags: this.item.tags,
                  colors: this.item.colors,
                  S: this.item.S,
                  M: this.item.M,
                  L: this.item.L,
                  //date: Date.now(),
                  slug: this.item.slug,
                  wish: false
              }).then(() => {
                  this.$swal({
                    position: 'center',
                    type: 'success',
                    title: '수정 완료',
                    showConfirmButton: false,
                    timer: 1000
                 })
                  this.$router.push({ name: 'Index'})//메인으로 리다이렉트
              }).catch(err => {
                  console.log(err);
              })

          }else {
              this.feedback= '상품정보를 입력해주세요!'
          }
      },
  },
  created(){
    let ref = db.collection('items').where('slug', '==', this.$route.params.item_slug)
      ref.get().then(snapshot => {
          snapshot.forEach(doc => {
              //console.log(doc.data());
              this.item = doc.data()
              this.item.id = doc.id
          })
      })  
  }

}
</script>


<style scoped>
.add{
  width: 70%;
  margin:0 auto;
}
.add h2{
  color: #ff7657;
  font-size: 1.8em;
  font-weight: bold;
}
.sub_title{
  font-weight: bold;
  color: #ff7657;
}
.divider{
  margin: 40px auto;
}

.btn_box{
  margin-bottom: 40px;
}

</style>

