<template>
  <div class="add-good-container">
    <el-table :data="categoryData" style="width: 100%;margin: 30px 20px;box-sizing: border-box;">
      <el-table-column label="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类目">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <dialog-edit
      :dialogSwitch="dialogEditSwitch"
      :diglogEditData="diglogEditData"
      type='edit'
      :idShow='false'
      @hide="handleEditHide"
    />
    <dialog-delete
      :diglogDeleteData="diglogDeleteData"
      :dialogDeleteSwitch="dialogDeleteSwitch"
      @hide="handleDeleteHide"
      @get-category-data='$emit("get-category-data")'
    />
  </div>
</template>

<script>
import DialogDelete from './DialogDelete';
import DialogEdit from './Dialog.vue';
export default {
  props: ['categoryData'],
  components: {
    DialogEdit,
    DialogDelete,
  },
  data() {
    return {
      dialogEditSwitch: false,
      dialogDeleteSwitch: false,
      diglogDeleteData: [],
      diglogEditData: [],
    };
  },
  methods: {
    // 隐藏删除Dialog
    handleDeleteHide() {
      this.dialogDeleteSwitch = false;
    },
    // 显示删除Dialog
    handleDeleteShow() {
      this.dialogDeleteSwitch = true;
    },
    // 隐藏编辑Dialog
    handleEditHide() {
      this.dialogEditSwitch = false;
    },
    // 显示编辑Dialog
    handleEditShow() {
      this.dialogEditSwitch = true;
    },
    handleEdit(index, row) {
      this.diglogEditData = row;
      this.handleEditShow();
    },
    handleDelete(index, row) {
      this.diglogDeleteData = row;
      this.handleDeleteShow();
    },
  }
}
</script>

<style>

</style>