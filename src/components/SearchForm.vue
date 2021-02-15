<template>
  <div class="search-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="搜索关键字" label-width='auto'>
        <el-input v-model="formInline.keyword" placeholder="搜索关键字" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="商品类目" label-width='auto'>
        <el-select v-model="formInline.category" placeholder="商品类目" size="mini">
          <el-option 
          v-for="cItem in this.categoryData" 
          :label="cItem.name" 
          :value="cItem.id"
          :key="cItem.id"
        >{{cItem.name}}
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['categoryData'],
    data() {
      return {
        formInline: {
          keyword: '',
          category: ''
        },
        // categoryData: [],
      }
    },
    created () {},
    methods: {
      // 将搜索条件传给父组件
      onSubmit() {
        this.$emit('updata-search-word',this.formInline.keyword);
        this.$emit('updata-category',this.formInline.category);
        this.$emit('updata-page', 1);
        this.$emit('get-total-count');
        this.$emit('get-table-data');
      },
     
    }
  }
</script>
