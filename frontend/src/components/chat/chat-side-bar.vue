<template>
  <div class="chat-thumbnail" v-if="otherUser">
    <img class="chat-user-img" @click="setTopic" :src="otherUser.imgUrl" />
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
  },
  destroyed() {
   
  },
  computed:{

  },
  methods: {
   getOtherUser(){
     var users = [this.chat.user1,this.chat.user2]
     this.otherUser = users.filter(user => user._id!==this.user._id)[0]
   },
   setTopic(){
     this.$emit('setTopic', this.chat.topic)
   }
  }
};
</script>

