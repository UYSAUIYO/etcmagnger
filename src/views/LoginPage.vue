<template>
  <div class="loginpage">
    <v-divider></v-divider>
    <v-card>
      <h1>登录</h1>
      <v-sheet width="40%" class="mx-auto loginsheet">
        <div>
          <v-text-field
            color="pink"
            v-model="username"
            type="text"
            label="用户名"
          ></v-text-field>
        </div>
        <div>
          <v-text-field v-model="password" type="password" label="密码" />
        </div>
        <v-divider></v-divider>
        <v-btn type="submit" class="mt-2" @click="login">登录</v-btn>
      </v-sheet>
      <p v-if="error">{{ error }}</p>
    </v-card>
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
.loginpage {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
}
.loginsheet {
  text-align: center;
  display: inline-block;
}
</style>
