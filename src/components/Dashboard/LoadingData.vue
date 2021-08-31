<template>
  <div class="mt-3 col-10 col-md-6 border">
    <div
      class="
        container
        d-flex
        justify-content-center
        align-items-center
        flex-column
      "
    >
      <h6 class="h6 pt-3 pb-3 align-self-start">Reporte Solicitado</h6>
      <div>
        <loading
          style="position: relative"
          v-model:active="isLoading"
          :can-cancel="true"
          :is-full-page="false"
        />
        <h6 id="process" class="h6 align-self-start">
          procesando reporte de {{ name }}.
        </h6>
      </div>
      <h6 id="okData" style="display: none" class="h6 align-self-start">
        Reporte de {{ name }} Esta listo.
      </h6>
      <button
        id="btnProcess"
        style="display: none"
        @click="viewReport"
        type="button"
        class="btn btn-outline-primary mb-4 align-self-start"
      >
        Ver Reporte
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  props: {
    name: "",
  },
  data() {
    return {
      data: null,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["userData", "jobId"]),
  },

  mounted: async function () {
    this.data = await this.getJob();
    this.isLoading = false;
    document.getElementById("process").style.display = "none";
    document.getElementById("okData").style.display = "block";
    document.getElementById("btnProcess").style.display = "block";
  },
  methods: {
    ...mapActions(["getReport", "getResult"]),
    async viewReport() {
      this.getReport({ id: this.jobId });
    },
    async getJob() {
      console.log({ jobkey: this.userData.jobid });
      await this.getResult({ jobkey: this.userData.jobid })
        .then((result) => {
          console.log("aca res", result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  components: {
    Loading,
  },
};
</script>

<style>
</style>