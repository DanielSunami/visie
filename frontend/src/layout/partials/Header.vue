<template>
  <b-navbar id="template-header" class="p-0 fixed-top d-flex flex-row" toggleable="lg">
    <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
      <router-link class="navbar-brand brand-logo-mini" to="/">
        <img src="@/assets/images/logo-mini.svg" alt="logo" />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button class="navbar-toggler navbar-toggler align-self-center d-lg-block" type="button" @click="toggleSidebar()">
        <span class="mdi mdi-format-line-spacing"></span>
      </button>
      <ul class="navbar-nav w-100">
        
      </ul>
      <b-navbar-nav class="navbar-nav-right ml-auto">
        
      </b-navbar-nav>
      <button class="navbar-toggler navbar-toggler-right align-self-center" type="button" @click="toggleMobileSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    toggleSidebar: () => {
      document.querySelector('body').classList.toggle('sidebar-icon-only');
    },
    toggleMobileSidebar: () => {
      document.querySelector('#sidebar').classList.toggle('active');
    }
  }
}
</script>

<style scoped>
</style>