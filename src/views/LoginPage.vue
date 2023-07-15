<template>
  <div class="login-container">
    <div class="header">
      <h1>EtherealCraft 管理系统</h1>
    </div>
    <div class="login-card">
      <h3 class="title">登录</h3>
      <div class="login-form">
        <input v-model="username" type="text" placeholder="用户名" class="input" />
        <input v-model="password" type="password" placeholder="密码" class="input" />
        <el-checkbox v-model="rememberPassword" label="记住密码"></el-checkbox>
        <div class="error-msg" v-if="error">{{ error }}</div>
        <button class="login-button" @click="login" :class="{ 'shake-animation': isShaking }">登录</button>
      </div>
      <div class="current-time">
        当前时间: {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      currentTime: "",
      rememberPassword: false,
      isShaking: false,
    };
  },
  mounted() {
    const rememberPassword = localStorage.getItem("rememberPassword");
    if (rememberPassword) {
      const data = JSON.parse(rememberPassword);
      const { username, password, rememberPassword: expiration } = data;
      if (Date.now() < expiration) {
        this.username = username;
        this.password = password;
      } else {
        localStorage.removeItem("rememberPassword");
      }
    }
    setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  },
  methods: {
    async login() {
      if (!this.validatePassword()) {
        ElMessage.error("密码必须包含大写字母、小写字母、数字，且长度在8到18位之间");
        return;
      }

      try {
        const response = await axios.post("https://api.etherealcraft.cn/api/auth/login", {
          username: this.username,
          password: this.password,
        });
        if (this.rememberPassword) {
          const expiration = new Date();
          expiration.setDate(expiration.getDate() + 7);
          const rememberPasswordData = {
            username: this.username,
            password: this.password,
            rememberPassword: expiration.getTime(),
          };
          localStorage.setItem("rememberPassword", JSON.stringify(rememberPasswordData));
        } else {
          localStorage.removeItem("rememberPassword");
        }

        // 将令牌存储在本地存储中，或直接使用
        localStorage.setItem("token", response.data.token);
        this.$router.push("/dashboard"); // 跳转到仪表盘页面
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.error;
          this.shakeLoginForm();
          setTimeout(() => {
            this.error = "";
          }, 5000);
        } else {
          this.error = "登录失败";
        }
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,18}$/;
      return passwordRegex.test(this.password);
    },
    shakeLoginForm() {
      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.login-container {
  background-image: url(https://api.r10086.com/%E6%A8%B1%E9%81%93%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87api%E6%8E%A5%E5%8F%A3.php?%E5%9B%BE%E7%89%87%E7%B3%BB%E5%88%97=%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E7%B3%BB%E5%88%971);
  background-size: cover;
  background-position: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.header {
  backdrop-filter: blur(10px);
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input {
  padding: 10px;
  border: none;
  border-radius: 4px;
}

.error {
  color: red;
}

.login-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

.current-time {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.shake-animation {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
</style>
