<template>
  <div class="detail">
   <div class="item" v-if="item">
        <div class="item-image">
            <img src="@/assets/1.jpg">
        </div>
        
        <div class="item-content">
            <!-- <i class="material-icons delete" @click="deleteSmoothie(item.id)">delete</i> -->
            <div class="title_writer">
                <h3 class="grey-text">{{item.title}}</h3> 
                <p class="writer">by. {{item.writer}}</p>
            </div>
            <div class="price_date">
                <p class="price">{{addComma(item.price)}} 원</p>
                <p class="date">{{moment(item.date).format(' Y. M. D')}}</p>
            </div>
            <div class="divider"></div>

             <!--color pick-->
            <div class="color_pick">
            <h4 class="sub_title">Color </h4>
            <p v-show="item.colors.includes('Red')">
                <label>
                <input name="color" type="radio" value="Red"/>
                <span>Red</span>
                </label>
            </p>
            <p v-show="item.colors.includes('Yellow')">
                <label>
                <input name="color" type="radio" value="Yellow"/>
                <span>Yellow</span>
                </label>
            </p>
            <p v-show="item.colors.includes('Green')">
                <label>
                <input name="color" type="radio"  value="Green"/>
                <span>Green</span>
                </label>
            </p>
            <p v-show="item.colors.includes('White')">
                <label>
                <input name="color" type="radio"  value="White"/>
                <span>White</span>
                </label>
            </p>
            <p v-show="item.colors.includes('Black')">
                <label>
                <input name="color" type="radio"  value="Black"/>
                <span>Black</span>
                </label>
            </p>
            </div>
             <!--size pick-->
            <div class="size_pick">
                <h4 class="sub_title">Size </h4>
                <p>
                    <label>
                    <input name="size" type="radio"  value="S"/>
                    <span>S</span>
                    </label>
                </p>
                <p>
                    <label>
                    <input name="size" type="radio"  value="M"/>
                    <span>M</span>
                    </label>
                </p>
                <p>
                    <label>
                    <input name="size" type="radio" value="L"/>
                    <span>L</span>
                    </label>
                </p>
            </div>
            <!--quantity pick-->
            <div class="quantity_pick">
                <h4 class="sub_title">Quantity </h4>
                <div class="quantity_box">
                    <i class="material-icons" @click="subtractQuantity">remove</i>
                    <span class="quantity_value">{{quantityNumber}}</span>
                    <i class="material-icons" @click="addQuantity">add</i>                    
                </div>
            </div>
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <a class="waves-effect waves-light btn deep-orange lighten-1 adding_btn" @click="addingList">추가하기</a>
            <!--listing items-->
            <div class="listing" v-if="listing_item">
                <div class="divider"></div>
                <table class="detail_table">
                    <tr class="table title">
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    <tr class="table_value">
                        <td>{{colorValue}}</td>
                        <td>{{sizeValue}}</td>
                        <td>{{quantityValue}}</td>
                        <td>{{addComma(total)}}</td>
                    </tr>
                </table>
                <p class="listing_reset" @click="resetList">선택 초기화</p>
                <p class="hide">{{item.id}}</p>
                <p class="hide">{{user.id}}</p>
            </div>
            <div class="icons">
                <a class="waves-effect waves-light btn deep-orange lighten-1" @click="addWish">찜하기</a>
                <a class="waves-effect waves-light btn deep-orange lighten-1" @click="addCart">장바구니에 담기</a>
            </div>
                  
        </div>
    </div>
    <div class="description">
        <div class="divider"></div>
        <h4 class="sub_title">Description </h4>
        <p class="cont">{{item.content}}</p>
                
        <ul class="tags">
            <li v-for= "(tag,index) in item.tags" :key="index">
            <span class="tag">#{{tag}}</span>
            </li>
        </ul>
    </div> 
    <comment></comment>      
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'
import moment from 'moment'
import comment from '@/components/Comment'

