import { useEffect, useRef } from "react";
import { StoreComputed } from "@nexcodepl/store";

export function useStoreComputed<T>(...args: ConstructorParameters<typeof StoreComputed<T>>) {
    const storeComputedRef = useRef<StoreComputed<T>>(null as unknown as StoreComputed<T>);

    if (storeComputedRef.current === null) {
        storeComputedRef.current = new StoreComputed<T>(...args);
    }

    useEffect(() => {
        storeComputedRef.current.dependenciesSubscribe();

        return () => {
            storeComputedRef.current.dependenciesUnsubscribe();
        };
    }, []);

    return storeComputedRef.current;
}
