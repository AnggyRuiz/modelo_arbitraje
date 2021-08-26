<template>
  <div>
    <login />
    <!--  <form @submit.prevent="login(user)">
      <input type="email" placeholder="email" v-model="user.email" />
      <input type="password" placeholder="password" v-model="user.password" />
      <button type="submit">Acceder</button>
    </form>
    {{user}} -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Login from '../components/Login.vue';
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
  components: {
    Login,
  },
};
</script>
