<template>
  <div class="mt-3 col-11 col-md-6 border">
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
      <h6 class="h6 align-self-start">procesando reporte de {{ name }}.</h6>
    
      <button
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

export default {
  props: {
    name: "",
  },

  computed: {
    ...mapState(["jobId", "userData"]),
  },
  created() {
    console.log(this.userData);
  },
  methods: {
    ...mapActions(["getReport"]),
    async viewReport() {
      this.getReport({ id: this.jobId });
    },
  },
};
</script>

<style>
</style>