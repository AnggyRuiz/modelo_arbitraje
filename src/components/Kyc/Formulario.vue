<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 ps-3 pe-3"
  >
    <div class="col-12 col-md-4">
      <div class="card shadow-2-strong" style="border-radius: 1rem">
        <div class="card-body p-5 text-center">
          <h2 class="mb-5">Información General</h2>
          <form>
            <div class="">
              <label class="d-flex fs-6 align-self-start" for="Nombre"
                >Nombre completo</label
              >
            </div>

            <div class="form-outline mb-4">
              <input
                type="text"
                placeholder="Nombre y apellido"
                class="form-control form-control-lg"
              />
            </div>
            <div class="">
              <label class="d-flex fs-6 align-self-start" for="Nombre"
                >Número identificación</label
              >
            </div>
            <div class="d-flex form-outline mb-4">
              <select class="form-select p-2 me-3" style="width: 110px">
                <option selected>C.C</option>
                <option value="1">C.D</option>
                <option value="2">C.E</option>
                <option value="3">P.A</option>
              </select>
              <input type="text" class="form-control form-control-lg" />
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">
              Siguiente
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>