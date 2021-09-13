<template>
  <div class="container col-12 col-md-12 mt-5 border">
    <div v-if="dataTrx" class="table-responsive">
      <table
        v-if="typeTable == 'NIT'"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Fecha</th>
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryNit(arrayNit.jobId, arrayNit.typeDoc, arrayNit.name)"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryCC(arrayCC.jobId, arrayCC.typeDoc, arrayCC.name)"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryCE()"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryPEP()"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryPP()"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
                @click="getDataRetryNom()"
              />
            </td>
            <td>
              <img
                src="../../assets/descargar.png"
                style="width: 20px"
                class="img-fluid ms-2"
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
export default {
  data() {
    return {
      arrayNit: null,
      arrayCC: null,
      arrayCE: null,
      arrayPP: null,
      arrayPEP: null,
      arrayNOM: null,
    };
  },
  computed: {
    ...mapState(["dataTrx", "typeTable", "kUser"]),
  },
  methods: {
    ...mapActions(["getDataTrx", "getRetry", "setJobId", "setTypeLoad"]),
    getDataRetry() {
      console.log("entra aca");
    },
    getDataRetryNom() {},
    getDataRetryPP() {},
    getDataRetryPEP() {},
    getDataRetryCE() {},
    getDataRetryCC(jobId, typeDoc, name) {
      console.log(jobId);
      console.log(typeDoc);
      console.log(name);
      const data = { id: jobId, typedoc: typeDoc};
      this.getRetry(data)
        .then((res) => {
          console.log("acaress", res);
          this.setTypeLoad('retry')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataRetryNit(jobId, typeDoc) {
      console.log(jobId);
      console.log(typeDoc);
      const data = { id: jobId, typedoc: typeDoc };
      this.getRetry(data)
        .then((res) => {
          console.log("acaress", res);
          this.setTypeLoad('retry')

        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeUpdate() {
    console.log("aca tablee", this.dataTrx);
    this.arrayNit = this.dataTrx.filter((element) => element.typeDoc == "NIT");
    this.arrayCC = this.dataTrx.filter((element) => element.typeDoc == "CC");
    this.arrayCE = this.dataTrx.filter((element) => element.typeDoc == "CE");
    this.arrayPP = this.dataTrx.filter((element) => element.typeDoc == "PP");
    this.arrayPEP = this.dataTrx.filter((element) => element.typeDoc == "PEP");
    this.arrayNOM = this.dataTrx.filter(
      (element) => element.typeDoc == "NOMBRE"
    );
  },
};
</script>

<style>
</style>