<template>
  <div class="add-container">
    <el-dialog
      title="添加商品"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="30%"
      center
    >
      <!-- <span>需要注意的是内容是默认不居中的</span> -->

      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>

      <el-form :model="form" class="demo-form-inline">
        <div v-show="stepSwitch[0]">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品类目" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择商品类目">
              <el-option
                label="请选择商品类目"
                value="请选择商品类目"
                disabled
              ></el-option>
              <el-option
                v-for="cItem in categoryData"
                :key="cItem.id"
                :label="cItem.name"
                :value="cItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-show="stepSwitch[1]">
          <el-form-item label="预售价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="折扣价格" :label-width="formLabelWidth">
            <el-input v-model="form.price_off" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单位" :label-width="formLabelWidth">
            <el-input v-model="form.unit" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <div v-show="stepSwitch[2]">
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-input v-model="form.tags[0]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="限制购买数量" :label-width="formLabelWidth">
            <el-input v-model="form.inventory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上架状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" placeholder="请选择上架状态">
              <el-option
                label="请选择上架状态"
                value="请选择上架状态"
                disabled
              ></el-option>
              <el-option label="上架" :value="1"></el-option>
              <el-option label="下架" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <el-button style="margin-top: 12px" v-show="btnShow[0]" @click="prev"
        >上一步</el-button
      >

      <el-button style="margin-top: 12px" v-show="btnShow[1]" @click="next"
        >下一步</el-button
      >

      <span slot="footer" class="dialog-footer">
        <el-button @click="init">取 消</el-button>
        <el-button type="primary" v-show="!btnShow[1]" @click="onSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["categoryData", "dialogAddSwitch"],
  data() {
    return {
      stepSwitch: [true, false, false],
      centerDialogVisible: false,
      active: 0,
      btnShow: [false, true],
      form: {
        title: "",
        price: "",
        price_off: "",
        inventory: "",
        tags: [],
        desc: "",
        status: "",
        unit: "",
        category: "",
      },
      formLabelWidth: "120px",
    };
  },
  watch: {
    // 若dialogAddSwitch为true，则显示Dialog，反之隐藏
    dialogAddSwitch() {
      if (this.dialogAddSwitch) {
        this.centerDialogVisible = true;
      } else {
        this.centerDialogVisible = false;
      }
    },
    // 若Dialog已经隐藏则将dialogAddSwitch赋值为false
    centerDialogVisible() {
      if (!this.centerDialogVisible) {
        this.init();
        this.$emit("hide");
      }
    },
  },
  methods: {
    // 下一步
    next() {
      this.stepSwitch = this.stepSwitch.map((item) => {
        return false;
      });
      this.active++;
      this.stepSwitch[this.active] = true;
      if (this.active >= 0) {
        this.btnShow[0] = true;
      }
      if (this.active > 2) {
        this.stepSwitch[2] = true;
        this.btnShow[1] = false;
      }
    },
    // 上一步
    prev() {
      this.stepSwitch = this.stepSwitch.map((item) => {
        return false;
      });
      this.active--;
      this.stepSwitch[this.active] = true;
      if (this.active >= 0) {
        this.btnShow[1] = true;
      }
      if (this.active <= 0) {
        this.stepSwitch[0] = true;
        this.btnShow[0] = false;
        return;
      }
    },
    // 初始化
    init() {
      this.$emit("hide");
      this.active = 0;
      this.btnShow = [false, true];
      this.stepSwitch = [true, false, false];
      this.form.title = "";
      this.form.price = "";
      this.form.price_off = "";
      this.form.inventory = "";
      this.form.tags = "";
      this.form.desc = "";
      this.form.status = "";
      this.form.unit = "";
      this.form.category = "";
    },
    // 确定
    onSubmit() {
      this.$axios("/products/add", {
        method: "post",
        data: {
          appkey: "Mr_Xu_Peng_Hui_1612743894720",
          title: this.form.title,
          price: this.form.price,
          price_off: this.form.price_off,
          inventory: this.form.inventory,
          tags: this.form.tags,
          desc: this.form.desc,
          status: this.form.status,
          unit: this.form.unit,
          category: this.form.category,
          images: [
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/丰水梨5金装.jpg",
            "http://duyi-bucket.oss-cn-beijing.aliyuncs.com/mall-admin/images/%E9%BB%84%E6%A8%B1%E6%A1%831593413677378.jpg",
          ],
        },
      }).then((resp) => {
        if (resp.status === "success"){
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }else {
           this.$message.error(resp.msg);
        }
      });
      this.init();
      this.$emit("get-table-data");
    },
  },
};
</script>

<style lang='less' scoped>
.el-select {
  width: 100%;
}
.demo-form-inline {
  margin: 20px 0;
}
</style>