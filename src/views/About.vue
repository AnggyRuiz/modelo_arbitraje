<template>
  <div class="about">
    <div class="d-flex justify-content-between m-3">
      <h1 v-if="kUser">Hola {{ kUser.name }}!</h1>
      <div d-flex flex-column>
        <button
          @click="logOut"
          type="button"
          class="btn btn-primary mb-4"
          style="width: 150px; height: 37px"
        >
          Cerrar sesión
        </button>
        <div class="d-flex">
          <div class="d-flex flex-column p-2">
            <h6><b>Consultas disponibles</b></h6>
            <p v-if="kUser">{{ kUser.queryNum }}</p>
          </div>
          <div class="d-flex flex-column p-2">
            <h6><b>Consultas Realizadas</b></h6>
            <p v-if="cantConsul">{{ cantConsul }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-between ps-4">
      <form-report></form-report>
    </div>
    <!-- 
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
      cantConsul: null,
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
        this.setUser(resDB.data.user);
        this.getDataTrx(this.kUser.id).then((res) => {
          console.log(res.length);
          this.cantConsul = res.length;
        });
      } catch (error) {
        console.log();
        error;
      }
    },
  },
  created() {
    this.protectedData();
  },
};
</script>