<template>
  <div class="mt-3 col-11 col-md-5 border">
    <loading
      v-model:active="isLoadingD"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div
      class="
        container
        d-flex
        justify-content-center
        align-items-center
        flex-column
      "
    >
      <div class="vld-parent"></div>
      <h4 class="h4 pt-3 pb-3 align-self-start">Reporte Solicitado</h4>
      <div>
        <loading
          style="position: relative"
          v-model:active="isLoading"
          :can-cancel="true"
          :is-full-page="false"
        />
        <h6 id="process" class="h6 align-self-start">
          procesando reporte {{ name }}.
        </h6>
      </div>
      <h6 id="okData" style="display: none" class="h6 align-center pt-2">
        El reporte {{ name }} Esta listo.
      </h6>
      <div class="d-flex justify-content-between">
        <!--    <button
          id="btnProcessDow"
          style="display: none; margin-right: 4px"
          @click="DesReport"
          type="button"
          class="btn btn-outline-primary align-center mt-3 mb-4"
        >
          Ver Reporte
        </button> -->
        <button
          id="btnProcess"
          style="display: none"
          @click="viewReport"
          type="button"
          class="btn btn-outline-primary align-center mt-3 mb-4"
        >
          Ver Reporte Tradicional
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";

export default {
  props: {
    name: "",
  },
  data() {
    return {
      data: null,
      isLoading: true,
      isLoadingD: false,
      axios,
      text: "",
    };
  },
  computed: {
    ...mapState([
      "userData",
      "jobId",
      "kUser",
      "numNit",
      "typeLoad",
      "idTable",
      "typeTable",
    ]),
  },

  mounted: async function () {
    this.data = await this.getJob();
  },
  methods: {
    ...mapActions([
      "getReport",
      "getResult",
      "saveData",
      "setJobId",
      "getDataTrx",
      "getReportNit",
    ]),
    /*   async DesReport() {
      this.text = "Descargando Reporte";
      this.isLoadingD = true;
       this.getReport2(this.jobId); 
   
    }, */

    viewReport() {
      console.log("entra", this.typeTable);
      this.isLoadingD = true;
      if (this.typeTable == "NIT") {
        this.getReportNit(this.jobId).then((res) => {
          this.isLoadingD = false;
        });
      } else {
        this.getReport(this.jobId).then((res) => {
          this.isLoadingD = false;
        });
      }
    },
    async getJob() {
      await this.getResult({ jobkey: this.userData.jobid })
        .then((result) => {
          console.log(result);
          if (result.estado == "procesando") {
            this.getJob();
            this.isLoading = true;
          } else {
            this.loading();
            this.setJobId(result.id);
            this.typeLoad;
            if (this.typeLoad == "retry") {
              this.kUser;
              this.changeTrx(this.idTable, result, this.kUser.id, result.id);
            } else {
              if (result.typedoc == "NIT") {
                this.saveData({
                  name: result.nombre,
                  id: this.numNit,
                  idUser: this.kUser.id,
                  typeDoc: result.typedoc,
                  jobId: result.id,
                  findings: result.hallazgos,
                  errores: result.errores,
                  finding: result.hallazgo,
                  err: result.error,
                });
              } else {
                console.log(result.nombre);
                if (result.nombre == "") {
                  console.log("entra");
                  
                  this.saveData({
                    name: 'No Identidicado',
                    id: result.cedula,
                    idUser: this.kUser.id,
                    typeDoc: result.typedoc,
                    jobId: result.id,
                    findings: result.hallazgos,
                    errores: result.errores,
                    finding: result.hallazgo,
                    error: result.error,
                  })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  this.saveData({
                    name: result.nombre,
                    id: result.cedula,
                    idUser: this.kUser.id,
                    typeDoc: result.typedoc,
                    jobId: result.id,
                    findings: result.hallazgos,
                    errores: result.errores,
                    finding: result.hallazgo,
                    error: result.error,
                  })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    loading() {
      this.isLoading = false;
      document.getElementById("process").style.display = "none";
      document.getElementById("okData").style.display = "block";
      document.getElementById("btnProcess").style.display = "block";
      // document.getElementById("btnProcessDow").style.display = "block";
    },
    async changeTrx(_id, data, idUser, jobId) {
      try {
        const res = await fetch(
          "https://backendmodelo.herokuapp.com/api/trx/changeTrx",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: _id,
              id: data.cedula,
              err: data.error,
              name: data.nombre,
              errores: data.errores,
              findings: data.hallazgos,
              finding: data.hallazgo,
              typedoc: data.typedoc,
              idUser: idUser,
              jobId: jobId,
            }),
          }
        );
        const dataLaunch = await res.json();
        this.getDataTrx(dataLaunch.idUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    Loading,
  },
  beforeUpdate() {
    this.loading();
  },
};
</script>

<style>
</style>