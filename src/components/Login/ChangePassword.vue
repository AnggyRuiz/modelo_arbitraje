<template>
  <div>
    <section class="vh-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <h5 class="mb-3">Por seguridad debe cambiar su contraseña</h5>
                <p>La contraseña debe tener minimo 6 caracteres</p>
                <form @submit.prevent="changePass()">
                  <div class="form-outline mb-4">
                    <div
                      class="alert alert-danger"
                      id="alert"
                      role="alert"
                      style="display: none"
                    >
                      La información no coincide.
                    </div>
                    <input
                      type="Password"
                      placeholder="Contraseña"
                      v-model="pass"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="Password"
                      placeholder="Repetir contraseña"
                      v-model="passR"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                  </div>
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Cambiar Contraseña
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  </div>
</template>
 
<script>
import { mapActions, mapState } from "vuex";
import router from "../../router";

export default {
  data() {
    return {
      pass: null,
      passR: null,
      password: null,
    };
  },
  computed: {
    ...mapState(["kUser"]),
  },
  methods: {
    async changePass() {
      console.log(this.pass);
      console.log(this.passR);
      console.log(this.kUser);

      if (this.pass == this.passR) {
        this.password = this.pass;
        console.log("sisaaas");
        try {
          const res = await fetch(
            "https://backendmodelo.herokuapp.com/api/user/changePsw",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: this.kUser._id,
                password: this.password,
              }),
            }
          );
          const userDB = await res.json();
          router.push("/about");
          return userDB;
        } catch (error) {
          console.log(error);
        }
      } else {
        document.getElementById("alert").style.display = "block";
        console.log("nonaaaas");
      }
    },
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>