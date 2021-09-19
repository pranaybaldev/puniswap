<template>
<!-- eslint-disable max-len -->
    <div class="container">
        <div class="input-with-token-selector">
            <slot></slot>
            <input v-model="inputValue" class="token-amount-input" inputmode="decimal" @keypress="onlyNumber"
            autocomplete="off" @paste="onPaste" @input="onInput"
            autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0"
            minlength="1" maxlength="79" spellcheck="false">
        </div>
        <div class="bottom-info-text-container">
                <div class="balance-amount"> Balance: {{balanceAmount}} {{tokenSymbol}} </div>
                <div v-if="inputValue" class="dollar-amount"> ~$ {{inputValue * multiplier}} </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'TokenInput',
  components: {
  },
  props: {
    balanceAmount: Number,
    multiplier: Number,
    tokenSymbol: String,
    type: String,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    setValue(value) {
      this.inputValue = value;
      if (value === 0 || value === '') {
        this.inputValue = '';
      }
    },
    onInput(event) {
      this.$emit('inputValueChange', { event, type: this.type });
      this.setSwapTokenKey({ key: 'typedValue', value: this.inputValue });
      this.setSwapTokenKey({ key: 'independentField', value: this.type });
    },
    onlyNumber(event) {
      if (event.key === '.' && this.inputValue.includes('.')) {
        return event.preventDefault();
      }
      if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
        return event.preventDefault();
      }
      return true;
    },
    onPaste(event) {
      if (!/^[0-9]*[.,]?[0-9]*$/.test(event.clipboardData.getData('text'))) {
        return event.preventDefault();
      }
      return true;
    },
    ...mapActions(['setSwapTokenKey']),
  },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 20px;
    /* background-color: rgb(237, 238, 242); */
    z-index: 1;
    width: initial;

    border: 1px solid rgb(237, 238, 242);
    background-color: rgb(247, 248, 250);
}

.container:focus, .container:hover {
    border: 1px solid rgb(206, 208, 217);
}

.input-with-token-selector {
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    padding: 1rem 1rem 0.75rem;
}

.token-amount-input {
    color: rgb(0, 0, 0);
    width: 0px;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: rgb(247, 248, 250);
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
    text-align: right;
}

.bottom-info-text-container {
    display: flex;
    /* padding: 0px; */
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0px 1rem 1rem;
    color: rgb(86, 90, 105);
    font-size: 14px;
}

.balance-amount{
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.dollar-amount{

}
</style>
