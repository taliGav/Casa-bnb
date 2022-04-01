<template>
  <div class="login-modal-container">
    <div class="signup-modal">
      <button @click="closeChat">x</button>
      <div v-for="chat in allChats" :key="chat._id">
        <chat-side-bar @setTopic="setTopic" :chat="chat" :user="user" />
      </div>
      <ul>
        <li v-for="(msg, idx) in msgs" :key="idx">
          <img :src="msg.by.imgUrl" />
          <span>{{ msg.by.fullname }}:</span>{{ msg.txt }}
        </li>
      </ul>
      <hr />
      <form @submit.prevent="sendMsg">
        <input type="text" v-model="msg.txt" placeholder="Your msg" />
        <button>Send</button>
      </form>
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
      chats:this.allChats,
			msg: {
      txt: '',
      topic: this.topic,
      by:{
        _id: this.user._id,
        fullname: this.user.fullname,
        imgUrl: this.user.imgUrl,
      },
      isRead: false,
      },
      		msgs: [],
		};
	},
	created() {
    this.getChats()
    console.log('chat modal chats:',this.chats);
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    // socketService.terminate();
  },
  computed:{
    allChats(){
      return this.$store.getters.chats
    },
  },
  methods: {
    closeChat(){
      this.$emit('closeChat')
    },
    addMsg(msg) {
      this.msgs.push(msg)
    },
    async sendMsg() {
      this.msg.createdAt= Date.now();
      console.log('Sending', this.msg);
      const msg = await this.$store.dispatch({type:"addMsg", msg:this.msg})
      console.log('Sending got', msg);
      socketService.emit('chat newMsg', msg)
    },
    setTopic(topic) {
      socketService.emit('chat topic', topic)
    },
    async getChats(){
      const chats = await this.$store.dispatch({type:"getAllChat", userId:this.user._id})
      console.log('chat modal chats:',chats);

    }
  },
  components: {
		chatSideBar
	},
};
</script>
<style></style>
