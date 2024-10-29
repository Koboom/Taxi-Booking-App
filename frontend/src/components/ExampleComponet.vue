<template>
    <div>
      <h2>Example Component</h2>
      <p>Click the button to get string from DB:</p>
      <button @click="processData">Get Data</button>
      <p v-if="output">Output: {{ output }}</p>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        output: null  // String from getStringFromDB will be stored here
      };
    },
    methods: {
      getStringFromDB(buffer, start, length) {
        let outstr = "";
        for (let n = start; n < start + length; n++) {
          outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
      },
      processData() {
        // Sample data to simulate buffer (you can replace this with real buffer)
        const buffer = new DataView(new ArrayBuffer(10));
        const outputString = this.getStringFromDB(buffer, 0, 10);
        this.output = outputString;
      }
    }
  };
  </script>

  <style scoped>
  /* h1 {
    color: #42b983;
  } */
  </style>
