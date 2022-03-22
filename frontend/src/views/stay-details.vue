<template>
  <section v-if="stay" class="stay-detalis">
    <stay-preview :stay="stay">
      <section class="py-3 flex flex-col gap-1">
        <div class="flex flex-col gap-1">
          <h3 class="uppercase">{{ stay.name }}</h3>
          <p class="clr-teal fw-bold">Price: ${{ stay.price }}</p>
          <p><span class="fw-bold">In Stock:</span> {{ stay.inStock }}</p>
          <p>
            <span class="fw-bold">Created At:</span>
            {{ $filters.formatTime(stay.createdAt) }}
          </p>
        </div>
        <div class="labels flex flex-wrap items-center gap-1">
          <custom-label
            v-for="label in stay.labels"
            :key="label"
            :label="label"
          />
        </div>
      </section>
    </stay-preview>

    <h2 class="clr-teal">Reviews</h2>

    <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
      <div class="form-control my-1">
        <label for="txt" class="form-label fw-600">Your review</label>
        <textarea
          name="txt"
          id="txt"
          rows="3"
          class="form-input"
          v-model="reviewToAdd.content"
          required
        ></textarea>
        <div class="form-control my-1">
          <label for="rate" class="form-label">Rate</label>
          <input
            id="rate"
            type="number"
            class="form-input"
            min="0"
            max="5"
            v-model.number="reviewToAdd.rate"
          />
        </div>
      </div>
      <button class="btn btn-info">Add Review</button>
    </form>

    <div v-if="reviews?.length" class="my-1 flex flex-col gap-1">
      <article
        class="review flex flex-col gap-1 items-start p-3"
        v-for="review in reviews"
        :key="review._id"
      >
        <p class="fw-600">{{ review.content }}</p>
        <p>Rate: {{ review.rate }}⭐</p>
        <p>By: {{ review.user?.username }}</p>
        <button
          v-if="user?.isAdmin"
          class="btn btn-danger"
          @click="removeReview(review._id)"
        >
          Delete review
        </button>
      </article>
    </div>
    <div class="p-2 flex flex-col gap-1" v-else>
      <h4>No reviews yet.</h4>
      <p>Be the first...</p>
    </div>

    <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button
        @click="$router.push(`/stay/edit/${stay._id}`)"
        class="btn btn-primary"
      >
        edit stay
      </button>
      <button @click="removeStay" class="btn btn-danger">delete stay</button>
      <button @click="$router.push('/stay')" class="btn btn-secondary">
        go back
      </button>
    </div>
  </section>
</template>

<script>
import { stayService } from '../services/stay-service'
import { reviewService } from '../services/review-service'
import CustomLabel from '../components/custom-label.vue'
import stayPreview from '../components/stay-preview.vue'

export default {
  components: { stayPreview, CustomLabel },
  name: 'stay-detail',
  data() {
    return {
      stay: null,
      reviewToAdd: null,
    }
  },
  async created() {
    const { id } = this.$route.params
    this.stay = await stayService.getById(id)
    const user = this.$store.getters.user

    // review-store
    await this.$store.dispatch({ type: 'getReviews', filterBy: { stayId: this.stay._id } })

    if (user) {
      this.reviewToAdd = await reviewService.getEmptyReview()
      this.reviewToAdd.userId = user._id
      this.reviewToAdd.stayId = this.stay._id
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    reviews() {
      return this.$store.getters.reviews
    },
  },
  methods: {
    removeStay() {
      this.$store.dispatch({ type: 'removeStay', stayId: this.stay._id }).then(() => {
        this.$router.push('/stay')
      })
    },
    async addReview() {
      if (!this.reviewToAdd.content) return
      await this.$store.dispatch({ type: 'addReview', review: this.reviewToAdd })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { stayId: this.stay._id } })
    },
    async removeReview(reviewId) {
      await this.$store.dispatch({ type: 'removeReview', reviewId })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { stayId: this.stay._id } })
    },
  },
}
</script>
