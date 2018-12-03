<template>
  <div class="cart container">
    <h2 @click="checkItems"> {{user.id}}'s Cart </h2>
    <p class="item_quantity">총 <span>{{cartitems.length}}</span>개의 상품</p>

    <table class="cart_table">
        <tr class="table title">
            <th v-for="(column,index) in columns" :key="column.index">{{column}}</th>
            <th>　　</th>
        </tr>

        <tr v-for="cartitem in cartitems" :key="cartitem.id" class="table_value">
            <td>{{cartitem.id}}</td>
            <td>{{cartitem.user}}</td>
            <td>{{cartitem.product_id}}</td>
            <td>{{cartitem.title}}</td>
            <td>{{cartitem.color}}</td>
            <td>{{cartitem.size}}</td>
            <td>{{addComma(cartitem.price)}}</td>
            <td>{{cartitem.quantity}}</td>
            <td>{{addComma(cartitem.total)}}</td>
            <td><i class="material-icons delete_btn"  @click="deleteCartitem(cartitem.id)">clear</i></td>
        </tr>

    </table>
    <div class="result">
      <table>
        <tr>
          <th>총 수량</th>
          <td>{{quantitySum()}}</td>
        </tr>
        <tr>
          <th>총 금액</th>
          <td>{{addComma(priceSum())}}</td>
        </tr>
      </table>
      
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'


export default {
  name: 'cart',
  data () {
    return {
      moment: moment,
      columns:['No','User', 'Product ID', 'Title', 'Color', 'Size', 'Price', 'Quantity' ,'Total'],
      cartitems: [],
      user: null,
      matchitems:[],
      // totalPrice: null,
      // totalQuantity: null
    }
  },
  created(){
    //fetch data from the firestore
    db.collection('cartitems').get()
    .then(snapshot =>{//컬렉션 하위 문서목록지칭함.
      snapshot.forEach(doc =>{//문서목록중 doc 하나하나에 실행하기.
        //console.log(doc.data(), doc.id);
        let cartitem = doc.data()
        cartitem.id =  doc.id
        this.cartitems.push(cartitem) 
      })
      console.table(this.cartitems)
    })

    //get current user
    db.collection('users').where('user_id','==',firebase.auth().currentUser.uid).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.user =doc.data(),
            this.user.id = doc.id
        })
        console.log('get current user id')
        console.log(this.user)
        console.log(this.user.alias)

    })


    // db.collection('cartitems').get()
    // .then(querySnapshot =>{
    //   querySnapshot.forEach(doc =>{
    //     if(doc.user == this.user.alias){
    //       let cartitem = doc.data()
    //       cartitem.id =  doc.id
    //       this.cartitems.push(cartitem) 
    //     }
    //   })
    // }).catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // })

    // db.collection('cartitems').where('user', '==', this.user.alias).get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //         //console.log(doc.data());
    //         this.cartitem = doc.data()
    //         this.cartitem.id = doc.id
    //         this.cartitems.push(cartitem) 

    //     })
    //   }).catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // })
  },
  methods:{
    priceSum(){
        return this.cartitems.reduce((prev,cur) => prev + cur.total,0)
    },
    quantitySum(){
        return this.cartitems.reduce((prev,cur) => prev + cur.quantity,0)
    },
    checkItems(){
      for(var i=0; i<=this.cartitems.length; i++){
        if(this.cartitem.user == this.user.alias){
          this.matchitems.push(this.cartitem)
          console.log(this.matchitems)
        }
      }
    },
    addComma(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g
        return num.toString().replace(regexp, ',')
    },
    deleteCartitem(id){ 
        var result = confirm('장바구니 목록에서 삭제하시겠습니까?')
        if(result){
        db.collection('cartitems').doc(id).delete() //이걸로 db에선 지워짐. 
        .then(() =>{
          this.$swal({
            position: 'center',
            type: 'success',
            title: '삭제 완료',
            showConfirmButton: false,
            timer: 1000
          })
          this.cartitems = this.cartitems.filter(cartitem =>{
            return cartitem.id !=id //deleteSmoothie에서 보낸 인자 id와 아이디가 일치하지 않는다면 (ture가된다면,)리스트에 남기자.
          })
        })
        }
      
    }
  },

}
</script>

<style scoped>

table th, td{
    text-align: center;
}

.delete_btn{
    cursor: pointer;
}

.result{
  margin-top: 40px;
  width: 50%;
  float: right;
}
</style>
