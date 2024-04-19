<script lang="ts">
import { ref } from 'vue';
export default {
  components: {
  },
  setup() {
    const nombreUsuario = ref('');

    return { nombreUsuario };
  }
};
</script>

<template>
  <router-view />
</template>