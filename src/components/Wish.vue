<template>
<div>
  <h2> {{user.id}}'s WishList</h2>
  <ul>
    <li v-for="wishitem in wishitems" :key="wishitem.id">{{wishitem.item_id}} / {{wishitem.item_slug}} /{{wishitem.user}}</li>
  </ul>
  <div class="wish container">
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
                <ul class="icons">
                    <li @click="deleteWishitem(item.id)"><i class="material-icons pink-text">favorite</i></li>
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
  name: 'Wish',
  data () {
    return {
      moment: moment,
      items: [],
      wishitems: [],
      user: null,
      wishitem: null
    }
  },
  methods: {
   addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g
      return num.toString().replace(regexp, ',')
    },
    deleteWishitem(id){ 
        var result = confirm('찜 목록에서 삭제하시겠습니까?')
        if(result){
        db.collection('wishitems').where('slug','==',item.sulg).delete() //이걸로 db에선 지워짐. 
        .then(() =>{
          this.$swal({
            position: 'center',
            type: 'success',
            title: '삭제 완료',
            showConfirmButton: false,
            timer: 1000
          })
          this.items = this.items.filter(cartitem =>{
            return wishtem.slug !=item.slug //deleteSmoothie에서 보낸 인자 id와 아이디가 일치하지 않는다면 (ture가된다면,)리스트에 남기자.
          })
        })
        }
      
    }
  },
  created(){
    //get current user
    db.collection('users').where('user_id','==',firebase.auth().currentUser.uid).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.user =doc.data()
            this.user.id = doc.id
        })
        console.log('get current user id')
        console.log(this.user.id)
    })

    db.collection('wishitems').get()
    .then(snapshot =>{//컬렉션 하위 문서목록지칭함.
      snapshot.forEach(doc =>{//문서목록중 doc 하나하나에 실행하기.
        //console.log(doc.data(), doc.id);
        let wishitem = doc.data()
        wishitem.id =  doc.id
        this.wishitems.push(wishitem) 
      })
    })

    // db.collection('items').get()
    // .then(querySnapshot =>{//컬렉션 하위 문서목록지칭함.
    //   querySnapshot.forEach(doc =>{
    //     if(doc.slug == this.wishitems.item_slug && this.wishitems.user == this.user.alias){
    //       let item = doc.data()
    //       item.id =  doc.id
    //       this.items.push(item) 
    //     }
    //   })
    // }).catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // })
  }
}
</script>

<style scoped>

.wish{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.divider {
  margin: 10px 0;
}
.wish h3{
  font-size: 1.2em;
  margin:0;
  font-weight: bold;
  color: #ff7657;
}
.wish .price{
  font-size: 1.6em;
  margin-top: 10px;  
}

.cont{
    height: 90px;
    padding: 10px 0 0 0;
}
.wish .date{
  color: grey;
  text-align: right;
}
.wish .colors{
  margin: 30px auto;
}

.wish .colors li{
  display: inline-block;
}

.wish ul{
  margin: 0;
}
.wish .tags {
  margin: 10px 0;
}
.wish .tags li{
  display: inline-block;
  margin-right: 10px;
}
.wish .tags li:hover{
  color: #ff7657;
  cursor: pointer;
  text-decoration: underline;
}

.wish .icons li{
  display: inline-block;
  cursor: pointer;
  padding :5px 10px 10px 10px;
  float: right;
}
.wish .delete{
  position:absolute;
  top:4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
