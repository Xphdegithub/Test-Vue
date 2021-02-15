<template>
  <div class="sider-bar-container">
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
          <template v-for="item in this.noChild">
            <el-menu-item 
              :index='item.meta.index' 
              :key="item.name"
            >
              <router-link :to="item.path" tag="li">
                <i :class="item.meta.icon" ></i>
                <span @click="handleCurData({title:item.name, path: item.path, superior: item.meta.superior})">{{ item.name }}</span>
              </router-link>
            </el-menu-item>
          </template>
          <el-submenu 
            v-for="item in this.haveChild" 
            :index="item.meta.index" 
            :key="item.name"
          >
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span >{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group 
              v-for="child in item.children" 
              :key="child.meta.index"
            >
              <el-menu-item :index="child.meta.index">
                <router-link 
                  :to="child.path" 
                  tag="li"
                >
                  <i :class="child.meta.icon"></i>
                  <span @click="handleCurData({title:child.meta.title, path: child.path, superior: child.meta.superior})">{{ child.meta.title }}</span>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex: '1',
    };
  },
  computed: {
    // 遍历一级菜单
    noChild(){
      const noChild = this.$store.state.routesList.map(item => {
       return item.children.filter(childItem => {
          if(!childItem.children) {
            return true;
          }else {
            return false;
          }
        })
      });
      return noChild.flat(1);
    },
    // 遍历二级菜单
    haveChild() {
      const haveChild = this.$store.state.routesList.map(item => {
       return item.children.filter(childItem => {
          if(childItem.children) {
            return true;
          }else {
            return false;
          }
        })
      });
      return haveChild.flat(1);
    },
  },
  methods: {
    // 修改面包屑数据
    handleCurData (curData) {
      this.$store.dispatch('setCrumbData', curData);
    },
  },
};
</script>

