<template>
  <div class="about">
    <div class="d-flex justify-content-between m-3">
      <h1 v-if="kUser">Welcome {{ kUser.name }}!</h1>
      <div>
        
      <button
        @click="logOut"
        type="button"
        class="btn btn-primary mb-4"
        style="width: 150px; height: 37px"
      >
        Cerrar sesión
      </button>
      <h6>Consultas disponibles</h6>
      <p>{{kUser.queryNum}}</p>
      
      </div>
    </div>
    <div class="row justify-content-between ps-4">
      <form-report></form-report>
    </div><!-- 
    <data-table></data-table> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataTable from "../components/Dashboard/DataTable.vue";
import FormReport from "../components/Dashboard/FormReport.vue";
export default {
  components: { DataTable, FormReport },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapState(["token", "kUser", "queryNum"]),
  },
  methods: {
    ...mapActions(["logOut", "setUser", "getDataTrx"]),
    async protectedData() {
      try {
        const res = await fetch(
          "https://backendmodelo.herokuapp.com/api/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.token,
            },
          }
        );
        const resDB = await res.json();
        console.log(resDB);
        this.setUser(resDB.data.user);
        console.log(this.kUser);
        this.getDataTrx(this.kUser.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.protectedData();
    console.log(this.kUser);
  },
};
</script>