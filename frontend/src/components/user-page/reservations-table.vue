<template>
  <!-- <div> -->
  <section>
    <li class="table-row" v-if="order">
      <div class="col col-1" :style="status">{{ order.status }}</div>
      <div class="col col-2">
        <div class="details">
          <p>Check in: {{ startDate }}</p>
          <p>Check out: {{ endDate }}</p>
          <p class="stay-name">{{ order.stay.name }}</p>
          <p>${{ order.totalPrice }} total</p>
        </div>
      </div>
      <div class="col col-3 flex">
        <div class="flex align just col start relative">
          <img :src="order.buyer.imgUrl" />
          <p>{{ order.buyer.fullname }}</p>
        </div>
      </div>
      <div class="col col-4">
        <div class="row-btns">
          <button @click="changeStatus('Declined')">Decline</button>
          <button @click="changeStatus('Accepted')">Accept</button>
          <button @click="openChat">Contact Guest</button>
        </div>
      </div>
    </li>
    <chat-modal
      @closeChat="isChatOpen = false"
      v-if="isChatOpen"
      :user="user"
      :topic="topic"
    />
  </section>
  <!-- </div> -->
</template>

<script>
import chatModal from '../chat/chat-modal.vue'
export default {
	name: 'reservation-table-li',
	props: {
		order: {
			type: Object,
		},
		user: {
			type: Object,
		},
	},
	data() {
		return {
			isChatOpen: false,
			topic:this.user._id +'-'+ this.order.buyer._id
		};
	},
	created() {},
	methods: {
		changeStatus(status) {
			this.$emit('changeStatus', status);
		},
		// setTopic() {
		// 	const topic = this.user._id + '-' + this.order.buyer._id;
		// 	console.log('set topic', topic);
		// 	this.$emit('setTopic', topic);
		// },
		async openChat() {
			try{
				const topic = this.user._id +'-'+ this.order.buyer._id;
				const chat = await this.$store.dispatch({type: 'getChat', topic:this.topic});
				console.log('got chat',chat);
				this.isChatOpen = true;
			}catch (err) {
                console.log('err :>> ', err)
            }
		},
	},
	computed: {
		startDate() {
			var dateObject = new Date(this.order.startDate);
			const humanDateFormat =
				dateObject.getDate() +
				'/' +
				(dateObject.getMonth() + 1) +
				'/' +
				dateObject.getFullYear();
			return humanDateFormat;
		},
		endDate() {
			var dateObject = new Date(this.order.endDate);
			const humanDateFormat =
				dateObject.getDate() +
				'/' +
				(dateObject.getMonth() + 1) +
				'/' +
				dateObject.getFullYear();
			return humanDateFormat;
		},
		status() {
			if (this.order.status === 'Pending') return { color: 'orange' };
			if (this.order.status === 'Accepted') return { color: '#3fb34f' };
			if (this.order.status === 'Declined') return { color: '#992323' };
		},
	},
	components: {
		chatModal
	},
};
</script>
<style></style>
