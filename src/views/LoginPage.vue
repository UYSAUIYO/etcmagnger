<template>
  <div>
    <transition class="fade-enter">
      <v-divider></v-divider>
    </transition>
    <transition class="fade-enter-active">
    <v-card class="mx-auto loginpage">
      <v-card-title class="h-100">登录</v-card-title>
      <v-sheet  class="mx-auto loginsheet">
        <div>
          <v-text-field
              class="inputlogin"
              prepend-icon="mdi-account-key"
            color="pink"
            v-model="username"
            type="text"
            label="用户名"
              hint="请输入用户名"
          ></v-text-field>
        </div>
        <div>
          <v-text-field v-model="password"  type="password" clearable
                        class="inputlogin1"
                        label="密码"
                        prepend-icon="mdi-onepassword"
                        hint="请输入密码"
                         />
        </div>
        <v-divider></v-divider>
        <v-btn type="submit" class="btnclass mt-2 animate__animated animate__fadeInUp" @click="login">登录</v-btn>
      </v-sheet>
      <p v-if="error">{{ error }}</p>
    </v-card>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        // store the token in local storage, or use it directly
        localStorage.setItem("token", response.data.token);
        this.$router.push("/dashboard"); // go to dashboard
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.error;
        } else {
          this.error = "登录失败";
        }
      }
    },
  },
};
</script>

<style scoped>
.inputlogin{
  padding-top: 15px;
  padding-right: 15px;
  padding-left: 15px;
}
.inputlogin1{
  padding-right: 15px;
  padding-left: 15px;
}
.loginpage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.loginsheet {
  width: 40%;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: inline-block;
  flex-direction: column;
  animation: slide-in 0.5s ease;
}
@keyframes slide-in {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btnclass{
  width:100%;
  padding-bottom: 5px;
}
@media (max-width: 800px) {
  .loginsheet{
      width: 80%;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      text-align: center;
      display: inline-block;
      flex-direction: column;
      animation: slide-in 0.5s ease;

  }
}
</style>
