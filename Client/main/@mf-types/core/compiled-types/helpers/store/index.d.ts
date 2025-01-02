import { ReactNode } from "react";
import { TypedUseSelectorHook } from "react-redux";
interface CounterState {
    count: number;
}
export declare const counterSlice: import("@reduxjs/toolkit").Slice<CounterState, {
    increment: (state: import("immer").WritableDraft<CounterState>) => void;
    clear: (state: import("immer").WritableDraft<CounterState>) => void;
}, "counter", "counter", import("@reduxjs/toolkit").SliceSelectors<CounterState>>;
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    counter: CounterState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        counter: CounterState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
type RootState = ReturnType<typeof store.getState>;
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    counter: CounterState;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export declare function useStore(): {
    count: number;
    increment: () => {
        payload: undefined;
        type: "counter/increment";
    };
    clear: () => {
        payload: undefined;
        type: "counter/clear";
    };
};
interface StoreProviderProps {
    children: ReactNode;
}
export declare function StoreProvider({ children }: StoreProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
