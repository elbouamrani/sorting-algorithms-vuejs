<template>
  <div id="app">
    <div style="display: flex">
      <div>items size: {{ items.length }}</div>
      &nbsp;|&nbsp;
      <div>swaps heap: {{ swaps.length }}</div>
      &nbsp;|&nbsp;
      <button @click="sort">start</button>
    </div>
    <Visual :items="items" />
  </div>
</template>

<script>
import { Bus } from "./services/BusService";
import { simple as simpleSorter } from "./services/SorterService";

import Visual from "./components/Visual";

import { simple as simpleData } from "./data/items";

export default {
  name: "App",
  components: {
    Visual,
  },
  data() {
    return {
      items: null,
      swaps: [],
    };
  },
  methods: {
    sort() {
      this.items = simpleSorter(this.items);
    },
    captureSwap(operation) {
      this.swaps.push(operation);
    },
    swap(items) {},
  },
  mounted() {
    this.items = simpleData;
    Bus.$on("swap", this.captureSwap);
    setInterval(() => {
      if (this.swaps.length) {
        this.swap(this.swaps.shift);
      }
    }, 1000);
  },
};
</script>

<style>
</style>
