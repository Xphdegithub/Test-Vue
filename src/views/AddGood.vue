<template>
  <div class="add-good-container">
    <el-button 
      class="addBtn" 
      type="primary" 
      icon="el-icon-circle-plus-outline"
      @click="handleAddShow"
      >添加商品类目</el-button
    >
    <!-- 类目表格 -->
    <category-table 
      :categoryData="categoryData" 
      @get-category-data='handleGetCategoryData'  
    />
    <!-- 添加Dialog -->
    <dialog-add
      :dialogSwitch="dialogSwitch"
      :dialogAddData='dialogAddData'
      type='add'
      @hide="handleAddHide"
    />
  </div>
</template>

<script>
import CategoryTable from "../components/AddGood/CategoryTable";
import DialogAdd from "../components/AddGood/Dialog";
export default {
  name: "AddGood",
  components: {
    CategoryTable,
    DialogAdd,
  },
  data() {
    return {
      dialogSwitch: false,
      categoryData: [],
      dialogAddData: [],
    };
  },
  created() {
    this.handleGetCategoryData();
  },
  methods: {
    // 隐藏删除Dialog
    handleAddHide() {
      this.dialogSwitch = false;
    },
    // 显示删除Dialog
    handleAddShow() {
      this.dialogSwitch = true;
    },
    // 获取商品类目数据
    handleGetCategoryData() {
      this.$axios("/category/all", {
        method: "get",
        params: {
          appkey: "Mr_Xu_Peng_Hui_1612743894720",
        },
      }).then((resp) => {
        this.categoryData = resp.data.data;
      });
    },
  },
};
</script>

<style>
</style>
