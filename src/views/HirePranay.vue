<template>
<iframe class="iframe" src="https://docs.google.com/document/d/e/2PACX-1vR_TSumb3Txkv7ZPanj5yDr4UkODxIyihtxmWbWfAKgvO7E5HDYMlETA3-T5XhbY-gQ531ZfvaCM1zy/pub?embedded=true"></iframe>
</template>

<script lang="ts">
import { mapActions } from 'vuex';

export default {
  name: 'hirePranay',
  components: {
  },
  mounted(): void {
    this.setActiveRoute('hirePranay');
  },
  methods: {
    ...mapActions(['setActiveRoute']),
  },
};
</script>
<style scoped>
.iframe {
    height: 80vh;
    width: 100vw;
    border: black;
    border-width: thin;
    border-radius: 12px;
    margin-top: -50px;
    border-style: solid;
}
</style>
