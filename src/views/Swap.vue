<template>
<!-- eslint-disable max-len -->
  <div class="card-container">
      <div class="card-header">
          <div class="card-header-text"> Swap </div>
          <button class="transaction-settings" @click="isTransactionSettingsVisible = !isTransactionSettingsVisible">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1ndknrv-0 fZuPAR"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
            <TransactionSettings @outsideModalClick="isTransactionSettingsVisible = !isTransactionSettingsVisible" v-if="isTransactionSettingsVisible" @close="isTransactionSettingsVisible = false"/>
      </div>
        <div class="card-content-container">
            <div class="grid-spacer">
                <div>
            <TokenInput id="input" ref="input" :balanceAmount="swap.input.balanceAmount" :multiplier="29" :tokenSymbol="swap.input.symbol" :type="'input'" @inputValueChange="getValueFromChildTokenInput">
                <TokenSelector :tokenName="swap.input.name" :logoSource="swap.input.logoURI" :origin="'input'"/>
            </TokenInput>
            <div class="switch-input-output" @click="swapInputOutput">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6E727D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
            </div>
            <TokenInput id="output" ref="output" :balanceAmount="swap.output.balanceAmount" :multiplier="32" :tokenSymbol="swap.output.symbol" :type="'output'" @inputValueChange="getValueFromChildTokenInput">
                <TokenSelector :tokenName="swap.output.name" :logoSource="swap.output.logoURI" :origin="'output'"/>
            </TokenInput>
                </div>
            <button disabled="" class="transact" :class="{primaryCTAAllowed: isPrimaryCTAAllowed}">
                <div class="transact-text">
                    {{getPrimaryCTAText}}
                </div>
            </button>
            </div>
        </div>
        <teleport to="body">
            <TokenSelectorModal/>
        </teleport>
  </div>

</template>

<script lang="ts">
/*eslint-disable*/
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import TokenInput from '@/components/TokenInput.vue'; // @ is an alias to /src
import TransactionSettings from '@/components/TransactionSettings.vue';
import TokenSelectorModal from '@/components/TokenSelectorModal.vue';
import TokenSelector from '@/components/TokenSelector.vue';

export default defineComponent({
  name: 'swap',
  components: {
    TokenInput,
    TransactionSettings,
    TokenSelectorModal,
    TokenSelector,
  },
  data() {
    return {
      isTransactionSettingsVisible: false,
      inputTokenAmount: '',
      outputTokenAmout: '',
      primaryCTAAllowed: false,
    };
  },
  computed: {
      isPrimaryCTAAllowed(){
          if(this.inputTokenAmount && this.inputTokenAmount > 0 && this.inputTokenAmount <= this.swap.input.balanceAmount){
              this.primaryCTAAllowed = true;
              return true
          }
          this.primaryCTAAllowed = false;
          return false;
      },
      getPrimaryCTAText(){
          if(this.inputTokenAmount && this.inputTokenAmount > 0 && this.inputTokenAmount <= this.swap.input.balanceAmount){
              return "Swap" 
          }
          if(this.inputTokenAmount && this.inputTokenAmount > this.swap.input.balanceAmount){
              return `Insufficient ${this.swap.input.symbol} balance`
          }
          return "Enter an amount"
      },
    ...mapState(['swap']),
  },
  mounted() {
    this.setActiveRoute('swap');
  },
  methods: {
      swapInputOutput(){
          let prevInputState = this.swap.input
          this.setSwapTokenKey({ key: 'input', value: this.swap.output });
        this.setSwapTokenKey({ key: 'output', value: prevInputState });
        const randomValue = this.swap.typedValue * Math.random()
        if(this.swap.independentField === 'input'){
            this.$refs.output.setValue(this.swap.typedValue);
            this.outputTokenAmount = this.swap.typedValue
            this.$refs.input.setValue(randomValue);
            this.inputTokenAmount = randomValue; 
        }
        if(this.swap.independentField === 'output'){
            this.$refs.input.setValue(this.swap.typedValue);
            this.inputTokenAmount = this.swap.typedValue
            this.$refs.output.setValue(randomValue);
            this.outputTokenAmount = randomValue; 
        }
        this.setSwapTokenKey({ key: 'independentField', value: this.swap.independentField === 'input' ? 'output' : 'input'});
      },
      getValueFromChildTokenInput(event){
          const { value } = event.event.target
          const { type } = event
          const randomValue = value * Math.random()
          if(type==='input'){
              this.inputTokenAmount = value;
              this.outputTokenAmount = randomValue
               this.$refs.output.setValue(randomValue);
          } else if(type === 'output') {
              this.outputTokenAmount = value;
              this.inputTokenAmount = randomValue
              this.$refs.input.setValue(randomValue);
          }
      },
    ...mapActions(['setActiveRoute', 'setSwapTokenKey']),
  },
});
</script>

<style scoped>
.card-container {
    position: relative;
    max-width: 480px;
    width: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 24px;
    margin-top: 1rem;
}

.card-header {
    padding: 1rem 1.25rem 0.5rem;
    width: 100%;
    color: rgb(86, 90, 105);

    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}

.card-header-text {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 18px;
    color: rgb(0, 0, 0);
}

.transact-text {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 20px;
    font-weight: 600;
}

.transact {
    background-color: rgb(237, 238, 242);
    color: rgb(86, 90, 105);
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;

    padding: 16px;
    width: 100%;
    font-weight: 600;
    text-align: center;
    border-radius: 20px;
    outline: none;
    /* color: white; */
    text-decoration: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    transform: perspective(1px) translateZ(0px);

    cursor: default;
}

.card-content-container {
    padding: 8px;
}

.transaction-settings {
    border: none;
    background: transparent;
    color: rgb(86, 90, 105);
}

.transaction-settings:hover, .transaction-settings:active {
    opacity: 0.7;
    cursor: pointer;
    outline: none;
}

.switch-input-output {
    padding: 4px;
    border-radius: 12px;
    height: 18px;
    width: 18px;
    position: relative;
    margin-top: -14px;
    margin-bottom: -14px;
    left: calc(50% - 9px);
    background-color: rgb(247, 248, 250);
    border: 4px solid rgb(255, 255, 255);
    z-index: 2;
}

.switch-input-output:hover {
    cursor: pointer
}

.grid-spacer{
    display: grid;
    grid-auto-rows: auto;
    row-gap: 12px;
}

.primaryCTAAllowed {
    background-color: rgb(232, 0, 111) !important;
    color: rgb(255, 255, 255) !important;
    cursor: pointer;
}
</style>
