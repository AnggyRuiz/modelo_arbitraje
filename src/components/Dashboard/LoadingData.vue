<template>
  <div class="mt-3 col-11 col-md-5 border">
    <div
      class="
        container
        d-flex
        justify-content-center
        align-items-center
        flex-column
      "
    >
      <div class="vld-parent">
        <loading
          v-model:active="isLoadingD"
          :can-cancel="false"
          :is-full-page="true"
        />
      </div>
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
        Reporte {{ name }} Esta listo.
      </h6>
      <div class="d-flex justify-content-between">
        <button
          id="btnProcessDow"
          style="display: none; margin-right: 4px"
          @click="DesReport"
          type="button"
          class="btn btn-outline-primary align-center mt-3 mb-4"
        >
          Descargar Reporte
        </button>
        <button
          id="btnProcess"
          style="display: none"
          @click="viewReport"
          type="button"
          class="btn btn-outline-primary align-center mt-3 mb-4"
        >
          Ver Reporte
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
    ]),
    async DesReport() {
      this.text = "Descargando Reporte";
      this.isLoadingD = true;
      /* this.getReport(); */
      const username = "sosorno@isciolab.com";
      const password = "Telmo2021";
      const idToken =
        "Basic " + Buffer.from(username + ":" + password).toString("base64");
      console.log(idToken);
      axios
        .get(`/report_pdf/${this.jobId}`, {
          headers: {
            Authorization: idToken,
          },
          responseType: "blob",
        })
        .then((response) => {
          this.isLoadingD = false;
          this.getReport();

          console.log("response is : " + response.data);
          const blob = new Blob([response.data]);
          let link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "test.pdf";
          link.click();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
          console.log(error.config);
        });
    },

    viewReport() {
      this.isLoadingD = true;
      const username = "sosorno@isciolab.com";
      const password = "Telmo2021";
      const idToken =
        "Basic " + Buffer.from(username + ":" + password).toString("base64");
      console.log(idToken);
      axios
        .get(`/report/${this.jobId}`, {
          headers: {
            Authorization: idToken,
          },
        })
        .then((response) => {
          this.isLoadingD = false;
          this.getReport();

          console.log("response is : " + response.data);
          let nuevaVentana = window.open("", "NuevaVentana", "");
          nuevaVentana.document.write(response.data);
          nuevaVentana.print(); //para enviar a la cola de impresión
          console.log("click en finalizar");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
          console.log(error.config);
        });
    },
    async getJob() {
      console.log({ jobkey: this.userData.jobid });
      await this.getResult({ jobkey: this.userData.jobid })
        .then((result) => {
          if (result.estado == "procesando") {
            this.getJob();
            this.isLoading = true;
          } else {
            this.loading();
            console.log("aca res", result);
            console.log(result.id);
            this.setJobId(result.id);
            console.log(this.typeLoad);
            if (this.typeLoad == "retry") {
              console.log("ajaaaaaaaa");
              console.log(this.kUser);
              this.changeTrx(this.idTable, result, this.kUser.id, result.id);
            } else {
              if (result.typedoc == "NIT") {
                console.log("entra");
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
                console.log("ERRORES", result.errores);
                console.log("ERROR", result.error);
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
      document.getElementById("btnProcessDow").style.display = "block";
    },
    async changeTrx(_id, data, idUser, jobId) {
      console.log({ _id: _id, data });
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
        console.log(dataLaunch);
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
    console.log("aca");
    this.loading();
  },
};
</script>

<style>
</style>