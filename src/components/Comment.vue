<template>
  <div class="comment">
    <div class="divider"></div>
    <h4 class="sub_title">comments <span>({{comments.length}})</span></h4>
    <div class="show_comment" v-for="(comment,index) in comments" :key="index">
        <p class="from">{{comment.from}}</p>
        <p class="timestamp">{{moment(comment.time).fromNow()}}</p>
        <!-- <p>{{moment(comment.time).format(' Y. M. D')}}</p> -->
        <p class="content">{{comment.content}}</p>
        <div class="divider"></div>
    </div>
    <div class="add_comment">
        <form @submit.prevent="addComment">
            <div>
                <label for="comment">Add a Comment</label>
                <textarea id="textarea2" class="materialize-textarea" data-length="120" v-model="newComment"></textarea>
                <p v-if="feedback" class="red-text center">{{feedback}}</p>
            </div>
            <div class="field center-align btn_box">
                <button class="btn waves-effect waves-light deep-orange lighten-1">Add Comment</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'
import moment from 'moment'

export default {
  name: 'comment',
//   props:[
//     'item_name'
//   ],
  data () {
    return {
        moment: moment,
        newComment: null,
        feedback: null,
        user: null,
        comments:[],
        //item_name: null
    }
  },
  created(){
      let ref= db.collection('users')
      //get current user
      ref.where('user_id','==',firebase.auth().currentUser.uid).get()
      .then(snapshot=>{
          snapshot.forEach(doc => {
              this.user =doc.data(),
              this.user.id = doc.id
          })
          console.log('get current user id')
      })
      //get comments data
      db.collection('comments').where('to', '==', this.$route.params.item_slug)
      .onSnapshot((snapshot)=>{//real-time 
          snapshot.docChanges().forEach(change=>{
              if(change.type =='added'){//new comment added,
                this.comments.unshift({//push to the end of the array
                    from: change.doc.data().from,
                    content: change.doc.data().content,
                    time: change.doc.data().time
                })
              }
          })
      })
      .then(snapshot => {
          snapshot.forEach(doc => {
              //console.log(doc.data());
              this.comments = doc.data(),
              this.comment.id = doc.id
          })
          console.log('get comments data')
      })
  },
  methods: {
      addComment(){
          if(this.newComment){
              this.feedback = null
              db.collection('comments').add({
                  to: this.$route.params.item_slug,
                  from: this.user.id,
                  content:this.newComment,
                  time: Date.now()
              }).then(()=>{
                  this.newComment= null
                  console.log('success!!')
              })
          }else{
              this.feedback = '댓글 내용을 입력해주세요.'
          }
      }
},

}

</script>


<style scoped>
.comment{
    margin-top: 60px;
}
.sub_title{
  font-weight: bold;
  color:#ff7657;
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em;
}
.sub_title span{
    font-size: 0.9em;
}
.show_comment{
    width: 95%;
    margin: 0 auto;
}
.show_comment p{
    display:inline-block;
}
.show_comment .from{
    font-size: 1.1em;
     color:#ff765d;
}
.show_comment .timestamp{
    font-size: 0.8em;
    color: grey;
}
.show_comment .content{
    display:block;
    padding-left: 10px;
    margin-top: 0;
}

.add_comment{
    margin-top: 30px;
}
.add_comment form{
    width: 80%;
    margin:0 auto;
}

.add_comment form button{
    margin-top:20px;
}
</style>

