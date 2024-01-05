import { useEffect, DependencyList } from "react";
import { StoreComputed, StoreComputedValueGenerator, StoreConfig, StoreEffectDependencies } from "@nexcodepl/store";
import { useRefStatic } from "./useRefStatic.js";

export function useStoreComputedWithDeps<T>(
    computedValueGenerator: StoreComputedValueGenerator<T>,
    dependenciesStore: StoreEffectDependencies,
    storeConfig?: StoreConfig<T>,
    dependencies?: DependencyList
) {
    const storeComputedRef = useRefStatic<StoreComputed<T>>(
        () => new StoreComputed<T>(computedValueGenerator, dependenciesStore, storeConfig)
    );

    useEffect(() => {
        storeComputedRef.current.dependenciesSubscribe();

        return () => {
            storeComputedRef.current.dependenciesUnsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!dependencies) return;
        storeComputedRef.current.compute();
    }, dependencies ?? []);

    return storeComputedRef.current;
}
