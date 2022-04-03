<template>
  <section v-if="stay" class="details-checkout">
    <div class="checkout-modal">
      <div class="price-and-rate flex space">
        <div class="price-per-night">
          <span class="price">${{ stay.price }}</span
          >&nbsp;
          <span class="night">/&nbsp;night</span>
        </div>
        <ratings-reviews :stay="stay" />
      </div>

      <div class="dates-guests">
        <div class="dates flex space" @click="openCalender">
          <div class="check-in-container flex col just">
            <div class="check-in-title title">CHECK-IN</div>
            <div class="check-in-value">
              <p>{{ startDate }}</p>
            </div>
          </div>
          <div class="calender-checkout-container"></div>
          <div class="check-out-container flex just col">
            <div class="check-out-title title">CHECKOUT</div>
            <div class="check-out-value">
              <p>{{ endDate }}</p>
            </div>
          </div>
        </div>
        <div class="add-guests-contaner">
          <div class="guests flex" @click.stop="openGuestsMenu">
            <add-guests-count
              v-if="openGuests"
              @guests="guests"
              @addGuests="addGuests"
            ></add-guests-count>
            <div class="guests-container flex col just">
              <div class="guests-title title">GUESTS</div>
              <div class="guests-value flex">
                <p>{{ guestsCount }} &nbsp;</p>
                <p v-if="guestsNumber">guest</p>
                <p v-else>guests</p>
              </div>
            </div>
          </div>
          <!-- <div class="relative">

					</div> -->
          <div id="date-container" class="relative">
            <date-picker
              :isOpen="isCalendar"
              @orders="orderDates"
            ></date-picker>
          </div>
        </div>
      </div>
      <div class="reserve-btn-cmp">
        <reserve-btn @click="makeReservation" />
      </div>
      <reservation-confirm
        v-if="confirmationModal"
        :order="orderConfirmDetails"
        @confirmReservation="confirmReservation"
        @closeConfirmationModal="closeConfirmationModal"
      ></reservation-confirm>
    </div>
  </section>
</template>

<script>
import datePicker from '../date-picker.vue';
import ratingsReviews from './../reusable-cmps/ratings-reviews-cmp.vue';
import reserveBtn from './../reusable-cmps/reserve-btn-cmp.vue';
import addGuestsCount from '../add-guests-count.vue';
import { socketService } from '../../services/socket.service';
import reservationConfirm from './reservation-confirm-modal.vue';
import { l } from '../../../../backend/public/assets/vendor.43272143';

export default {
	components: {
		ratingsReviews,
		reserveBtn,
		datePicker,
		addGuestsCount,
		reservationConfirm,
	},
	name: 'details-checkout',
	props: {
		stay: Object,
	},
	data() {
		return {
			guestsCount: 1,
			isCalendar: false,
			resirvationDates: null,
			openGuests: false,
			loggedUser: null,
			orderConfirmDetails: null,
			confirmationModal: false,
		};
	},
	created() {
		socketService.emit('topic', this.stay.host._id);
		window.addEventListener('click', this.closeGuests);
		this.loggedUser = this.checkLoggedUser;
	},
	computed: {
		startDate() {
			if (this.resirvationDates) {
				const startDate = new Date(this.resirvationDates[0]);
				return (
					new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
						startDate
					) +
					' ' +
					startDate.getDate()
				);
			} else {
				return 'Add dates';
			}
		},
		endDate() {
			if (this.resirvationDates) {
				const endDate = new Date(this.resirvationDates[1]);
				return (
					new Intl.DateTimeFormat('en-US', { month: 'long' }).format(endDate) +
					' ' +
					endDate.getDate()
				);
			} else {
				return 'Add dates';
			}
		},
		guestsNumber() {
			return this.guestsCount > 1 ? false : true;
		},
		checkLoggedUser() {
			return this.$store.getters.user;
			const user = this.$store.getters.user;
			if (user) return user;
			// return
		},
	},
	methods: {
		async makeReservation() {
			console.log('make Reservation');
			const timeDelta =
				new Date(`${this.resirvationDates[1]}`).getTime() -
				new Date(`${this.resirvationDates[0]}`).getTime();
			const days = Math.floor(timeDelta / 86400000);

			const order = {
				hostId: this.stay.host._id,
				// buyerId: this.loggedUser._id,
				createdAt: Date.now(),
				buyer: {
					_id: this.loggedUser._id,
					fullname: this.loggedUser.fullname,
					imgUrl: this.loggedUser.imgUrl,
				},
				// stayId: this.stay._id,
				stay: {
					_id: this.stay._id,
					name: this.stay.name,
					price: this.stay.price,
				},
				guests: this.guestsCount,
				startDate: this.resirvationDates[0],
				endDate: this.resirvationDates[1],
				totalPrice: days * this.stay.price,
			};
			this.orderConfirmDetails = order;
			this.confirmationModal = true;
			this.resirvationDates = null;
			this.guestsCount = 1;
			// (this.reservationsDate = null), (this.guests = 1);
			// const completeOrder = await this.$store.dispatch({
			// 	type: 'addOrder',
			// 	order: order,
			// });
			// socketService.emit('new order', completeOrder);

			// var days = Math.floor(delta / 86400);
		},
		async confirmReservation() {
			// (this.resirvationDates = null), (this.guestsCount = 1);
			console.log('confirming');

			try {
				const completeOrder = await this.$store.dispatch({
					type: 'addOrder',
					order: this.orderConfirmDetails,
				});
				socketService.emit('new order', completeOrder);
			} catch (err) {
				console.log('Error while making reservation', err);
			}
			this.confirmationModal = false;
		},

		closeConfirmationModal() {
			this.confirmationModal = false;
		},

		addGuests(guest) {
			// if (!guestsCount) this.guestsCount = 1;
			if (this.guestsCount < 1.5 && guest < 0) return;
			if (this.guestsCount === this.stay.capacity && guest > 0) return;

			this.guestsCount += guest;
		},
		openCalender() {
			var d = window.document.querySelector('.el-popper');
			var container = this.$el.querySelector('#date-container');
			container.append(d);
			this.isCalendar = !this.isCalendar;
		},
		orderDates(dates) {
			this.resirvationDates = dates;
		},
		openGuestsMenu() {
			this.openGuests = true;
			console.log(this.openGuests);
		},
		closeGuests(ev) {
			const el = ev.target.className;
			if (
				el !== 'guests-input-modal flex aling just col space' ||
				el !== 'guests-details flex align just space'
			) {
				this.openGuests = false;
			} else {
				return;
			}
		},
	},
};
</script>

<style>
.calender-checkout-container {
  /* position: relative; */
}
</style>
