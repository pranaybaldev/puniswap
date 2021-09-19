<template>
  <div class="pool">
    <div> Coming Soon? </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';

export default {
  name: 'pool',
  components: {
    // HelloWorld,
  },
  mounted(): void {
    this.setActiveRoute('pool');
  },
  methods: {
    ...mapActions(['setActiveRoute']),
  },
};
</script>
