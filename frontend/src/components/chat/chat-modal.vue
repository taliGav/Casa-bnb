<template>
  <div v-if="chats" class="chat-modal-container">
    <div class="chat-modal">
      <div class="chat-sider-bar">
        <button @click="closeChat">x</button>
        <div class="chat-thumb" v-for="chat in allChats" :key="chat._id">
          <chat-side-bar @setTopic="setTopic" :chat="chat" :user="user" />
        </div>
      </div>
      <div class="main">
        <ul>
          <li v-for="(msg, idx) in chats[this.curChatIdx].msgs" :key="idx">
            <img :src="msg.by.imgUrl" />
            <span>{{ msg.by.fullname }}:</span>{{ msg.txt }}
          </li>
        </ul>
      </div>
      <div class="input">
        <form @submit.stop.prevent="sendMsg">
          <input type="text" v-model="msg.txt" placeholder="Your msg" />
          <button>Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import chatSideBar from './chat-side-bar.vue'
export default {
	name: 'chat-modal',
	props: {
    topic: String,
    user: Object,
  },
	data() {
		return {
      chats:null,
      curTopic: this.topic,
			msg: {
      txt: '',
      by:{
        _id: this.user._id,
        fullname: this.user.fullname,
        imgUrl: this.user.imgUrl,
      },
      },
      		msgs: [],
		};
	},
	async created() {
    await this.getChats()
    this.chats=this.allChats
    console.log('chat modal chats:',this.chats);
    socketService.emit('chat topic', this.curTopic);
    socketService.on('chat addMsg', this.addMsg);
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
  },
  computed:{
    allChats(){
      return this.$store.getters.chats;
    },
    curChatIdx(){
      return this.$store.getters.curChatIdx;
    },
  },
  methods: {
    closeChat(){
      this.$emit('closeChat');
    },
    addMsg(msg) {
      console.log('socketttttttt');
      this.$store.commit({ type: 'saveMsg', msg: msg })
      // this.chats[this.curChatIdx].msgs.push(msg);
    },
    async sendMsg() {
      this.msg.createdAt= Date.now();
      console.log('Sending', this.msg);
      const msg = await this.$store.dispatch({type:"addMsg", msg:this.msg, topic:this.curTopic});
      console.log('Sending got', msg);
      socketService.emit('chat newMsg', msg);
      this.msg.txt='';
    },
    setTopic(topic) {
      console.log('chat topic:',topic);
      this.curTopic = topic;
      this.$store.commit({ type: 'setCurChat', topic })
      console.log('chat chat:',this.curChatIdx);
      socketService.emit('chat topic', topic);
    },
    async getChats(){
      const chats = await this.$store.dispatch({type:"getAllChat", userId:this.user._id})
      this.$store.commit({ type: 'setCurChat', topic:this.curTopic })      
    }
  },
  components: {
		chatSideBar
	},
};
</script>
<style></style>