export default {
  name: 'Detail',
  components: {
      comment
  },
  data () {
    return {
        moment: moment,
        item: null,
        quantityNumber: 0,
        listing_item: false,
        colorValue: null,
        sizeValue: null,
        quantityValue: null,
        total: null,
        feedback: null,
        user: null
    }
  },
  created(){
    //get item data 
    let ref = db.collection('items').where('slug', '==', this.$route.params.item_slug)
    ref.get().then(snapshot => {
        console.log("items collection call where slug!!!!!!!!"),
        snapshot.forEach(doc => {
            //console.log(doc.data());
            this.item = doc.data()
            this.item.id = doc.id
        })
    })

    let currentuseruid = firebase.auth().currentUser.uid;
    //get current user
    db.collection('users').where('user_id', '==', "currentuseruid").get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.user =doc.data(),
            this.user.id = doc.id
        })
        console.log('get current user id')
    })
  },
  methods: {
    addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g
    return num.toString().replace(regexp, ',')
    },
    addQuantity(){
        if (this.quantityNumber>=0){
            this.quantityNumber++
        }
    },
    subtractQuantity(){
        if (this.quantityNumber>0){
            this.quantityNumber--
        }
    },
    addingList(){
    //get color value
    var colors = document.getElementsByName('color')
    var colorValue
    for(var i=0; i<colors.length; i++) {
        if(colors[i].checked) {
            this.colorValue = colors[i].value
        }
    }
    //get size value
    var sizes = document.getElementsByName('size')
    var sizeValue; 
    for(var j=0; j<sizes.length; j++) {
        if(sizes[j].checked) {
            this.sizeValue = sizes[j].value
        }
    }
    //get quantity value
    this.quantityValue = this.quantityNumber
    
    if(this.colorValue && this.sizeValue && this.quantityValue){
        this.listing_item =true
        this.feedback=null
        this.total = this.item.price * this.quantityValue            

    } else {
        this.feedback = ' 원하시는 색상, 사이즈, 수량을 선택해주세요.'
    }
    },
    resetList(){
        this.feedback= null
        this.colorValue= null
        this.sizeValue= null
        this.quantityValue= null
        this.total= null
        this.quantityNumber= 0
        //document.getElementsByName('size').checked = false
        this.listing_item = false
    },
    addCart(){ 
    if(this.listing_item){
        this.feedback=null
        db.collection('cartitems').add({
            title: this.item.title,
            price: this.item.price,
            product_id: this.item.id,
            color: this.colorValue,
            size: this.sizeValue,
            quantity: this.quantityValue,
            total:this.total,
            user: this.user.id
        }).then(() => {
        this.$swal({
            position: 'center',
            type: 'success',
            title: '장바구니 담기 완료',
            showConfirmButton: false,
            timer: 1000
        })
        this.$router.push({ name: 'Cart'})
        }).catch(err => {
            console.log(err);
        })

        }else {
            this.feedback= '장바구니 담기 실패. Try it again Please!'
        }
    },
    addWish(){        
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
  }
}
</script>


<style scoped>
.detail{
    width: 80%;
    margin: 60px auto;
}
.item{
    width: 100%;
    overflow: hidden;
}
.item .item-image img{
    width: 40%;
    float: left;
    margin-top: 50px;
}
.item .item-content{
    width: 60%;
    float: right;
    padding: 0 50px 0 50px;
}
.item .item-content h3{
    font-size: 2em;
    display:inline-block;
    margin:0 20px 5px 0;
}
.writer{
    display:inline-block;
    margin:0 0 5px 0;
    color: #666;
}
.item .item-content h2 span{
    font-size: 1em;
}

.price_date .price{
    font-size: 1.6em;
    font-weight: bold;
    margin: 10px 0 0 0 ;
    width: 50%;
    display: inline-block;
}
.price_date .date{
    text-align: right;
    margin: 0;
    display: inline-block;
    width: 48%;
}
.divider {
    margin: 20px 0;
}
.tags li{
  display: inline-block;
  margin-right: 10px;
}
.tags li:hover{
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
.color_pick span{
    padding-left: 25px;
    font-size: 1.6em;
}
.color_pick {
    margin-bottom: 20px;
}
.color_pick p{
    display: inline-block;
    margin-right: 10px;
}

.size_pick span{
    padding-left: 25px;
    font-size: 1.6em;
}
.size_pick {
    margin-bottom: 20px;
}
.size_pick p{
    display: inline-block;
    margin-right: 10px;
}

.sub_title{
  font-weight: bold;
  color:#ff7657;
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.quantity_pick .quantity_box{
    margin-top: 20px;
}
.quantity_pick .quantity_box i{
    cursor: pointer;
}
.quantity_pick .quantity_value{
    border: 1px solid #cacaca; 
    padding: 6px 10px;
    font-size: 1.4em;
    border-radius: 10px;
}

.adding_btn{
    margin-top: 20px;
}

.detail_table{
    width: 80%;
    margin-left:30px;
}
.detail_table th, td{
    text-align: center;
}
.listing{
    overflow: hidden;
}
.listing .listing_reset{
    float: right;
    cursor: pointer;
}
.detail .icons{
    margin: 40px 0;
}
.detail .icons a{
    line-height: 36px;
    text-align: center;
    margin: 0 5px;
}
.detail .icons i{
    margin-top: 2px;
}

.description{
    width: 90%;
    margin:20px auto;
}

</style>

