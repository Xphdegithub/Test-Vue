<template>
  <div class="login-container">
    <el-form
      :model="login_user"
      status-icon
      :rules="rules"
      ref="login_user"
      class="demo-ruleForm form-container"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="login_user.username"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="login_user.password"
              type="password"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="btn-container">
        <el-col :span="12">
          <el-button
            type="success"
            icon="el-icon-s-promotion"
            @click="submitForm('login_user')"
            >登录</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="handleToRegister">注册</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空！'));
      } else {
        const regEmail = new RegExp(
          '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$',
        );
        const isEmail = regEmail.test(value);
        if (!isEmail) {
          callback(new Error('邮箱格式不正确！'));
        }
        callback();
      }
    };
    return {
      login_user: {
        username: 'xupenghui163@163.com',
        password: '123456',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: checkEmail, trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 提交登陆请求
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios('/passport/login', {
            method: 'post',
            data: {
              email: this.login_user.username,
              password: this.login_user.password,
            },
          }).then((resp) => {
            if (resp.status === 'success') {
              // 设置用户cookie
              this.$store.dispatch('setUserCookie', resp.data);
              setTimeout(() => {
                this.$message({
                  showClose: true,
                  message: resp.msg,
                  type: 'success',
                });
              }, 500);
              setTimeout(() => {
                // 判定是否已加入动态路由，返回true表示没有
                const noIndex = this.$router.matcher.getRoutes().every((element) => element.name !== 'Index');
                if (noIndex) {
                  this.$router.push('/index');
                }
                this.$router.push('/index');
              }, 1000);
            }
          });
        } else {
          return false;
        }
        return true;
      });
    },
    handleToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

