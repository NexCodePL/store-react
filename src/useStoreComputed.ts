import { useEffect } from "react";
import { StoreComputed } from "@nexcodepl/store";
import { useRefStatic } from "./useRefStatic.js";

export function useStoreComputed<T>(...args: ConstructorParameters<typeof StoreComputed<T>>) {
    const storeComputedRef = useRefStatic<StoreComputed<T>>(() => new StoreComputed<T>(...args));

    useEffect(() => {
        storeComputedRef.current.dependenciesSubscribe();

        return () => {
            storeComputedRef.current.dependenciesUnsubscribe();
        };
    }, []);

    return storeComputedRef.current;
}
