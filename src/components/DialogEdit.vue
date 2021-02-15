<template>
  <div class="dialog-container">
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预售价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" :label-width="formLabelWidth">
          <el-input v-model="form.price_off" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="form.tags[0]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="限制购买数量" :label-width="formLabelWidth">
          <el-input v-model="form.inventory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('hide')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogEditSwitch", "diglogEditData", "categoryData"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        price: "",
        price_off: "",
        inventory: "",
        tags: [],
        desc: "",
        status: "",
      },
      formLabelWidth: "120px",
    };
  },
  watch: {
    // 若dialogEditSwitch为true，则显示Dialog，反之隐藏
    dialogEditSwitch() {
      if (this.dialogEditSwitch) {
        this.dialogFormVisible = true;
        this.form.title = this.diglogEditData.title;
        this.form.desc = this.diglogEditData.desc;
        this.form.price = this.diglogEditData.price;
        this.form.price_off = this.diglogEditData.price_off
          ? this.diglogEditData.price_off
          : "/";
        this.form.tags = this.diglogEditData.tags;
        this.form.inventory = this.diglogEditData.inventory;
        this.form.status = this.diglogEditData.status === 1 ? "上架" : "下架";
      } else {
        this.dialogFormVisible = false;
      }
    },
    // 若Dialog已经隐藏则将dialogEditSwitch赋值为false
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.$emit("hide");
      }
    },
  },
  methods: {
    // 提交请求
    handleSubmit() {
      // 隐藏样式
      this.$emit("hide");
      this.categoryData.some((item) => {
        if (item.name === this.diglogEditData.category) {
          this.diglogEditData.category = item.id;
          return true;
        }
      });
      // 提交编辑
      this.$axios("/products/edit", {
        method: "put",
        data: {
          appkey: "Mr_Xu_Peng_Hui_1612743894720",
          id: this.diglogEditData.id,
          title: this.form.title,
          desc: this.form.desc,
          category: this.diglogEditData.category,
          c_item: this.diglogEditData.c_item,
          tags: this.form.tags,
          price: this.form.price,
          price_off: this.form.price_off === "/" ? "" : this.form.price_off,
          unit: this.diglogEditData.unit,
          status: this.form.status === "上架" ? 1 : 0,
          images: this.diglogEditData.images,
          inventory: this.form.inventory,
          sale: this.diglogEditData.sale,
          _id: this.diglogEditData._id,
        },
      }).then((resp) => {
        if (resp.status === "success") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("get-table-data");
        }else {
          this.$message({
          message: '修改失败',
          type: 'warning'
        });
        }
      });
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