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
          <h4 class="h4 align-self-start pt-3 pb-3">Generar Reporte</h4>
          <div
            class="alert alert-danger"
            id="alert"
            role="alert"
            style="display: none"
          >
            Debes completar el campo documento.
          </div>
          <form @submit.prevent="sendData">
            <div class="row col-12 col-md-12 pb-4 justify-content-between m-0">
              <select
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LoadingData from "./LoadingData.vue";
export default {
  components: { LoadingData },
  computed: {
    ...mapState(["userData"]),
  },
  data() {
    return {
      typeDoc: ["CC", "NIT", "CE", "PEP", "PASAPORTE", "NOMBRE"],
      doc: "",
      data: {
        doc: "",
        typedoc: "",
      },
    };
  },
  methods: {
    ...mapActions(["searchData", "getResult"]),

    async sendData() {
      if (!this.doc) {
        console.error("debe llenar todos los campos");
        document.getElementById("alert").style.display = "block";
      } else {
        document.getElementById("alert").style.display = "none";
        const e = document.getElementById("selected");
        const result = e.options[e.selectedIndex].value;
        this.data.doc = this.doc;
        this.data.typedoc = result;
        console.log(this.data);
        await this.searchData(this.data)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style>
</style>