<template>
  <div class="row col-12 col-md-12 mt-5">
    <div v-if="dataTrx" class="table-responsive">
      <div class="vld-parent">
        <loading
          v-model:active="isLoadingD"
          :can-cancel="false"
          :is-full-page="true"
        />
      </div>
      <table
        v-if="typeTable == 'NIT'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayNit in arrayNit" :key="arrayNit.id">
            <td>{{ arrayNit.id }}</td>
            <td>{{ arrayNit.name }}</td>
            <td>{{ arrayNit.date }}</td>
            <td>
              <img
                v-if="arrayNit.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayNit.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayNit.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryNit(
                    arrayNit.jobId,
                    arrayNit.typeDoc,
                    arrayNit.name,
                    arrayNit._id,
                    arrayNit.idUser
                  )
                "
              />
              <p v-else style="width: 20px margin-left:0;" class="img-fluid">
                --
              </p>
            </td>
            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
                @click="DesReport(arrayNit.jobId, 'nit')"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="typeTable == 'CC'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayCC in arrayCC" :key="arrayCC.id">
            <td>{{ arrayCC.id }}</td>
            <td>{{ arrayCC.name }}</td>
            <td>{{ arrayCC.date }}</td>
            <td>
              <img
                v-if="arrayCC.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayCC.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayCC.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryCC(
                    arrayCC.jobId,
                    arrayCC.typeDoc,
                    arrayCC.name,
                    arrayCC._id,
                    arrayCC.idUser
                  )
                "
              />
              <p v-else style="width: 20px margin-left:0;" class="img-fluid">
                --
              </p>
            </td>
            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
                @click="DesReport(arrayCC.jobId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="typeTable == 'CE'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayCE in arrayCE" :key="arrayCE.id">
            <td>{{ arrayCE.id }}</td>
            <td>{{ arrayCE.name }}</td>
            <td>{{ arrayCE.date }}</td>
            <td>
              <img
                v-if="arrayCE.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayCE.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayCE.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryCE(
                    arrayCE.jobId,
                    arrayCE.typeDoc,
                    arrayCE.name,
                    arrayCE._id,
                    arrayCE.idUser
                  )
                "
              />
              <p v-else style="width: 20px margin-left:0;" class="img-fluid">
                --
              </p>
            </td>

            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="typeTable == 'PEP'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayPEP in arrayPEP" :key="arrayPEP.id">
            <td>{{ arrayPEP.id }}</td>
            <td>{{ arrayPEP.name }}</td>
            <td>{{ arrayPEP.date }}</td>

            <td>
              <img
                v-if="arrayPEP.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayPEP.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayPEP.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryPEP(
                    arrayPP.jobId,
                    arrayPP.typeDoc,
                    arrayPP.name,
                    arrayPP._id,
                    arrayPP.idUser
                  )
                "
              />
              <p v-else style="width: 20px margin-left:0;" class="img-fluid">
                --
              </p>
            </td>

            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="typeTable == 'PP'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayPP in arrayPP" :key="arrayPP.id">
            <td>{{ arrayPP.id }}</td>
            <td>{{ arrayPP.name }}</td>
            <td>{{ arrayPP.date }}</td>
            <td>
              <img
                v-if="arrayPP.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayPP.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayPP.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryPP(
                    arrayPP.jobId,
                    arrayPP.typeDoc,
                    arrayPP.name,
                    arrayPP._id,
                    arrayPP.idUser
                  )
                "
              />
              <p v-else style="width: 20px margin-left:0;" class="img-fluid">
                --
              </p>
            </td>
            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="typeTable == 'NOMBRE'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hallazgo</th>
            <th>Error</th>
            <th>Recargar</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arrayNOM in arrayNOM" :key="arrayNOM.id">
            <td>{{ arrayNOM.id }}</td>
            <td>{{ arrayNOM.name }}</td>
            <td>{{ arrayNOM.date }}</td>
            <td>
              <img
                v-if="arrayNOM.finding"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayNOM.err"
                src="../../assets/X.png"
                style="width: 20px"
                class="img-fluid"
              />
              <img
                v-else
                src="../../assets/check.png"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
            <td>
              <img
                v-if="arrayNOM.err"
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid"
                @click="
                  getDataRetryPP(
                    arrayNOM.jobId,
                    arrayNOM.typeDoc,
                    arrayNOM.name,
                    arrayNOM._id,
                    arrayNOM.idUser
                  )
                "
              />
              <p v-else style="width: 20px; margin-left: 0" class="img-fluid">
                --
              </p>
            </td>
            <td>
              <img
                src="../../assets/ver.svg"
                style="width: 20px"
                class="img-fluid"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      arrayNit: null,
      arrayCC: null,
      arrayCE: null,
      arrayPP: null,
      arrayPEP: null,
      arrayNOM: null,
      isLoadingD: false,
    };
  },
  computed: {
    ...mapState(["dataTrx", "typeTable", "kUser"]),
  },
  methods: {
    ...mapActions([
      "getRetry",
      "setTypeLoad",
      "getResult",
      "changeTrx",
      "getDataTrx",
      "setIdTable",
      "getReport",
      "getReportNit",
      "setCantConsul",
    ]),
    getDataRetry() {
      ("entra aca");
    },

    async getDataRetryCC(jobId, typeDoc, name, id, idUser) {
      this.setIdTable(id);
      const data = { id: jobId, typedoc: typeDoc };
      this.getRetry(data)
        .then((res) => {
          this.setTypeLoad("retry");
          this.getResult({ jobkey: res.jobid })
            .then((data) => {
              if (data.estado == "finalizado") {
                id, data, idUser, jobId;
                this.changeTrx(id, data, idUser, jobId);
              } else {
                //this.getDataRetryCC(jobId, typeDoc, name, id, idUser);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
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
        console.log(dataLaunch);
        this.getDataTrx(dataLaunch.idUser);
      } catch (error) {
        console.log(error);
      }
    },
    getDataRetryNit(jobId, typeDoc) {
      const data = { id: jobId, typedoc: typeDoc };
      this.getRetry(data)
        .then((res) => {
          this.setTypeLoad("retry");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataRetryNom() {},
    getDataRetryPP() {},
    getDataRetryPEP() {},
    getDataRetryCE() {},
    async DesReport(jobId, type) {
      if (type == "nit") {
        this.isLoadingD = true;
        this.getReportNit(jobId).then((res) => {
          console.log(res);
          this.isLoadingD = false;
        });
      } else {
        this.text = "Descargando Reporte";
        this.isLoadingD = true;
        this.getReport(jobId).then((res) => {
          this.isLoadingD = false;
        });
      }
    },
  },
  components: {
    Loading,
  },

  beforeUpdate() {
    console.log("aca tablee", this.dataTrx.length);
    this.arrayNit = this.dataTrx.filter((element) => element.typeDoc == "NIT");
    this.arrayCC = this.dataTrx.filter((element) => element.typeDoc == "CC");
    this.arrayCE = this.dataTrx.filter((element) => element.typeDoc == "CE");
    this.arrayPP = this.dataTrx.filter((element) => element.typeDoc == "PP");
    this.arrayPEP = this.dataTrx.filter((element) => element.typeDoc == "PEP");
    this.arrayNOM = this.dataTrx.filter(
      (element) => element.typeDoc == "NOMBRE"
    );
    this.setCantConsul(this.dataTrx.length);
  },
};
</script>

<style>
</style>