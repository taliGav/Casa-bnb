<template>
  <div class="chat-thumbnail" v-if="otherUser">
    <el-badge :value="notification" class="item">
      <img class="chat-user-img" @click="setTopic" :src="otherUser.imgUrl" />
    </el-badge>
  </div>
</template>

<script>

export default {
	name: 'chat-side-bar',
	props: {
    chat: Object,
    user: Object,
  },
	data() {
		return {
      otherUser: null
		};
	},
	created() {
   console.log('chat side bar chat:',this.chat);
   this.getOtherUser()
   console.log('other',this.otherUser);
  //  socketService.emit('chat topic', this.chat.topic);
    socketService.on('notification', this.addMsg);
  },
  destroyed() {
    // socketService.off('chat addMsg');
   
  },
  computed:{
    notification(){
      const curUser = this.getUser();
      if(this.chat.msgs.length===0) return ''
      const lastMsgId = this.chat.msgs[this.chat.msgs.length - 1]._id;
      console.log('notification',curUser);
      console.log('notification',lastMsgId);
      if(curUser.lastSeenMsg===lastMsgId){
        return ''
      }
      return '!'
    },
  },
  methods: {
   getOtherUser(){
     var users = [this.chat.user1,this.chat.user2]
     this.otherUser = users.filter(user => user._id!==this.user._id)[0]
   },
   getUser(){
     var users = [this.chat.user1,this.chat.user2]
     return users.filter(user => user._id===this.user._id)[0]
   },
   setTopic(){
     this.$emit('setTopic', this.chat.topic)
   },
   addMsg(data){
     console.log('socketttttttt barrrrrrrr',data);
      this.$store.commit({ type: 'saveMsg', msg: data.msg,topic:data.topic })
    
   }
   
  }
};
</script>

