<template>
  <div class="table-container">
    <template v-if="productData !== ''">
      <el-table
        fixed
        :data="productData"
        max-height="600px"
        style="width: 100%"
      >
        <el-table-column label="id">
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类目">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预售价格">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="折扣价格">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.price_off ? scope.row.price_off : "/"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tags[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="限制购买数量">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.inventory }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架状态">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.status === 1 ? "上架" : "下架"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="145" label="操作">
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
    </template>
    <DialogEdit
      :dialogEditSwitch="dialogEditSwitch"
      :diglogEditData="diglogEditData"
      :categoryData='categoryData'
      @hide="handleEditHide"
      @get-table-data='handleGetTableDate'
    />
    <DialogDelete
      :diglogDeleteData="diglogDeleteData"
      :dialogDeleteSwitch="dialogDeleteSwitch"
      @hide="handleDeleteHide"
      @get-table-data='handleGetTableDate'
    />
  </div>
</template>

<script>
import DialogEdit from "@/components/DialogEdit.vue";
import DialogDelete from "@/components/DialogDelete.vue";
export default {
  props: ["productData", 'categoryData'],
  components: {
    DialogEdit,
    DialogDelete,
  },
  data() {
    return {
      dialogEditSwitch: false,
      dialogDeleteSwitch: false,
      diglogEditData: [],
      diglogDeleteData: [],
    };
  },
  methods: {
    // 用于在修改数据后重新获取数据
    handleGetTableDate () {
      this.$emit('get-table-data');
    },
    // 隐藏编辑Dialog
    handleEditHide() {
      this.dialogEditSwitch = false;
    },
    // 显示编辑Dialog
    handleEditShow() {
      this.dialogEditSwitch = true;
    },
    // 隐藏删除Dialog
    handleDeleteHide() {
      this.dialogDeleteSwitch = false;
    },
    // 显示删除Dialog
    handleDeleteShow() {
      this.dialogDeleteSwitch = true;
    },
    handleEdit(index, row) {
      this.diglogEditData = row;
      this.handleEditShow();
    },
    handleDelete(index, row) {
      this.diglogDeleteData = row;
      this.handleDeleteShow();
    },
  },
};
</script>

<style>
</style>