<template>
  <div
    class="outer-modal-div"
    id="outer-modal-div"
    style="opacity: 1"
    v-if="
      modalLevel?.level === 'selectToken' ||
      modalLevel?.level === 'manageTokenList'
    "
    @click="shouldModalClose"
  >
    <div
      aria-modal="true"
      role="dialog"
      tabindex="-1"
      aria-label="dialog"
      class="modal-card"
    >
      <div class="modal">
        <!--header-->
        <div class="header-container">
          <div class="heading">
            <div class="heading-text">Select a token</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="close-icon"
              @click="this.setModalLevel({ level: '', origin: '' })"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div class="searchbox-container">
            <input
              type="text"
              id="token-search-input"
              placeholder="Search name or paste address"
              autocomplete="off"
              class="searchbox-input"
              v-model="inputValue"
            />
          </div>

          <div class="common-bases-container">
            <div class="common-bases-heading">
              <div class="common-bases-text">Common bases</div>
              <div class="icon-decorator">
                <span> ? </span>
              </div>
            </div>
            <!-- put into computed.. dirty -->
            <div class="common-bases-tokens-container">
              <div
                v-for="(n, index) in 7"
                :key="index"
                :class="{
                  'common-bases-token-disabled': isEitherInputOutput(
                    tokenList[index].address
                  ),
                  'common-bases-token': !isEitherInputOutput(
                    tokenList[index].address
                  ),
                }"
                @click="
                  !isEitherInputOutput(tokenList[index].address) &&
                    setInputOrOutputToken(tokenList[index])
                "
              >
                <img
                  :src="tokenList[index]?.logoURI"
                  class="token-logo"
                  style="margin-right: 8px"
                />
                <div class="heading-text">{{ tokenList[index].symbol }}</div>
              </div>
            </div>
          </div>
        </div>
        <!--hr-->
        <div class="horizontal-line"></div>
        <!--list -->
        <div
          style="
            position: relative;
            height: 284px;
            width: 100%;
            overflow: auto;
            will-change: transform;
            direction: ltr;
          "
        >
          <div>
            <div
              v-for="token in filteredTokenList"
              :key="token.address + token.name + Math.random()"
              :style="{ opacity: isEitherInputOutput(token.address) ? 0.5 : 1 }"
              class="token-list-container"
              @click="setInputOrOutputToken(token)"
            >
              <img :src="token.logoURI" alt="logo" class="token-logo" />
              <div class="modal">
                <div :title="token.name">{{ token.symbol }}</div>
                <div class="token-subheading">{{ token.name }}</div>
              </div>
              <span></span>
              <div style="justify-self: flex-end; width: fit-content">45</div>
              <!-- {{parseInt(50 * Math.random())}} -->
              <!-- on searching random generated everytime hence hardcoded -->
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="footer">
          <div class="flex-container">
            <button
              color="#E8006F"
              class="hide-border-outline list-token-manage-button"
            >
              <div class="text-icon-container">
                <div stroke="#D50066" class="icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                </div>
                <div class="manage-list-text">Manage Token Lists</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
  name: 'TokenSelectorModal',
  props: {},
  data() {
    return {
      inputValue: '',
      cumulativeTokenList: [],
    };
  },
  computed: {
    ...mapState(['modalLevel', 'selectTokenList', 'swap']),
    filteredTokenList() {
      // debounce for large list?
      return this.cumulativeTokenList.filter(
        (token) => token.name.toLowerCase().includes(this.inputValue.toLowerCase()),
      );
    },
    tokenList() {
      // eslint-disable-next-line dot-notation
      Object.values(this.selectTokenList).map((tokenList) => this.cumulativeTokenList.push(...tokenList['tokens']));
      return this.cumulativeTokenList;
    },
  },
  methods: {
    setInputOrOutputToken(token) {
      this.setSwapTokenKey({
        key: this.modalLevel?.origin,
        value: {
          ...token,
          balanceAmount: parseInt((50 * Math.random()).toString(10), 10),
        },
      });
      this.setModalLevel({ level: '', origin: '' });
    },
    isEitherInputOutput(address) {
      return (
        this.swap.input.address === address
        || this.swap.output.address === address
      );
    },
    shouldModalClose(event) {
      if (event.target.id === 'outer-modal-div') {
        this.setModalLevel({ level: '', origin: '' });
      }
    },
    ...mapActions(['setModalLevel', 'setSwapTokenKey']),
  },
});
</script>

<style scoped>
.common-bases-token:hover {
  cursor: pointer;
  background-color: rgb(237, 238, 242);
}

.common-bases-token {
  border: 1px solid rgb(206, 208, 217);
  border-radius: 10px;
  display: flex;
  padding: 6px;
  -webkit-box-align: center;
  align-items: center;
}

.common-bases-token-disabled {
  border: 1px solid transparent;
  border-radius: 10px;
  display: flex;
  padding: 6px;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(110, 114, 125);
  background-color: rgb(206, 208, 217);
  filter: grayscale(1);
}

.common-bases-tokens-container > * {
  margin: 4px !important;
}

.common-bases-tokens-container {
  flex-wrap: wrap;
  margin: -4px;
  display: flex;
}
.common-bases-heading {
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.icon-decorator {
  margin-left: 6px;
  font-family: sans-serif;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px;
  width: 18px;
  height: 18px;
  border: none;
  background: none rgb(237, 238, 242);
  outline: none;
  cursor: default;
  border-radius: 36px;
  font-size: 12px;
  color: rgb(86, 90, 105);
}

.common-bases-text {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 14px;
  font-family: sans-serif;
}

.common-bases-container {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
}

.searchbox-input:focus {
  border: 1px solid rgb(232, 0, 111);
  outline: none;
}

.searchbox-input {
  position: relative;
  display: flex;
  padding: 16px;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  outline: none;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(206, 208, 217);
  appearance: none;
  font-size: 18px;
  transition: border 100ms ease 0s;
}
.searchbox-container {
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.close-icon {
  cursor: pointer;
}
.heading-text {
  font-family: sans-serif;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 16px;
}

.heading {
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
}
.header-container {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 16px;
  padding: 20px;
}

.outer-modal-div {
  z-index: 2;
  overflow: hidden;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);

  background: rgba(0, 0, 0, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal-card {
  width: 65vw;
  margin: 0px;

  max-width: 420px;
  max-height: 80vh;
  min-height: 80vh;

  border-radius: 20px;

  background: #fff;
  /* padding: 2rem; */
  outline: none;
}

.modal {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;

  width: 100%;
  flex: 1 1 0%;
  position: relative;

  font-family: sans-serif;
}

.footer {
  /* width: 100%; */
  border-radius: 0px 0px 20px 20px;
  padding: 20px;
  background-color: rgb(247, 248, 250);
  border-top: 1px solid rgb(237, 238, 242);
}

.flex-container {
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}

.hide-border-outline {
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0px;
  margin: 0px;
  background: none;
  cursor: pointer;
}

.text-icon-container {
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.icon-container {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  margin-left: 0px;
}

.icon-container > * {
  stroke: rgb(213, 0, 102);
}

.manage-list-text {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  color: rgb(213, 0, 102);
}

.token-list-container {
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
  gap: 16px;
  cursor: pointer;
  opacity: 1;
  align-items: center;
}

.token-list-container:hover {
  background-color: rgb(237, 238, 242);
}

.token-logo {
  width: 24px;
  height: 24px;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
  border-radius: 24px;
}

.token-subheading {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-size: 12px;
  color: rgb(110, 114, 125);
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background-color: rgb(237, 238, 242);
}
</style>
