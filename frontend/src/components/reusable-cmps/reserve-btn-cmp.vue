<template>
  <section class="reserve-btn-container">
    <div
      @mousemove="onMousemove"
      :style="{
        backgroundPositionX: `calc((100 - var(${x}, 0)) * 1%)`,
        backgroundPositionY: `calc((100 - var(${y}, 0)) * 1%)`,
      }"
      class="actual-reserve-btn"
    >
      <p>Move your mouse across this div...</p>
      <p>x: {{ x }}</p>
      <p>y: {{ y }}</p>

      <span class="btn-txt">Check availability</span>
    </div>
    <!-- <button type="button" class="reserve-btn reserve-btn-pointer">
        <span class="_163rr5i">
          <span
            class="_19di23v"
            style="
              background-position: calc((100 - var(--mouse-x, 0)) * 1%)
                calc((100 - var(--mouse-y, 0)) * 1%);
              --mouse-x: 42.7031;
              --mouse-y: 2.08333;
            "
          >
          </span>
        </span>
        <span class="_tcp689">Check availability </span>
      </button> -->
  </section>
</template>

<script>
export default {
  components: {},
  name: "reserve-button",
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX;
      this.y = e.clientY;
    },
  },
};
</script>


<style>
.actual-reserve-btn {
  background-color: #ff385c;
  border: none;
  color: #fff;
  text-align: center;
  letter-spacing: 0.05rem;
  width: 100%;
  height: 48px;
  min-width: 200px;
  font-family: 'Circular-light';
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: opacity 1.25s ease 0s !important;

  /* transition: 0.3s background-color ease; */
  /* background-position: calc((100 - var(this.x, 0)) * 1%)
    calc((100 - var(this.y, 0)) * 1%);
  --mouse-x: 87.2031;
  --mouse-y: 20.8333; */
}

/*
.reserve-btn {
  background-color: #ff385c;
  border: none;
  color: #fff;
  text-align: center;
  letter-spacing: 0.05rem;
  width: 100%;
  height: 48px;
  min-width: 200px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: opacity 1.25s ease 0s !important;
}

.reserve-btn-pointer {
  border: 0;
  min-height: 4rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  background-image: radial-gradient(
    circle at center,
    #ff385c 0,
    #e61e4d 27.5%,
    #e31c5f 40%,
    #d70466 57.5%,
    #bd1e59 75%,
    #bd1e59 100%
  );
  transition: opacity 1.25s ease 0s !important;
  min-width: 200px;
  background-size: 200% 200%;
  background-position: calc((100 - var(--mouse-x, 0)) * 1%)
    calc((100 - var(--mouse-y, 0)) * 1%);
} */

span.btn-txt{
    display: block !important;
    position: relative !important;
    pointer-events: none !important;
    font-size: 1rem;
    font-weight: 600;
}
</style>