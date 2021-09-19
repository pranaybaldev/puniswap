<template>
    <button class="open-currency-select-button"
    @click="setModalLevel({level: 'selectToken', origin: origin})">
        <span class="icons-and-text-container">
            <div class="symbol-text-icon">
                <img class="token-image" :src="logoSource" style="margin-right: 0.5rem;">
                    <span class="token-symbol">{{tokenName}}</span>
            </div>
            <svg class="down-arrow-svg" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE">
                </path>
            </svg>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'TokenSelector',
  props: {
    logoSource: String,
    tokenName: String,
    origin: String,
  },
  methods: {
    ...mapActions(['setModalLevel']),
  },
});
</script>

<style scoped>
.open-currency-select-button{
    visibility: visible;
    -webkit-box-align: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border-radius: 16px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    outline: none;
    cursor: pointer;
    user-select: none;
    border: none;
    height: 2.4rem;
    width: initial;
    padding: 0px 8px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-right: 12px;
}

.open-currency-select-button:focus, .open-currency-select-button:hover {
    background-color: rgb(237, 238, 242);
}

.icons-and-text-container {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
}

.token-image {
    margin-right: 0.5rem;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    background-color: rgb(255, 255, 255);
}

.token-symbol {
    margin: 0px 0.25rem;
    font-size: 18px;
}

.symbol-text-icon {
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.down-arrow-svg {
    margin: 0px 0.25rem 0px 0.35rem;
    height: 35%;
}

path{
    stroke: rgb(0, 0, 0);
    stroke-width: 1.5px;
}
</style>
