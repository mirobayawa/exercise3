<template>
  <div id="nav">
    <div class="text-2xl font-bold font-nunito text-gray-500 p-3 ml-3 flex flex-col items-start">
      <router-link to="/">
        Exercise 3
      </router-link>
      <div class="border-2 px-20 shadow-lg border-indigo-200"></div>
    </div>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

}
</style>
