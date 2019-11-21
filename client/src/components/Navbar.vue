<template>
<nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand brand">
    <b-dropdown aria-role="list">
        <button class="button is-light" slot="trigger">
           <i style="color: grey;" class="fas fa-bars"></i>
        </button>

        <b-dropdown-item @click="$router.push('/questions/random')" aria-role="listitem">Home</b-dropdown-item>
        <p class="has-text-grey-light" style="margin-top: 5px; margin-left: 15px; text-align: left; font-size: 12px;">PUBLIC</p>
        <b-dropdown-item @click="$router.push('/questions')" aria-role="listitem">
          <b-icon
              class="has-text-grey-light"
              icon="earth"
              size="is-small">
          </b-icon>
          Fake Overflow
        </b-dropdown-item>
        <b-dropdown-item v-if="!$store.state.isLogin" class="mobile-list" style="color: #147DEF;" @click="$router.push('/users/login')" aria-role="listitem">Log in</b-dropdown-item>
        <b-dropdown-item v-if="!$store.state.isLogin" class="mobile-list"  style="background: #147DEF; color: white;" @click="$router.push('/users/signup')" aria-role="listitem">Sign Up</b-dropdown-item>
        <b-dropdown-item v-if="$store.state.isLogin" class="mobile-list" @click="logout" aria-role="listitem">Log out</b-dropdown-item>
    </b-dropdown>
    <div>
      <img class="clickable" @click="$router.push('/')"
        src="../assets/logo.png"
        alt="Fake Overflow Logo"
        style="height: 30px; margin-left: 5px;"
      >
    </div>
    <div class="clickable" @click="$router.push('/')">
      fake<strong>overflow</strong>
    </div>
  </div>

  <div id="navbarBasicExample" class="navbar-menu end-item">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
        <router-link style="margin-right: 5px;" v-if="!$store.state.isLogin" to="/users/login">
          <a class="button is-light has-text-info login-button">
            Log in
          </a>
        </router-link>
        <router-link v-if="!$store.state.isLogin" to="/users/signup">
          <a class="button is-info">
            <strong>Sign up</strong>
          </a>
        </router-link>
        <router-link to="/users">
        <button v-if="$store.state.isLogin" class="button is-dark">{{ $store.state.loggedUser.username.charAt(0).toUpperCase() }}</button>
        </router-link>
        <router-link v-if="$store.state.isLogin" to="/users/login">
          <a @click="logout" class="button has-text-dark is-light login-button">
            Log out
          </a>
        </router-link>
      </div>
      </div>
    </div>
  </div>
</nav>
  <!-- <b-navbar class="navbar has-background-light">
    <template slot="brand">
      <div class="brand">
          <div>
            <img
              src="../assets/logo.png"
              alt="Fake Overflow Logo"
              style="height: 20px;"
            >
          </div>
          <div>
            fake<strong>overflow</strong>
          </div>
      </div>
    </template>

  <template slot="end">
    <b-navbar-item tag="div" class="end-item">
      <div class="buttons">
        <router-link style="margin-right: 5px;" v-if="!$store.state.isLogin" to="/users/login">
          <a class="button is-light has-text-info login-button">
            Log in
          </a>
        </router-link>
        <router-link v-if="!$store.state.isLogin" to="/users/signup">
          <a class="button is-info">
            <strong>Sign up</strong>
          </a>
        </router-link>
        <router-link to="/users">
        <button v-if="$store.state.isLogin" class="button is-dark">{{ $store.state.loggedUser.username.charAt(0).toUpperCase() }}</button>
        </router-link>
        <router-link v-if="$store.state.isLogin" to="/users/login">
          <a @click="logout" class="button has-text-dark is-light login-button">
            Log out
          </a>
        </router-link>
      </div>
    </b-navbar-item>
    </template>
  </b-navbar> -->
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0px 1px 10px 1px #e4e4e4;
}
.brand {
  margin-left: 5%;
  padding-top: 10px;
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;
}
.end-item {
  margin-right: 5%;
}
.login-button {
  border: none;
}
.mobile-list {
  display: none;
}
@media screen and (max-width: 1023px) {
  .brand {
    margin-left: 10%;
  }
  .mobile-list {
    display:list-item;
  }
}
</style>
