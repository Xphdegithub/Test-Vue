<template>
  <div class="register-container">
    <el-form
      :model="register_user"
      status-icon
      :rules="rules"
      ref="register_user"
      class="demo-ruleForm form-container"
    >
      <!-- 邮箱 -->
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="email">
            <el-input
              placeholder="请输入邮箱"
              v-model="register_user.email"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 密码 -->
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="register_user.password"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 验证码 -->
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="code">
            <el-input
              placeholder="请输入内容"
              v-model.number="register_user.code"
            >
              <div slot="append" @click="handleGetCode">
                {{ codeShow }}
              </div>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 用户名 -->
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-size" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="register_user.username"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-select
            v-model="register_user.role"
            class="input-size"
            placeholder="请选择用户类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="btn-container">
        <el-col :span="12">
          <el-button
            type="success"
            icon="el-icon-s-promotion"
            :loading="loadSwitch"
            @click="submitForm('register_user')"
            >注册</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="handleReturnLogin">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
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
        } else {
          callback();
        }
      }
    };
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码！'));
      } else {
        callback();
      }
    };
    const checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      codeShow: '获取验证码',
      register_user: {
        email: '',
        code: '',
        role: '',
        username: '',
        password: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
        username: [{ validator: checkUserName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
      loadSwitch: false,
      options: [
        {
          value: 'customer',
          label: '普通用户',
        },
        {
          value: 'admin',
          label: '管理员用户',
        },
      ],
    };
  },
  methods: {
    // 返回登录界面
    handleReturnLogin() {
      this.$router.push('login');
    },
    handle() {
      clearInterval(this.timer);
      let count = 60;
      this.timer = setInterval(() => {
        this.codeShow = `${count}秒后重试`;
        count -= 1;
        if (count < 0) {
          clearInterval(this.timer);
          this.codeShow = '获取验证码';
        }
      }, 1000);
    },
    // 获取验证码
    handleGetCode() {
      this.handle();
      this.$axios({
        method: 'post',
        url: '/passport/getCode',
        data: {
          email: this.register_user.email,
        },
      });
    },
    // 提交注册请求
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/passport/logon',
            data: {
              appkey: 'Mr_Xu_Peng_Hui_1612743894720',
              email: this.register_user.email,
              code: this.register_user.code,
              password: this.register_user.password,
              username: this.register_user.username,
              role: this.register_user.role,
            },
          }).then((resp) => {
            if (resp.status === 'fail') {
              setTimeout(() => {
                this.$message.error(resp.msg);
              }, 300);
            }
            if (resp.status === 'success') {
              setTimeout(() => {
                this.$message.error(resp.msg);
              }, 300);
            }
          });
        } else {
          return false;
        }
        return true;
      });
    },
  },
};
</script>

