<template>
  <div class="page-container">
    <el-pagination 
      background 
      layout="prev, pager, next" 
      :total="totalPageCount"
      :current-page.sync='currentPage'
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: ['totalPageCount'],
  data () {
    return {
      currentPage: 1
    }
  },
  created() {
  },
  methods: {
    // 修改page并重新获取数据
    handleCurrentChange () {
      this.$emit('updata-page', this.currentPage);
      this.$emit('get-table-data');
    }
  }
};
</script>

<style>
</style>