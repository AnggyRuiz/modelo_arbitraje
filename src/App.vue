<template>
  <div id="nav">
    <!--  <button @click="logOut">Cerrar sesión</button> -->
  </div>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getToken", "logOut"]),
  },
  created() {
    this.getToken();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
