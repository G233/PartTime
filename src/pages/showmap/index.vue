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
        style="width: 100%; height: 100vh"></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [{
        iconPath: '../../static/images/zhishi.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 25,
        height: 25
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true
      }],
    }
  },
  computed:{
  },
  onLoad(){
    console.log('site',this.$store.default.state.detail);
    if(this.$store.default.state.detail.site.latitude !=''){
      this.markers[0].latitude=this.polyline[0].points[0].latitude= this.$store.default.state.detail.site.latitude;
      this.markers[0].longitude=this.polyline[0].points[0].longitude= this.$store.default.state.detail.site.longitude;
    } 
    console.log('markers',this.markers);
    wx.getLocation({
      success:res=>{
        //console.log(res);
        this.polyline[0].points[1].latitude=res.latitude;
        this.polyline[0].points[1].longitude=res.longitude;
      }
    });
    console.log('polyline',this.polyline);
  },
}
</script>

<style >
</style>
