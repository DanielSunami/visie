<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top text-center">
        <router-link class="sidebar-brand brand-logo" to="/">
          <!--<img src="@/assets/images/logo.svg" alt="logo" />-->
          Visie
        </router-link>
        <router-link class="sidebar-brand brand-logo-mini" to="/">
          <!--<img src="@/assets/images/logo-mini.svg" alt="logo" />-->
          VS
        </router-link>
      </div>
      <ul class="nav">
        <li class="nav-item menu-items" v-on:click="collapseAll">
          <router-link class="nav-link" to="/">
            <span class="menu-icon">
              <i class="mdi mdi-format-list-bulleted"></i>
            </span>
            <span class="menu-title">Pessoas</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style type="text/css">
.sidebar-brand {
  color: white!important;
  text-decoration: none!important;
}
</style>

<script>
export default {
  name: 'sidebar',
 data () {
    return {
      collapses: [ 
     { show: false },
     { show: false },
     { show: false }
    ]
    }
  },

  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
    
  },
  methods: {
    collapseAll() {
      var exp_element = document.getElementsByClassName("show");
      if (exp_element.length > 0) {
        var elm_id = exp_element[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
    subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input]
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0 // current path starts with this path string
    })
  }
  },
  watch:{
    $route () {
       document.querySelector('#sidebar').classList.remove('active');
    }
  } 
}
</script>