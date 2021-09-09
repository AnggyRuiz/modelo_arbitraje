<template>
  <div>
    <section class="vh-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Sign in</h3>
                <form @submit.prevent="loginUser(user)">
                  <div
                    class="alert alert-danger"
                    id="alert"
                    role="alert"
                    style="display: none"
                  >
                    La información no coincide.
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      v-model="user.email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      v-model="user.password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                  </div>
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <loading :show="show" :label="label"> </loading>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import loading from "vue-full-loading";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      show: false,
      label: "Loading...",
      timeOut: 2000,
      overlay: true,
    };
  },
  components: {
    loading,
  },
  methods: {
    ...mapActions(["login"]),
    async loginUser(user) {
      this.showMe();

      try {
        const res = await fetch(
          "https://backendmodelo.herokuapp.com/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        const userDB = await res.json();
        console.log(userDB.data.token);
        await this.login(userDB);
        return userDB;
      } catch (error) {
        console.log(error);
        this.show = false;
        document.getElementById("alert").style.display = "block";
      }
    },
    async showMe() {
      if (!this.user) {
        console.log("entra");
      } else {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, this.timeOut);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
