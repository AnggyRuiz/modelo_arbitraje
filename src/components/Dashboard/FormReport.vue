<template>
  <div>
    <div class="row col-12 d-flex justify-content-evenly">
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
         <div
            class="alert alert-danger m-2"
            id="alertData"
            role="alert"
          >
            <b>¡Recuerda!</b> debes contar con la autorización del titular antes de realizar la consulta en la plataforma.
          </div>
          <h4 class="h4 align-self-start pt-3 pb-3">Generar Reporte</h4>
          <div
            class="alert alert-danger"
            id="alert"
            role="alert"
            style="display: none"
          >
            Debes completar el campo documento.
          </div>
          <div
            class="alert alert-danger"
            id="alertQuey"
            role="alertQuey"
            style="display: none"
          >
            Ya no tienes consultas disponibles
          </div>
          <form @submit.prevent="sendData">
            <div class="row col-12 col-md-12 pb-4 justify-content-between m-0">
              <select
                @change="onChange()"
                id="selected"
                style="width: 35%"
                class="custom-select custom-select-lg rounded-3"
              >
                <option
                  v-for="(typeDocs, index) in typeDoc"
                  :key="index"
                  class="dropdown-item"
                >
                  {{ typeDocs }}
                </option>
              </select>
              <input
                v-model="doc"
                style="width: 60%"
                type="text"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-outline-primary mb-4">
              Consultar
            </button>
          </form>
        </div>
      </div>
      <loading-data :name="userData.nombre" v-if="userData"></loading-data>
    </div>
    <data-table></data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataTable from "./DataTable.vue";
import LoadingData from "./LoadingData.vue";
export default {
  components: { LoadingData, DataTable },
  computed: {
    ...mapState(["userData", "typeTable", "kUser", "queryNum"]),
  },
  data() {
    return {
      typeDoc: ["CC", "NIT", "CE", "PEP", "PP", "NOMBRE"],
      doc: "",
      data: {
        doc: "",
        typedoc: "",
        queryNum: null,
        id: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "searchData",
      "setTypeTable",
   
      "setQueryNum",
      "setTypeLoad",
    ]),

    async sendData() {
      if (!this.doc) {
        console.error("debe llenar todos los campos");
        document.getElementById("alert").style.display = "block";
        document.getElementById("alertData").style.display = "none";
      } else {
        document.getElementById("alert").style.display = "none";
        (this.kUser);
        this.setQueryNum(this.kUser.id).then((res, err) => {
          if (err) throw new Error(err);
          if (!this.queryNum == 0) {
            const e = document.getElementById("selected");
            const result = e.options[e.selectedIndex].value;
            this.data.doc = this.doc;
            this.data.typedoc = result;
            this.data.queryNum = this.queryNum - 1;
            this.data.id = this.kUser.id;
            this.setTypeLoad("form");

           this.searchData(this.data)
              .then((result) => {
                this.doc = null;
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            document.getElementById("alertQuey").style.display = "block";
            document.getElementById("alertData").style.display = "none";
            
            return;
          }
        });
      }
    },
    onChange() {
      const e = document.getElementById("selected");
      const result = e.options[e.selectedIndex].value;
      this.setTypeTable(result);
    },
  },
};
</script>

<style>
</style>