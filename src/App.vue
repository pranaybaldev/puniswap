<template>
  <!-- eslint-disable -->
  <div id="container">
    <div id="header-container">
      <div id="header">
        <a href="." id="to-home-logo">
          <div id="logo-transform">
            <img
              :width="24"
              src="https://app.uniswap.org/static/media/logo.4a50b488.svg"
              alt="logo"
            />
          </div>
        </a>
        <NavComponent />
        <div id="header-right-container">
          <div id="header-right-component">
            <button aria-label="Menu" class="menu-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-top: 2px"
              >
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
  <div id="background-gradient"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import axios from 'axios';
import NavComponent from '@/components/NavComponent.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'App',
  components: {
    NavComponent,
  },
  created() {
    // console.log('route', this.$route);
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     // console.log(toParams);
    //     // console.log(previousParams);
    //   },
    // );
  },
  async mounted() {
    // TODO move url to constants
    const optimismListResponse = await axios.get(
      'https://static.optimism.io/optimism.tokenlist.json',
    );
    const geminiListResponse = await axios.get(
      'https://www.gemini.com/uniswap/manifest.json',
    );
    // TODO: for scalability lists should be inside a cumulativeTokenList field in store
    this.setOptimismTokenList(optimismListResponse?.data);
    this.setGeminiTokenList(geminiListResponse?.data);
    this.setSelectTokenList({
      key: 'geminiTokenList',
      value: geminiListResponse?.data,
      type: 'add',
    });
    this.setSelectTokenList({
      key: 'optimisimTokenList',
      value: optimismListResponse?.data,
      type: 'add',
    });
    this.setSwapTokenKey({
      key: 'input',
      value: { ...geminiListResponse?.data.tokens[0], balanceAmount: 120 },
    });
    this.setSwapTokenKey({
      key: 'output',
      value: { ...geminiListResponse?.data.tokens[1], balanceAmount: 10 },
    });
  },
  methods: {
    ...mapActions([
      'setOptimismTokenList',
      'setGeminiTokenList',
      'setSelectTokenList',
      'setSwapTokenKey',
    ]),
  },
});
</script>

<style>
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

#container {
  display: flex;
  flex-flow: column;
  align-items: center;
  /* justify-content: center; */
  /* margin-top: -40px; */
  margin-top: 120px;
  /* height: 100vh; */
}

#header-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  z-index: 2;
}

/* #header-container {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
} */

#header {
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  display: grid;
  /* grid-template-columns: 120px 1fr 120px; */
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0px;
  /* padding: 1rem; */
  z-index: 21;
  position: relative;
  background-image: linear-gradient(transparent 50%, rgb(25, 27, 31) 50%);
  background-position: 0px 0px;
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background-position 0.1s ease 0s, box-shadow 0.1s ease 0s;
  background-blend-mode: hard-light;
}

#to-home-logo {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
}

#header-right-container {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  justify-self: flex-end;
}

#nav-component {
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  justify-self: center;
  z-index: 99;
  position: fixed;
  bottom: 0px;
  right: 50%;
  transform: translate(50%, -50%);
  margin: 0px auto;
  background-color: rgb(25, 27, 31);
  border: 1px solid rgb(44, 47, 54);
  box-shadow: rgb(0 0 0 / 2%) 0px 6px 10px;
}

#logo-transform {
  transition: transform 0.3s ease 0s;
}

#logo-transform:hover {
  transform: rotate(-5deg);
}

#header-right-component {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
}

#background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  width: 200vw;
  height: 200vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fc077d10 0,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translate(-50vw, -100vh);
  z-index: -1;
}

.menu-button {
  width: 100%;
  margin: 0px;
  height: 38px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
}

.menu-button:hover,
.menu-button:focus {
  cursor: pointer;
  outline: none;
  border: 1px solid rgb(206, 208, 217);
}
</style>
