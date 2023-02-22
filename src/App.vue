<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: "#014f86",
    primaryColorHover: '#014fa6',
    primaryColorPressed: '#014fc6',
    primaryColorSuppl: '#014fe6',
  },
};

// ...
</script>
