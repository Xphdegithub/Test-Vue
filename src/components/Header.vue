<template>
  <header class="header-container">
    <el-row>
      <el-col :span="12">
        <el-breadcrumb class="bt" separator-class="el-icon-arrow-right">
          <template
            v-for="item in this.$store.state.crumbData"
          >
            <el-breadcrumb-item
              :key="item.name"
              :to="item.path"
              v-if="item.superior !== '' && item.superior"
            >
            {{ item.superior }}
            </el-breadcrumb-item>
            <el-breadcrumb-item
              :key="item.title"
              :to="item.path"
            >
            {{ item.title }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12">
        <div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-submenu class="user-box" index="1">
              <template slot="title">{{ this.$store.state.userInfo.username}}</template>
              <el-menu-item index="1-1">个人中心</el-menu-item>
              <el-menu-item index="1-2" @click="handleRemove">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    // 退出
    handleRemove() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

