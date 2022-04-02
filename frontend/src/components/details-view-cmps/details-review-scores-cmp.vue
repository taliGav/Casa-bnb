<template>
  <section v-if="stay" class="details-reviews-scores">
    <div class="category-progress">
      <p class="category">Cleanliness</p>
      <el-progress :percentage="90" :format="format" />
    </div>
    <div class="category-progress">
      <p class="category">Communication</p>
      <el-progress :percentage="100" :format="format" />
    </div>
    <div class="category-progress">
      <p class="category">Check-in</p>
      <el-progress :percentage="100" :format="format" />
    </div>
    <div class="category-progress">
      <p class="category">Accuracy</p>
      <el-progress :percentage="100" :format="format" />
    </div>
    <div class="category-progress">
      <p class="category">Location</p>
      <el-progress :percentage="90" :format="format" />
    </div>
    <div class="category-progress">
      <p class="category">Value</p>
      <el-progress :percentage="90" :format="format" />
    </div>
  </section>
</template>

<script>
export default {
  name: "review-scores",
  props: {
    stay: Object,
    scores: Object,
  },
  data() {
    return {
      scoresForDisplay: [
        {
          accuracy: 9,
          cleanliness: 10,
          checkin: 10,
          communication: 10,
          location: 9,
          value: 9,
        },
      ],
    };
  },
  components: {},
  created() {
    // console.log(this.scores);
    // console.log(this.stay);
    // this.updateScores();
  },
  computed: {},
  methods: {
    format(percentage) {
      let score = +percentage;
      score = `${score / 20}`;
      return score;
    },
    // updateScores() {
    // //   this.scoresForDisplay = this.scores.splice(0, 6);
    //   console.log(this.scoresForDisplay);
    // },
  },
};
</script>
