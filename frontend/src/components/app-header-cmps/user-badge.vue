<template>
  <!-- <el-badge value="new" class="item"> -->
  <section class="relative">
    <div @click="openUserBar" class="user-badge flex align just space">
      <span class="badge-hamburger">☰</span>
      <el-badge :value="notification" class="item">
        <svg
          v-if="!user"
          class="host-img"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style="display: block; height: 80%; width: 80%; fill: currentcolor"
        >
          <path
            d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
          ></path>
        </svg>
        <img v-else class="badge-image" :src="userImg" alt="" />
      </el-badge>

      <!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfdGOYPCcbada6QNqTauI3LH-SpptOXVrA&usqp=CAU" -->
    </div>
    <!-- <div class="relative"> -->
    <!-- </div> -->
    <login-modal
      v-if="isLoginModal"
      @closeLogin="closeLogin"
      @closeMenu="closeMenu"
    />
    <signup-modal
      v-if="isSignupModal"
      @closeSignup="closeSignup"
      @closeMenu="closeMenu"
    />
    <user-menu
      @openSignupModal="openSignup"
      :user="user"
      :notification="notification"
      v-if="isMenuOpen"
      @closeMenu="closeMenu"
      @openLogin="openLogin"
      @readNotification="readNotification"
      class="open-user-menu"
    ></user-menu>
  </section>
  <!-- </el-badge> -->
</template>

<script>
import userMenu from './user-menu-cmp.vue';
import SignupModal from './signup-modal.vue';
import loginModal from './login-modal.vue';

export default {
	name: 'user-badge',
	data() {
		return {
			user: this.getUser,
			isMenuOpen: false,
			isLoginModal: false,
			isSignupModal: false,
			notification: '',
		};
	},
	async created() {
		this.user=this.getUser
		await this.getChats()
		this.chats=this.allChats
    	socketService.on('notification', this.addMsg);
	},
	destroyed() {
    	socketService.off('notification');
  	},
	methods: {
		openUserBar() {
			this.user = this.$store.getters.user;
			console.log('opening');
			this.user = this.$store.getters.user;
			this.isMenuOpen = true;
		},
		async logout() {
			await this.$store.dispatch({ type: 'logout' });
		},
		closeMenu() {
			console.log('closing');
			this.isMenuOpen = false;
		},
		openLogin() {
			this.isLoginModal = true;
			this.isMenuOpen = false;
		},
		openSignup() {
			this.isSignupModal = true;
			this.isMenuOpen = false;
		},
		closeSignup() {
			this.isSignupModal = false;
		},
		closeLogin() {
			console.log('closing');
			this.isLoginModal = false;
		},
		setSocket() {
			this.loggedUser = this.getUser;
			if (!this.loggedUser) return;
			console.log(this.getUser);
			socketService.emit('topic', this.loggedUser._id);
			socketService.on('add order', this.createNotification);
		},
		createNotification() {
			console.log('creating notification', this.user);
			this.notification = 'New Order!';
		},
		readNotification() {
			this.notification = '';
		},
		async getChats(){
			const chats = await this.$store.dispatch({type:"getAllChat", userId:this.user._id})
			this.$store.commit({ type: 'setCurChat', topic:this.user._id+'-000' })      
		},
		chatNotification(){
			console.log('watch all chats!!!!');
			this.allChats.forEach(chat=>{
				var users = [chat.user1,chat.user2]
				const curUser =users.filter(user => user._id===this.user._id)[0]
				if(chat.msgs.length===0) return
				const lastMsgId = chat.msgs[chat.msgs.length - 1]._id;
				if(curUser.lastSeenMsg===lastMsgId){
					return 
				}
				this.notification = 'New Msg!';
				return 
			})
		},
		addMsg(data){
			console.log('socketttttttt barrrrrrrr',data);
			this.$store.commit({ type: 'saveMsg', msg: data.msg,topic:data.topic })
			this.chatNotification();
		},
	},
	computed: {
		getUser() {
			return this.$store.getters.user;
		},

		userImg() {
			return this.user.imgUrl;
		},
		allChats(){
      		return this.$store.getters.chats;
    	},
	},
	watch: {
		getUser: 'setSocket',
		allChats:'chatNotification',
	},
	components: {
		userMenu,
		SignupModal,
		loginModal,
	},
};
</script>
