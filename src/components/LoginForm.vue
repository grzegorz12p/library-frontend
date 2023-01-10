<template>
  <div
    class="background w-[350px] h-[500px] bg-[red] shadow-[5px_20px_50px_#000] overflow-hidden rounded-[10px]"
  >
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div class="relative h-full w-full">
      <form @submit="createAccount">
        <label for="chk" aria-hidden="true">Sign up</label>
        <input
          type="text"
          name="txt"
          placeholder="Login"
          v-model="signUpUsername"
          :required="true"
        />
        <input
          v-model="signUpEmail"
          type="email"
          name="email"
          placeholder="Email"
          :required="true"
        />
        <input
          v-model="signUpPassword"
          type="password"
          name="password"
          placeholder="Password"
          :required="true"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>

    <div class="login">
      <form @submit="login">
        <label for="chk" aria-hidden="true">Login</label>
        <input
          v-model="signInEmail"
          type="email"
          name="email"
          placeholder="Email"
          :required="true"
        />
        <input
          v-model="signInPassword"
          type="password"
          name="password"
          placeholder="Password"
          :required="true"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { POSITION, useToast } from "vue-toastification";
import router from "@/router";

const toast = useToast();
const signUpUsername = ref("");
const signUpEmail = ref("");
const signUpPassword = ref("");
const signInEmail = ref("");
const signInPassword = ref("");

const createAccount = () => {
  if (
    signUpEmail.value.length > 0 &&
    signUpUsername.value.length > 0 &&
    signUpPassword.value.length > 0
  ) {
    toast.success("Account created", { position: POSITION.TOP_CENTER });
    signUpUsername.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
  }
};

const login = () => {
  if (signInEmail.value.length > 0 && signInPassword.value.length > 0) {
    signInEmail.value = "";
    signInPassword.value = "";
    router.push({ path: "/home" });
  }
};
</script>

<style scoped>
.background {
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover;
}
#chk {
  display: none;
}

label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 60%;
  height: 40px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
.login {
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.6);
}

#chk:checked ~ .login {
  transform: translateY(-500px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}
</style>
