<template>
  <div class="arena" v-if="items">
    <div
      v-for="(item, key) in items"
      :key="key"
      :style="{ height: item + 'pt' }"
      class="candle"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["items"],
};
</script>

<style>
.arena {
  background-color: lightgray;
  height: 200pt;
  display: flex;
  align-items: flex-end;
}

.candle {
  width: 0pt;
  background-color: gray;
  border: 1px solid black;
  margin-right: 2pt;
  display: flex;
  font-size: 9pt;
  align-items: flex-end;
}
</style>