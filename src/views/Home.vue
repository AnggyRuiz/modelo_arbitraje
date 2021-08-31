<template>
  <div>
     <login /> 
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Login from '../components/Login/Login.vue';
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
