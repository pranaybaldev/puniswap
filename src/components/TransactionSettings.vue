<template>
  <!-- @click="shouldModalClose"
    ref="parentModalRef" -->
  <span class="modal">
    <div class="container" style="padding: 1rem">
      <div class="header-text">Transaction Settings</div>
      <div class="container">
        <div class="container">
          <div class="setting-field">
            <div class="field">Slippage tolerance</div>
            <span style="margin-left: 6px; font-size: 14px"> ? </span>
          </div>
          <div class="button-input-container">
            <button class="auto-button input-button">Auto</button>
            <button tabindex="-1" class="input-button input-field-container">
              <div class="input-field-text">
                <input
                  placeholder="0.10"
                  color=""
                  class="input-field"
                  value=""
                />%
              </div>
            </button>
          </div>
        </div>
        <div class="container">
          <div class="setting-field">
            <div class="field">Transaction deadline</div>
            <span style="margin-left: 6px; font-size: 14px"> ? </span>
          </div>
          <div class="button-input-container setting-field">
            <button
              tabindex="-1"
              class="input-button input-field-container"
              style="width: 80px"
            >
              <input placeholder="30" color="" class="input-field" value="" />
            </button>
            <span
              style="padding-left: 8px; color: rgb(0, 0, 0); font-size: 14px"
            >
              minutes
            </span>
          </div>
        </div>
      </div>
      <div class="header-text">Interface Settings</div>
      <div class="input-field-text">
        <div class="setting-field">
          <div class="field">Toggle Expert Mode</div>
          <span style="margin-left: 6px; font-size: 14px"> ? </span>
        </div>
        <button id="toggle-expert-mode-button" class="toggle-container"
        @click="isExpertMode = !isExpertMode">
          <span class="toggle-value" :class="{ 'on-toggle': isExpertMode}">On</span
          ><span class="toggle-value" :class="{ 'off-toggle': !isExpertMode}">Off</span>
        </button>
      </div>
      <div class="input-field-text">
        <div class="setting-field">
          <div class="field">Disable Multihops</div>
          <span style="margin-left: 6px; font-size: 14px"> ? </span>
        </div>
        <button id="toggle-expert-mode-button" class="toggle-container"
        @click="isMultihopDisabled = !isMultihopDisabled">
          <span class="toggle-value" :class="{ 'on-toggle': isMultihopDisabled}">On</span
          ><span class="toggle-value" :class="{ 'off-toggle': !isMultihopDisabled}">Off</span>
        </button>
      </div>
    </div>
  </span>
  <div class="modal-outer" @click="this.$emit('outsideModalClick')"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionSettings',
  props: {
  },
  computed: {},
  data() {
    return {
      //   shouldModalClose(e) {
      //     console.log(e);
      //     console.log(this.$refs.parentModalRef.contains(e.target));
      //   },
      isExpertMode: false,
      isMultihopDisabled: false,
    };
  },
});
</script>

<style scoped>
.modal-outer {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}
.modal {
  min-width: 20.125rem;
  background-color: rgb(237, 238, 242);
  border: 1px solid rgb(206, 208, 217);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 2rem;
  right: 0rem;
  z-index: 100;
  user-select: none;
}

.container {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
}

.header-text {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 600;
  font-size: 14px;
  margin-right: auto;
}

.setting-field {
  width: fit-content;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: baseline;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.field {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  color: rgb(86, 90, 105);
  font-size: 14px;
}

.button-input-container {
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.auto-button {
  margin-right: 8px;
  background-color: rgb(232, 0, 111) !important;
  color: rgb(255, 255, 255);
}

.input-button {
  -webkit-box-align: center;
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 1rem;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid rgb(206, 208, 217);
  outline: none;
  background: rgb(247, 248, 250);
}

.input-field-container {
  height: 2rem;
  position: relative;
  padding: 0px 0.75rem;
  flex: 1 1 0%;
}

.input-field {
  width: 100%;
  /* height: 100%; */
  border: 0px;
  border-radius: 2rem;

  background: rgb(247, 248, 250);
  font-size: 16px;
  /* width: auto; */
  outline: none;
  color: rgb(0, 0, 0);
  text-align: right;
}

.input-field-text {
  -webkit-box-pack: justify;
  justify-content: space-between;

  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
}

.toggle-container {
  border-radius: 12px;
  border: none;
  background: rgb(255, 255, 255);
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 2px;
}

.toggle-value {
  padding: 0.25rem 0.6rem;
  border-radius: 9px;
  background: none;
  color: rgb(86, 90, 105);
  font-size: 14px;
}

.off-toggle {
    background: rgb(136, 141, 155);
    color: rgb(255, 255, 255);
}

.on-toggle {
    background: rgb(232, 0, 111);
    color: rgb(255, 255, 255);
}
</style>
