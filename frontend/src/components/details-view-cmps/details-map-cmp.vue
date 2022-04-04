<template>
  <section class="details-map">
    <div v-if="center">
      <div class="map-main-container-preview">
        <div class="map-header">
          <p>Where you’ll be</p>
        </div>
        <div class="map-location-des">
          <p>{{ stay.loc.city }}, {{ stay.loc.country }}</p>
        </div>
        <div class="map-container">
          <GMapMap
            :center="center"
            :zoom="15"
            map-type-id="roadmap"
            style="width: 100%; height: 480px"
          >
            <GMapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="openMarker(m.id)"
            >
              <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === m.id"
              >
                <div>I am in info window {{ m.id }}</div>
              </GMapInfoWindow>
            </GMapMarker>
          </GMapMap>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "stay-details-map",
  props: {
    stay: Object,
  },
  data() {
    return {
      openedMarkerID: null,
      center: { lat: null, lng: null },
      markers: [
        {
          id: 1,
          position: {
            lat: null,
            lng: null,
          },
        },
      ],
    };
  },
  created() {
    this.center.lat = this.stay.loc.location.lat;
    this.center.lng = this.stay.loc.location.lan;
    this.markers[0].position.lat = this.stay.loc.location.lat;
    this.markers[0].position.lng = this.stay.loc.location.lan;
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
    moveTo(cords) {
      this.center = cords;
    },
  },
  computed: {},
};
</script>

<style>
</style>
