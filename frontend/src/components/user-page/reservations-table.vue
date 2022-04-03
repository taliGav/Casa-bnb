<template>
	<!-- <div> -->
	<section>
		<li class="table-row" v-if="order">
			<div class="col-1">
				<div
					v-if="isAccepted"
					:style="statusColor"
					class="reservation-status-sign"
				>
					<p>Accepted</p>
				</div>
				<div
					v-if="isPending"
					:style="statusColor"
					class="reservation-status-sign"
				>
					<p>Pending</p>
				</div>
				<div
					v-if="isDeclined"
					:style="statusColor"
					class="reservation-status-sign"
				>
					<p class="declined">Declined</p>
				</div>
			</div>
			<!-- <div class="col col-1" :style="status">{{ order.status }}</div> -->
			<div class="col col-2">
				<div class="reservation-details">
					<p>{{ createdAt }}</p>
					<!-- <pre>{{order}}</pre> -->
					<p>Guests {{ order.guests }}</p>
					<div class="reservation-dates flex align">
						<p class="">Check in {{ startDate }}</p>
						<img src="../../assets/icons/Casabnb-Table_v1_06.png" />
						<p class="">Check out {{ endDate }}</p>
					</div>

					<!-- <p>Check out: {{ endDate }}</p> -->
					<p class="stay-name">{{ order.stay.name }}</p>
					<p class="reservations-total-price">
						{{ toFixedPrice(order.totalPrice) }} total
					</p>
				</div>
			</div>
			<div class="col col-3 flex align start">
				<div class="flex align just col">
					<img :src="order.buyer.imgUrl" />
					<p class="reservation-guest-name">{{ order.buyer.fullname }}</p>
				</div>
			</div>
			<div class="col col-4">
				<div class="row-btns">
					<div class="flex align">
						<img src="../../assets/icons/Casabnb-Table_v1_03.png" />
						<p @click="changeStatus('Declined')">Decline</p>
					</div>
					<div class="flex align">
						<img src="../../assets/icons/Casabnb-Table_v1_10.png" />
						<a @click="changeStatus('Accepted')">Accept</a>
					</div>
					<div class="flex align">
						<img src="../../assets/icons/Casabnb-Table_v1_12.png" />
						<a @click="openChat">Contact Guest</a>
					</div>
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
import chatModal from '../chat/chat-modal.vue';
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
			topic: this.user._id + '-' + this.order.buyer._id,
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
			try {
				const topic = this.user._id + '-' + this.order.buyer._id;
				const chat = await this.$store.dispatch({
					type: 'getChat',
					topic: this.topic,
				});
				console.log('got chat', chat);
				this.isChatOpen = true;
			} catch (err) {
				console.log('err :>> ', err);
			}
		},
		toFixedPrice(price) {
			const options = {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
			};
			const numberFormat = new Intl.NumberFormat('en-US', options);
			return numberFormat.format(price);
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
		statusColor() {
			if (this.order.status === 'Pending')
				return { backgroundColor: '#FCA000' };
			if (this.order.status === 'Accepted')
				return { backgroundColor: '#44CB57' };
			if (this.order.status === 'Declined')
				return { backgroundColor: '#F03030' };
		},
		isPending() {
			if (this.order.status === 'Pending') return true;
		},
		isAccepted() {
			if (this.order.status === 'Accepted') return true;
		},
		isDeclined() {
			if (this.order.status === 'Declined') return true;
		},
		createdAt() {
			const date = new Date(this.order.createdAt);
			return date.toLocaleString();
		},
	},
	components: {
		chatModal,
	},
};
</script>
<style></style>
