<template>
  <section class="host-section flex col space">
    <div class="host-details flex space">
      <div class="host-main-details">
        <h2 class="host-main-title">
          {{ stay.type }} hosted by {{ stay.host.fullname }}
        </h2>
        <p>
          {{ stay.capacity }} guests · {{ stay.bedrooms }} bedroom ·
          {{ stay.beds }} bed · {{ stay.bathrooms }} bath
        </p>
      </div>
      <div class="host-img-container">
        <svg
          class="host-img"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style="display: block; height: 100%; width: 100%; fill: currentcolor"
        >
          <path
            d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
          ></path>
        </svg>
        <!-- <img :src="hostImg" alt="" srcset="" /> -->
      </div>
    </div>
    <!-- <hr /> -->
    <div class="host-highlights-container">
      <div class="host-highlight-category-container flex">
        <div class="highlight-icon">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="display: block; height: 24px; width: 24px; fill: #222222"
          >
            <path
              class="highlight-icon-path"
              d="M16 0c6.627 0 12 5.373 12 12 0 6.337-3.814 12.751-11.346 19.257L16 31.82l-1.076-.932C7.671 24.509 4 18.218 4 12 4 5.423 9.397 0 16 0zm0 2C10.504 2 6 6.525 6 12c0 5.44 3.249 11.118 9.831 17.02l.169.149.576-.518c6.178-5.65 9.293-11.092 9.42-16.318L26 12c0-5.523-4.477-10-10-10zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
            ></path>
          </svg>
        </div>
        <div class="highlight-container">
          <div class="host-highlights-category">Great location</div>
          <div class="host-highlight-text">
            100% of recent guests gave the location a 5-star rating.
          </div>
        </div>
      </div>
      <div class="host-highlight-category-container flex">
        <div class="highlight-icon">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="display: block; height: 24px; width: 24px; fill: #222222"
          >
            <path
              d="m16.8438 27.1562-.00005-3.39845-.2608465.0913211c-.9857292.3215073-2.0303948.5116467-3.1127817.5499306l-.4076218.0071983-.2927873-.0037049c-6.03236807-.1528291-10.89442655-5.0148222-11.04725775-11.0472069l-.00370495-.2927882.00370495-.2927873c.1528312-6.03236807 5.01488968-10.89442655 11.04725775-11.04725775l.2927873-.00370495.2927882.00370495c6.0323847.1528312 10.8943778 5.01488968 11.0472069 11.04725775l.0037049.2927873-.00663.3912275c-.0484899 1.4286741-.3615343 2.7917824-.8920452 4.0406989l-.1327748.2963236 7.90645 7.90705v5.5834h-5.5834l-4.12505-4.12545zm-6.5313-19.93745c1.708641 0 3.09375 1.38511367 3.09375 3.09375 0 1.7086436-1.3851064 3.09375-3.09375 3.09375-1.70863633 0-3.09375-1.385109-3.09375-3.09375 0-1.70863365 1.38511635-3.09375 3.09375-3.09375zm0 2.0625c-.56954635 0-1.03125.46170365-1.03125 1.03125 0 .5695521.46169942 1.03125 1.03125 1.03125.5695564 0 1.03125-.4616936 1.03125-1.03125 0-.56955058-.4616979-1.03125-1.03125-1.03125zm12.1147 15.81255 4.12455 4.12495h2.667v-2.667l-8.37295-8.37255.3697-.6775.1603998-.3074798c.56763-1.1397167.90791-2.4128858.9606815-3.761954l.0072187-.3697662-.0038197-.2688703c-.1397418-4.91222958-4.0963692-8.86881961-9.0086094-9.00856l-.2688709-.0038197-.2688703.0038197c-4.91222958.13974039-8.86881961 4.09633042-9.00856 9.00856l-.0038197.2688703.0038197.2688709c.14228112 5.0015536 4.24146819 9.0124291 9.2774303 9.0124291 1.4456308 0 2.8116781-.3298367 4.0293209-.9177001l.3012791-.1522999 1.5131-.7998-.00045 4.61975z"
            ></path>
          </svg>
        </div>
        <div class="highlight-container">
          <div class="host-highlights-category">Great check-in experience</div>
          <div class="host-highlight-text">
            100% of recent guests gave the check-in process a 5-star rating.
          </div>
        </div>
      </div>
      <div class="host-highlight-category-container flex">
        <div class="highlight-icon">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="display: block; height: 24px; width: 24px; fill: #222222"
          >
            <path
              d="m24.6666 1.66675h-17.33335c-1.65685475 0-3 1.34314525-3 3v26.4709039l11.66575-7.2926539 11.6676 7.2926539v-26.4709039c0-1.65686279-1.3431233-3-3-3zm0 2 .1166244.00672754c.4973508.05776355.8833756.48042438.8833756.99327246l-.0006 22.86225-9.6661012-6.041549-9.6668988 6.041549.00025-22.86225c0-.55228525.44771475-1 1-1z"
            ></path>
          </svg>
        </div>
        <div class="highlight-container">
          <div class="host-highlights-category">Wifi</div>
          <div class="host-highlight-text">
            Guests often search for this popular amenity
          </div>
        </div>
      </div>
    </div>
    <!-- <hr /> -->
    <div class="preview-stay-container">
      <p class="preview-stay-summary">{{ stay.summary }}</p>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "stay-details-host-main",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },
  async created() {},
  computed: {
    hostImg() {
      return this.stay.host.imgUrl;
    },
  },
  methods: {},
};
</script>