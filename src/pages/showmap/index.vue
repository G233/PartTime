<template>
  <div>
    <map
      id="map"
      :longitude="markers[0].longitude"
      :latitude="markers[0].latitude"
      scale="14"
      :markers="markers"
      :polyline="polyline"
      show-location
      style="width: 100%; height: 100vh"
    ></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        {
          iconPath: "../../static/images/zhishi.png",
          id: 0,
          latitude: 23.099994,
          longitude: 113.32452,
          width: 25,
          height: 25
        }
      ],
    };
  },
  computed: {},
  onLoad(e) {
    this.markers[0].latitude =e.latitude;
   this.markers[0].longitude =e.longitude;
  }
};
</script>

<style >
</style>
