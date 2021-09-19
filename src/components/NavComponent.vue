<template>
  <div class="nav-card-container">
    <router-link
      v-for="menuItem in menu"
      :key="menuItem[0]"
      class="menu-item"
      :class="{ active: activeMenuItem === menuItem[0] }"
      @click="activeMenuItem = menuItem[0]"
      :to="{ name: menuItem[0] }"
    >
      {{ menuItem[1] }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'NavComponent',
  props: {},
  data() {
    return {
      menu: [
        ['swap', 'Swap'],
        ['pool', 'Pool'],
        ['bonus', 'Bonus'],
        ['hirePranay', 'Hire Pranay!'],
      ],
    };
  },
  computed: {
    activeMenuItem() {
      return this.activeRoute;
    },
    ...mapState(['activeRoute']),
  },

  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-card-container {
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  justify-self: center;
  z-index: 99;
  position: fixed;
  bottom: 0px;
  right: 50%;
  transform: translate(50%, -50%);
  margin: 0px auto;
  /* background-color: rgb(25, 27, 31); */
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(237, 238, 242);
  /* border: 1px solid rgb(44, 47, 54); */
  box-shadow: rgb(0 0 0 / 2%) 0px 6px 10px;

  /* background-color: rgb(25, 27, 31); */
  /* background-color: rgb(237, 238, 242); */
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  overflow: auto;
  -webkit-box-align: center;
  align-items: center;

  box-sizing: border-box;
  /* margin: 0px; */
  min-width: 0px;
}

.menu-item {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  /* color: rgb(195, 197, 203); */
  color: rgb(0, 0, 0);
  /* background-color: rgb(237, 238, 242); */
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
}

.active {
  border-radius: 12px;
  font-weight: 600;
  -webkit-box-pack: center;
  justify-content: center;
  /* color: rgb(255, 255, 255); */
  color: rgb(0, 0, 0);
  background-color: rgb(237, 238, 242);
  /* background-color: rgb(44, 47, 54); */
}
</style>
