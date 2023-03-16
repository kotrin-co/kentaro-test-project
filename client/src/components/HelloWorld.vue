<script setup lang="ts">
import { ref, onMounted } from "vue";
import liff from "@line/liff";

defineProps<{ msg: string }>();

onMounted(async () => {
  // LIFFの初期化
  await liff.init({ liffId: "1657543821-2pzkz5dP" });
  const profile = await liff.getProfile();
  lineName.value = profile.displayName;
});

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
    },
    (error) => {
      console.log(error);
    }
  );
};

const latitude = ref<number>();
const longitude = ref<number>();
const lineName = ref<string>();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="getLocation">位置情報GET！</button>
  </div>

  <div class="card" v-if="latitude && longitude">
    <p>{{ lineName }}さんの位置情報です</p>
    <p>緯度:{{ latitude }}</p>
    <p>経度:{{ longitude }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
