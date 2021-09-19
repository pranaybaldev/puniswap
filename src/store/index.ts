import { createStore } from 'vuex';

export default createStore({
  state: {
    activeRoute: '',
    geminiTokenList: '',
    optimismTokenList: '',
    modalLevel: {},
    selectTokenList: {} as any, // {'geminiTokenList': {tokens: []}, 'xyztokenList': {}}
    swap: {
      input: {},
      output: {},
      independentField: 'input',
      typedValue: '',
    } as any,
  },
  mutations: {
    setSwapTokenKey(state, tokenDescription) {
      state.swap[tokenDescription.key] = tokenDescription.value;
    },
    setSelectTokenList(state, tokenListDescription) {
      if (tokenListDescription.type === 'add') {
        state.selectTokenList = {
          ...state.selectTokenList,
          [tokenListDescription.key]: { ...tokenListDescription.value },
        };
      }
      if (tokenListDescription.type === 'delete') {
        delete state.selectTokenList[tokenListDescription.key];
      }
    },
    setModalLevel(state, modalLevel) {
      state.modalLevel = modalLevel;
    },
    setActiveRoute(state, route) {
      state.activeRoute = route;
    },
    setGeminiTokenList(state, tokenList) {
      state.geminiTokenList = tokenList;
    },
    setOptimismTokenList(state, tokenList) {
      state.optimismTokenList = tokenList;
    },
  },
  actions: {
    setSwapTokenKey(context, tokenDescription) {
      context.commit('setSwapTokenKey', tokenDescription);
    },
    setSelectTokenList(context, tokenListDescription) {
      context.commit('setSelectTokenList', tokenListDescription);
    },
    setModalLevel(context, modalLevel) {
      context.commit('setModalLevel', modalLevel);
    },
    setActiveRoute(context, route) {
      context.commit('setActiveRoute', route);
    },
    setGeminiTokenList(context, tokenList) {
      context.commit('setGeminiTokenList', tokenList);
    },
    setOptimismTokenList(context, tokenList) {
      context.commit('setOptimismTokenList', tokenList);
    },
  },
  modules: {},
});
