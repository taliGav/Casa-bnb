<template>
  <div class="login-modal-container">
    <div class="signup-modal">
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

export default {
	name: 'reservations-office',
	props: {
    topic: String,
    user: Object,
  },
	data() {
		return {
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
    // socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    // socketService.terminate();
  },
  computed:{

  },
  methods: {
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
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    }
  }
};
</script>
<style></style>
