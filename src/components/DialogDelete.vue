<template>
  <div class="popover-container">
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="30%"
      center
    >
      <span>您确定删除此项数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogDeleteSwitch", "diglogDeleteData"],
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  watch: {
    // 若dialogDeleteSwitch为true，则显示Dialog，反之隐藏
    dialogDeleteSwitch() {
      if (this.dialogDeleteSwitch) {
        this.centerDialogVisible = true;
      } else {
        this.centerDialogVisible = false;
      }
    },
    // 若Dialog已经隐藏则将dialogDeleteSwitch赋值为false
    centerDialogVisible() {
      if (!this.centerDialogVisible) {
        this.$emit("hide");
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("hide");
      // 发送删除请求
      this.$axios(`/products/${this.diglogDeleteData.id}`, {
        method: "delete",
        data: {
          appkey: "Mr_Xu_Peng_Hui_1612743894720",
        },
      }).then((resp) => {
        if (resp.status === "success") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.$emit("get-table-data");
        } else {
          this.$message({
            message: "删除失败",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>