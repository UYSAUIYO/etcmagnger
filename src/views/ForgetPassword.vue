<template>
  <div class="container">
    <span></span>
    <div class="form-container login-form">
      <span></span>
      <h2>忘记密码</h2>
      <div class="input-wrapper">
        <van-field v-model="email" @blur="validateEmail" type="text" placeholder="邮箱" class="input-field"/>
      </div>
      <div class="input-wrapper">
          <van-field class="input-field" v-model="veriCode" center
          clearable placeholder="请输入验证码"
          >
            <template #button>
              <van-button class="countdown-button" size="small" type="primary" @click="sendVerificationCode" :disabled="!isValidEmail || showCountdown" >
                {{ showCountdown ? countdownSeconds + 's' : '发送验证码' }}</van-button>
            </template>
          </van-field>
      </div>
      <div class="input-wrapper">
        <van-field v-model="password" placeholder="密码" show-password class="input-field"/>
      </div>
      <div class="input-wrapper">
        <van-field v-model="checkPassword" placeholder="确认密码" show-password class="input-field"/>
      </div>
      <p><a class="toggle-link" @click="backLogin">返回登录</a></p>
      <button @click="changePassword"  style="vertical-align:middle" class="btn btn-login"><span>修改密码</span></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      email: '',
      veriCode: '',
      password: '',
      checkPassword: '',
      isValidEmail: false, // 标记邮箱是否通过格式校验
      showCountdown: false, // 是否显示倒计时按钮
      countdownSeconds: 60, // 倒计时秒数
    };
  },
  methods: {
    encrypt(str) {
      const shift = 3; // 偏移量
      let encryptedStr = '';
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
          encryptedStr += String.fromCharCode(((charCode - 65 + shift) % 26) + 65); // 大写字母的加密
        } else if (charCode >= 97 && charCode <= 122) {
          encryptedStr += String.fromCharCode(((charCode - 97 + shift) % 26) + 97); // 小写字母的加密
        } else if (charCode >= 48 && charCode <= 57) {
          encryptedStr += String.fromCharCode(charCode); // 数字保持不变
        }
      }
      return encryptedStr;
    },

    sendVerificationCode() {
      if (!this.isValidEmail) {
        // ElMessage({
        //   message: '请正确输入邮箱地址！',
        //   type: 'error',
        // })
        return;
      }

      // 获取本机IP地址的方法，请替换为实际实现的代码
      const ipAddress = axios.get('https://api.ipify.org?format=json')
          .then((response) => {
            return response.data.ip;
          });
      // 获取点击发送验证码时的时间
      const currentTime = new Date().getTime();
      const encryptedString = this.encrypt(`${ipAddress}${currentTime}`);
      // 将加密后的验证码请求码和邮箱一起发送到后端
      axios.post('http://localhost:8080/sendVerificationCode', {
        email: this.email,
        veriCodeRequest: encryptedString,
        type: 'forgotPassword',
      })
          .then(response => {
            const responseData = response.data;
            if (responseData.status === 200) {
              // 发送验证码成功
              message.success('验证码已发送，请注意查收！');
            } else {
              message.error(responseData.msg)
            }
          })
          .catch(error => {
            console.error('发送验证码失败:', error);
            message.error('发送验证码失败，请稍后再试！')
          });
    },
    validateEmail() {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.isValidEmail = regex.test(this.email); // 更新isValidEmail的值
        if (!this.isValidEmail) {
          message.error('请正确输入邮箱地址！')
        }
    },
    backLogin() {
      this.$router.push("/login");
    },
    changePassword() {
      axios.post('http://localhost:8080/forgotpassword', {
        email: this.email,
        veriCode: this.veriCode,
        newPassword: this.password,
        confirmPassword: this.checkPassword,
      })
          .then(response => {
            const responseData = response.data;
            if (responseData.status === 200) {
              message.success('密码修改成功，请登录！')
              this.backLogin(); // 返回登录页面
            } else {
              message.error(responseData.msg)
            }
          })
          .catch(error => {
            console.error('密码修改失败:', error);
            message.error('密码修改失败，请稍后再试！')
          });
    },
  },
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #6bd2ea;
  position: relative;
  transition: 0.5s;
  z-index: 1;
  background-image:
      radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%),
      radial-gradient(at 82% 65%, hsl(198.95, 68%, 44%) 0, transparent 55%);
}

.container::before{
  content: ' ';
  position: absolute;
  top: 0;
  text-decoration: none;
  background: #6db2ea radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%),
  radial-gradient(at 82% 65%, hsl(198.95, 68%, 44%) 0, transparent 55%);
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}
.container::after{
  content: '';
  position: absolute;
  top: 0;
  background: #6db2ea radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%);
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
}
.container:hover:before,
.container:hover:after {
  transform: skewX(0deg) scaleX(1.3);
}

.container:before,
.container:after {
  background: linear-gradient(315deg, #ffbc00, #ff0058)
}

.container span{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.container span::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.1s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08)
}

.container span::before {
  top: -40px;
  left: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.box span::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.5s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  animation-delay: -1s;
}

.container span:after {
  bottom: -40px;
  right: 40px;
  width: 50px;
  height: 50px;
  opacity: 1;
}

.container .form-container {
  position: relative;
  padding: 20px 40px;
  text-align: center; /* 居中显示登录框内容 */
  backdrop-filter: blur(1px) saturate(200%);
  -webkit-backdrop-filter: blur(1px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.32);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 300px; /* 限定登录框宽度 */
}

.login-form {
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
  display: inline-block;
  border-radius: 7px;
  border: none;
  background: #0074D9;
  color: white;
  font-family: inherit;
  text-align: center;
  font-size: 13px;
  box-shadow: 0 14px 56px -11px #0074D9;
  width: 10em;
  padding: 1em;
  transition: all 0.4s;
  cursor: pointer;
}
.btn span{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}

.btn-login {
  background-color: #0074D9;
}


.toggle-link {
  color: #0065ca;
  cursor: pointer;
  text-decoration: none;
  font-size:13px;
}
</style>
