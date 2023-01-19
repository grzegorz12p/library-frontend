<template>
  <div
    class="background w-[350px] h-[500px] bg-[red] shadow-[5px_20px_50px_#000] overflow-hidden rounded-[10px]"
  >
    <input type="checkbox" id="chk" aria-hidden="true" />

    <div class="relative h-full w-full">
      <form @submit.prevent="createAccount">
        <label
          class="text-white text-[2.3em] m-[60px] justify-center flex font-bold cursor-pointer transition-[0.5s_easy-in-out]"
          for="chk"
          aria-hidden="true"
          >Zarejestruj</label
        >
        <div class="mt-[-30px] grid grid-rows-4 grid-cols-8">
          <TheInput
            class="col-start-3 col-span-4"
            type="text"
            name="createUserLogin"
            placeholder="Login"
            :value="signUpUsername"
            :required="true"
            @value-changed="(value) => (signUpUsername = value)"
          />
          <TheInput
            class="col-start-3 col-span-4"
            :value="signUpEmail"
            type="email"
            name="createUserEmail"
            placeholder="Email"
            :required="true"
            @value-changed="(value) => (signUpEmail = value)"
          />
          <TheInput
            class="col-start-3 col-span-4"
            :value="signUpPassword"
            type="password"
            name="createUserPassword"
            placeholder="Hasło"
            :required="true"
            @value-changed="(value) => (signUpPassword = value)"
          />
          <TheButton
            class="col-start-3 col-span-4"
            button-type="submit"
            button-text="Zarejestruj"
          />
        </div>
      </form>
    </div>

    <div class="login">
      <form @submit.prevent="login">
        <label
          class="text-[2.3em] m-[60px] justify-center flex font-bold cursor-pointer transition-[0.5s_easy-in-out]"
          for="chk"
          aria-hidden="true"
          >Logowanie</label
        >
        <div class="grid grid-rows-4 grid-cols-8">
          <TheInput
            class="col-start-3 col-span-4"
            :value="signInLogin"
            type="text"
            name="login"
            placeholder="Login"
            :required="true"
            @value-changed="(value) => (signInLogin = value)"
          />
          <TheInput
            class="col-start-3 col-span-4"
            :value="signInPassword"
            type="password"
            name="password"
            placeholder="Hasło"
            :required="true"
            @value-changed="(value) => (signInPassword = value)"
          />
          <TheButton
            class="col-start-3 col-span-4"
            button-type="submit"
            button-text="Zaloguj"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { POSITION, useToast } from "vue-toastification";
import router from "@/router";
import TheInput from "./TheInput.vue";
import TheButton from "./TheButton.vue";
import { useUserStore } from "@/stores/userStore";

const toast = useToast();
const signUpUsername = ref("");
const signUpEmail = ref("");
const signUpPassword = ref("");
const signInLogin = ref("");
const signInPassword = ref("");
const userStore = useUserStore();

const createAccount = () => {
  if (
    signUpEmail.value.length > 0 &&
    signUpUsername.value.length > 0 &&
    signUpPassword.value.length > 0
  ) {
    userStore
      .createUser(signUpUsername.value, signUpEmail.value, signUpPassword.value)
      .then((response) => {
        signUpUsername.value = "";
        signUpEmail.value = "";
        signUpPassword.value = "";
        if (response) {
          toast.success("Użytkownik został utworzony.", {
            position: POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(
            "Podano nieprawidłowe dane albo użytkownik już istnieje.",
            {
              position: POSITION.BOTTOM_CENTER,
            }
          );
        }
      });
  }
};

const login = async () => {
  if (signInLogin.value.length > 0 && signInPassword.value.length > 0) {
    userStore
      .login(signInLogin.value, signInPassword.value)
      .then((response) => {
        signInLogin.value = "";
        signInPassword.value = "";
        if (response) {
          router.push("/home");
        } else {
          toast.error("Podano nieprawidłowy login lub hasło", {
            position: POSITION.BOTTOM_CENTER,
          });
        }
      });
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
