<template>
  <div class="container col-12 col-md-12 mt-5 border">
    <div class="table-responsive">
      <table v-if="dataTrx" class="table table-striped table-bordered">
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
          <tr v-for="dataTrx in dataTrx" :key="dataTrx.id">
            <td>{{ dataTrx.id }}</td>
            <td>{{ dataTrx.name }}</td>
            <td>{{ dataTrx.date }}</td>

            <td>
              <img
                src="../../assets/recargar.png"
                style="width: 20px"
                class="img-fluid ms-4"
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
  computed: {
    ...mapState(["dataTrx", "typeTable", "kUser"]),
  },
  methods: {
    ...mapActions(["getDataTrx"]),
  },
  beforeMount() {
    console.log("aca tablee", this.dataTrx);
    console.log("aca type table", this.typeTable);
  },
};
</script>

<style>
</style>