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

import { generateur } from "./data/items";

export default {
  name: "App",
  components: {
    Visual,
  },
  data() {
    return {
      items: [],
      sorted: [],
      swaps: [],
    };
  },
  methods: {
    sort() {
      this.sorted = simpleSorter(this.sorted);
    },
    captureSwap(operation) {
      this.swaps.push(operation);
    },
    swap(indexes) {
      const data = [...this.items];

      const tmp = data[indexes[0]];

      data[indexes[0]] = data[indexes[1]];
      data[indexes[1]] = tmp;

      this.items = data;
    },
  },
  mounted() {
    Bus.$on("swap", this.captureSwap);

    this.items = generateur(80, 190);
    this.sorted = this.items;

    setInterval(() => {
      if (this.swaps.length) {
        this.swap(this.swaps.shift());
      }
    }, 10);
  },
};
</script>
