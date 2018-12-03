<template>
  <div class="container">
    <h2>Item List</h2>
    <p class="item_quantity">총 <span>{{items.length}}</span>개의 상품</p>
    <div class="edit_delete">
      <a href="#" @click="editbtn=true">Edit</a>
      <a href="#" @click="deletebtn=true">Delete</a>
    </div>
    <div class="index">
      <div class="card" v-for="item in items" :key="item.id">
          <div class="card-image">
              <img src="@/assets/1.jpg">
          </div>
          <div class="card-content">

              <router-link :to="{ name: 'Detail', params: {item_slug: item.slug}}">
                  <h3>{{item.title}}</h3>
              </router-link>

              <p class="price">{{addComma(item.price)}}</p>

              <div class="divider"></div>

              <p class="writer">{{item.writer}}</p>
              <p class="cont">{{item.content}}</p>
                    
              <ul class="tags">
                  <li v-for= "(tag,index) in item.tags" :key="index">
                    <span class="tag">#{{tag}}</span>
                  </li>
              </ul>
              <p class="date">{{moment(item.date).format(' Y. M. D')}}</p>
              
              <div class="divider"></div>
                <ul class="left_icon">
                  <li v-show="deletebtn" @click="deleteItem(item.id)">
                    <i class="material-icons  grey-text delete">delete_forever</i>
                  </li>
                  <li v-show="editbtn" >
                    <router-link :to="{ name: 'Edit', params: {item_slug: item.slug}}">
                      <i class="material-icons  grey-text">edit</i>
                    </router-link>
                  </li>
                </ul>
                <ul class="right_icon">
                    <li @click="addWish(item.id)"><i class="material-icons grey-text">favorite</i></li>
                    <li><i class="material-icons pink-text">favorite</i></li>
                    <li><router-link :to="{ name: 'Detail', params: {item_slug: item.slug}}"><i class="material-icons grey-text">local_grocery_store</i></router-link></li>
                </ul>
              </div>

          </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'


export default {
  name: 'Index',
  data () {
    return {
      moment: moment,
      deletebtn: false,
      editbtn: false,
      items: []
    }
  },
  methods: {
    addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g
      return num.toString().replace(regexp, ',')
    },
    deleteItem(id){ 
      db.collection('items').doc(id).delete()
      .then(() =>{
        this.items = this.items.filter(item =>{
          return item.id !=id 
        })
         this.$swal({
            position: 'center',
            type: 'success',
            title: '삭제 완료',
            showConfirmButton: false,
            timer: 1000
        })
        this.deletebtn=false
      })
      
    },
    addWish(id){        
    db.collection('wishitems').add({
        item_id: this.item.id,
        item_slug: this.item.slug,
        user: this.user.id
    }).then(() => {
    this.$swal({
        position: 'center',
        type: 'success',
        title: '찜 완료',
        showConfirmButton: false,
        timer: 1000
    })
    this.$router.push({ name: 'Wish'})
    }).catch(err => {
        console.log(err);
    })
    }

  },
  created(){
    //fetch data from the firestore
    db.collection('items').get()
    .then(snapshot =>{//컬렉션 하위 문서목록지칭함.
      snapshot.forEach(doc =>{//문서목록중 doc 하나하나에 실행하기.
        let item = doc.data()
        item.id =  doc.id
        this.items.push(item)
      })
    })

    //get current user
    db.collection('users').where('user_id','==',firebase.auth().currentUser.uid).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.user =doc.data(),
            this.user.id = doc.id
        })
        console.log('get current user id')
        console.log(this.user.id)
    })
  }
}
</script>

<style scoped>
.edit_delete{
  overflow:hidden;
}
.edit_delete a{
  display: inline-block;
  float: right;
  border: 1px solid #eee;
  border-radius: 10px;
  padding:5px 10px;
  margin: 5px 5px;
  color:#666;
  font-weight: bold;
}

.edit_delete a:hover{
 color: #ff7657;
}

h2{
  color: #ff7657;
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
}
.item_quantity{
  text-align: center;
}
.item_quantity span{
  font-weight: bold;
}
.index{
  border-top: 2px solid #ccc;
  padding-top:40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

.divider {
    margin: 10px 0;
}
.index h3{
  font-size: 1.2em;
  margin:0;
  font-weight: bold;
  color: #ff7657;
}
.index .price{
    font-size: 1.6em;
    margin-top: 10px;  
}

.cont{
    height: 90px;
    padding: 10px 0 0 0;
}
.index .date{
    color: grey;
    text-align: right;
}
.index .colors{
  margin: 30px auto;
}

.index .colors li{
  display: inline-block;
}

.index ul{
  margin: 0;
}
.index .tags {
    margin: 10px 0;
}
.index .tags li{
  display: inline-block;
  margin-right: 10px;
}
.index .tags li:hover{
  color: #ff7657;
  cursor: pointer;
  text-decoration: underline;
}
.index .right_icon{
  float: right;
}
.index .left_icon li{
  display: inline-block;
  cursor: pointer;
  padding :5px 10px 10px 10px;
}
.index .left_icon{
  float: left;
}

.index .right_icon li{
    display: inline-block;
    cursor: pointer;
    padding :5px 10px 10px 10px;
    float: right;
}


.index .delete{
  cursor: pointer;
  color: #aaa;
}
</style>
