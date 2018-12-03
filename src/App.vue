<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods:{
    addComma(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g
        return num.toString().replace(regexp, ',')
    },

  }
}
</script>

<style>
body{
  font-family: 'Noto Sans KR', sans-serif;
}
h2{
  color: #ff7657;
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
}
</style>
