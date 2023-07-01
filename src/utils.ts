import { DependencyList } from "react";
import { StoreEffectDependencies, isStoreReadonly } from "@nexcodepl/store";
import { StoreEffectDependenciesList } from "./types.js";

export function getDependencies(dependenciesList: StoreEffectDependenciesList): {
    storeDependencies: StoreEffectDependencies;
    nonStoreDependencies: DependencyList;
} {
    const storeDependencies: StoreEffectDependencies = [];
    const nonStoreDependencies: unknown[] = [];

    for (const dep of dependenciesList) {
        if (isStoreReadonly(dep)) {
            storeDependencies.push(dep);
        } else {
            nonStoreDependencies.push(dep);
        }
    }

    return {
        storeDependencies,
        nonStoreDependencies,
    };
}
