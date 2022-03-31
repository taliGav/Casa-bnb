<template>
  <div class="login-modal-container">
    <div class="signup-modal">
      <ul>
        <li v-for="(msg, idx) in msgs" :key="idx">
          <span>{{ msg.from }}:</span>{{ msg.txt }}
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
    topic: Object,
    user: Object,
  },
	data() {
		return {
			msg: {from: this.user.fullname, txt: ''},
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
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg = {from: this.user.fullname, txt: ''};
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    }
  }
};
</script>
<style></style>
