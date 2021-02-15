<template>
  <div class="dialog-container">
    <el-dialog 
      title="收货地址" 
      :visible.sync="dialogFormVisible"
      :append-to-body="true"  
    >
      <el-form :model="form">
        <el-form-item label="类目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类目ID" :label-width="formLabelWidth" v-show="idShows">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('hide')">取 消</el-button>
        <el-button type="primary" @click="onSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogSwitch', 'type', 'diglogEditData', 'dialogAddData', 'idShow'],
  data () {
    return {
      dialogFormVisible: false,
        form: {
          name: '',
          id: '',
        },
        idShows: true,
        formLabelWidth: '120px'
    }
  },
  created() {
    if(this.type === 'edit') {
      this.idShows = false;
    }
  },
  watch: {
    // 若dialogSwitch为true，则显示Dialog，反之隐藏
    dialogSwitch() {
      if (this.dialogSwitch) {
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisible = false;
      }
    },
    // 若Dialog已经隐藏则将dialogSwitch赋值为false
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.$emit("hide");
      }
    },
  },
  methods: {
    onSubmit() {
      this.$emit("hide");
      if(this.type === 'add') {
        this.$axios('/category/add', {
          method: 'post',
          data: {
            appkey: "Mr_Xu_Peng_Hui_1612743894720",
            id: this.form.id,
            name: this.form.name,
            c_items: [],
          }
        });
      }
      if(this.type === 'edit') {
        this.$axios('/category/edit', {
          method: 'put',
          data: {
            appkey: "Mr_Xu_Peng_Hui_1612743894720",
            id: this.diglogEditData.id,
            name: this.form.name,
            c_items: [],
          }
        });
      }
    }
  }
};
</script>

<style>
</style>