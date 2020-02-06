<template>
  <header class="header">
    <a class="toogle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h3 class="title">
      <router-link to="/">
      {{start}}
      </router-link>
    </h3>
    <h3 class="map">
      <router-link to="/map">
      {{map}}
      </router-link>
    </h3>
    <h4 class="welcome">
      {{welcome}}
    </h4>
    <UserDropdown v-if="!hideDropdown"/>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'
export default {
  name: "Header",
  components: {UserDropdown},
  props: {
    start: String,
    map: String,
    welcome: String,
    hideToggle: Boolean,
    hideDropdown: Boolean
  },
  computed: {
    icon() {
     return this.$store.state.isMenuVisible ?  "fa-angle-left" : "fa-angle-down"
    }
  },
  methods: {
    toggleMenu(){
     this.$store.commit('toggleMenu')
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 1.2 rem;
  color: white;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
.map {
  font-size: 1.2 rem;
  color: white;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}
header.header > a.toogle {
  color: white;
  height: 100%;
  width: 60px;
  /* justify-self: flex-start; */
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toogle:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
}

.title a:hover {
  color: white;
  text-decoration: none;
  font-size:2rem;
}
.title a {
  color: white;
  text-decoration: none;
}
.map a {
  color: white;
  text-decoration: none;
}
.map a:hover {
  color: white;
  text-decoration: none;
  font-size:2rem;
}
.welcome{
  color: white;
  margin-right: 450px;
}

</style>