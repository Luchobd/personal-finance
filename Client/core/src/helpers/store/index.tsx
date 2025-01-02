import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Definir el estado inicial
interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

// Crear el slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    clear: (state) => {
      state.count = 0;
    },
  },
});

// Extraer las acciones
const { increment, clear } = counterSlice.actions;

// Configurar la store con el reducer tipado
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Definir tipos derivados de la store
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Crear hooks tipados para `useSelector` y `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook personalizado
export function useStore() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();
  return {
    count,
    increment: () => dispatch(increment()),
    clear: () => dispatch(clear()),
  };
}

// Componente `StoreProvider` con prop tipada
interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
