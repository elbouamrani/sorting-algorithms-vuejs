<template>
  <div id="app">
    <div style="display: flex">
      <select v-model="algorithm" placeholder="select a sorting algorithm">
        <option v-for="(alg, key) in algorithmsNames()" :key="key">
          {{ alg }}
        </option>
      </select>
      &nbsp;|&nbsp;
      <div>items size: {{ items.length }}</div>
      &nbsp;|&nbsp;
      <div>swaps heap: {{ swaps.length }}</div>
      &nbsp;|&nbsp;
      <button @click="sort">start</button>
      &nbsp;|&nbsp;
      <button @click="reset">reset</button>
    </div>
    <Visual :items="items" />
    <div>
      <div>History</div>
      <div v-for="(record, key) in records" :key="key">
        {{ record.algorithm }} | {{ record.operations }}
      </div>
    </div>
  </div>
</template>

<script>
import { Bus } from "./services/BusService";
import { Algorithms, Sorter } from "./services/SorterService";

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
      algorithm: null,
      ticker: null,
      records: [],
    };
  },
  methods: {
    reset() {
      this.generateItems();
      this.setupTicker();
    },
    sort() {
      if (this.algorithm) {
        this.closeRecord();
        this.sorted = Sorter(this.sorted, Algorithms[this.algorithm]);
      }
    },
    captureSwap(operation) {
      this.swaps.push(operation);
    },
    handleRecords(operation) {
      const record = this.records.find((record) => record.status === "open");
      if (record) {
        record.operations++;
      } else {
        this.records.push({
          algorithm: this.algorithm,
          operations: 1,
          status: "open",
        });
      }
    },
    closeRecord() {
      this.records = [
        ...this.records.map((record) => {
          return { ...record, status: "closed" };
        }),
      ];
    },
    swap(indexes) {
      const data = [...this.items];

      const tmp = data[indexes[0]];

      data[indexes[0]] = data[indexes[1]];
      data[indexes[1]] = tmp;

      this.items = data;
    },
    selectAlgorithm(e) {
      console.log(e);
    },
    algorithmsNames() {
      return Object.keys(Algorithms);
    },
    generateItems() {
      this.items = generateur(125, 190);
      this.sorted = this.items;
    },
    setupTicker() {
      clearInterval(this.ticker);
      this.ticker = setInterval(() => {
        if (this.swaps.length) {
          this.swap(this.swaps.shift());
        }
      }, 5);
    },
  },
  mounted() {
    Bus.$on("swap", this.captureSwap);
    Bus.$on("swap", this.handleRecords);

    this.generateItems();
    this.setupTicker();
  },
};
</script>
