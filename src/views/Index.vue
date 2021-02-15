<template>
  <div>
    <Header></Header>
    <SiderBar></SiderBar>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import SiderBar from '../components/SideBar.vue';

export default {
  name: 'index',
  components: {
    Header,
    SiderBar,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

