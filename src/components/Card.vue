<template>
  <div class="card-container">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>商品总览</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>用户总览</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>销售总览</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>