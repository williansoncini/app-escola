import * as types from '../types';

const initalState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function (state = initalState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_REQUEST: {
      console.log('ESTOU FAZENDO A REQUISIÃO');
      return state;
    }
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      console.log('Sucesso!');
      return newState;
    }
    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Deu erro');
      return state;
    }
    default:
      return state;
  }
}
