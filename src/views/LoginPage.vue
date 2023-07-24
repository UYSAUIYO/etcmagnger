<template>
  <div class="container">
    <div v-if="isLogin" class="form-container login-form">
      <h2>登录</h2>
      <div class="input-wrapper">
        <el-input v-model="account" type="text" placeholder="账号" class="input-field"/>
      </div>
      <div class="input-wrapper">
        <el-input v-model="password"  placeholder="密码" show-password class="input-field"/>
      </div>
      <div class="left-right">
        <p >还没有账号？<a class="toggle-link" @click="toggleLoginStatus">点击注册</a></p>
        <p><a class="toggle-link" @click="forgetoPassword">忘记密码</a></p>
      </div>
      <button @click="login" class="btn btn-login">登录</button>
    </div>

    <div v-else class="form-container register-form">
      <h2>注册</h2>
      <div class="input-wrapper">
        <el-input v-model="account" type="text" placeholder="账号" class="input-field"/>
      </div>
      <div class="input-wrapper">
        <el-input v-model="password"  placeholder="密码" show-password class="input-field"/>
      </div>
      <div class="input-wrapper">
        <el-input v-model="checkpassword"  placeholder="检查密码" show-password class="input-field"/>
      </div>
      <p >已有账号？<a class="toggle-link"  @click="toggleLoginStatus">点击登录</a></p>
      <button @click="register" class="btn btn-register">注册</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLogin: true,
      account: '',
      password: '',
      checkpassword: '',
      showPassword: false, // 控制密码是否可见
    };
  },
  methods: {
    toggleLoginStatus() {
      this.isLogin = !this.isLogin;
      this.account = '';
      this.password = '';
      this.checkpassword = '';
    },
    login() {
      const loginData = {
        account: this.account,
        password: this.password,
      };

      // 发起登录请求
      axios.post('http://localhost:8080/login', loginData)
          .then(response => {
            const responseData = response.data;
            if (responseData.status === 200) {
              const returnMessage = responseData.msg
              const token = responseData.data.token;
              // 在本地存储中储存token
              localStorage.setItem('token', token);
              this.$router.push("/dashboard"); // 跳转到仪表盘页面
              this.showMessage('success',returnMessage); // 使用ElMessage显示成功消息
            } else {
              // 登录失败
              this.showMessage('error', responseData.msg);
            }
          })
          .catch(error => {
            console.error('登录失败:', error);
            this.showMessage('error', '请求失败，请稍后再试！');
          });
    },
    register() {
      // 构建注册请求参数
      const registerData = {
        account: this.account,
        password: this.password,
        checkPassword: this.checkpassword,
      };

      // 发起注册请求
      axios.post('http://localhost:8080/register', registerData)
          .then(response => {
            const responseData = response.data;
            if (responseData.status === 200) {
              // 注册成功
              this.showMessage('success', '注册成功，请登录！'); // 使用ElMessage显示成功消息
              // 切换到登录状态
              this.toggleLoginStatus();
            } else {
              // 注册失败
              this.showMessage('error', responseData.msg); // 使用ElMessage显示错误消息
            }
          })
          .catch(error => {
            console.error('注册失败:', error);
            this.showMessage('error', '注册失败，请稍后再试！'); // 使用ElMessage显示错误消息
          });
    },
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message,
      });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // 切换密码可见性
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #6bd2ea;
  background-image:
      radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%),
      radial-gradient(at 82% 65%, hsl(198.95, 68%, 44%) 0, transparent 55%);
}

.form-container {
  padding: 20px;
  width: 300px; /* 限定登录框宽度 */
  text-align: center; /* 居中显示登录框内容 */
  backdrop-filter: blur(1px) saturate(200%);
  -webkit-backdrop-filter: blur(1px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.32);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}

.login-form {
  color: #00305A; /* 冷淡色调文本颜色 */
}

.register-form {
  color: #00305A; /* 冷淡色调文本颜色 */
}

.input-wrapper {
  margin-bottom: 10px;
  position: relative; /* 让切换按钮的位置相对于输入框进行定位 */
}

.input-field {
  width: 90%; /* 输入框限制最大大小比登录框小10% */
  padding: 10px;
  border-radius: 4px;
  outline: none;
}

.btn {
  padding: 10px 20px 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #fff;
}

.btn-login {
  background-color: #0074D9; /* 冷淡色调按钮颜色 */
}

.btn-register {
  background-color: #0074D9; /* 冷淡色调按钮颜色 */
}

.toggle-link {
  color: #0065ca;
  cursor: pointer;
  text-decoration: none;
}
.left-right{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
