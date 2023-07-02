import { useRef, useEffect } from "react";
import { StoreEffect, StoreEffectDestructor, StoreEffectFunction } from "@nexcodepl/store";
import { StoreEffectDependenciesList } from "./types.js";
import { getDependencies } from "./utils.js";
import { useRefStatic } from "./useRefStatic.js";

export function useStoreEffect(effect: StoreEffectFunction, dependencies: StoreEffectDependenciesList) {
    const { storeDependencies, nonStoreDependencies } = getDependencies(dependencies);

    const effectDestructorRef = useRef<StoreEffectDestructor | undefined>(undefined);
    const effectRef = useRefStatic<StoreEffect>(() => new StoreEffect(() => callEffect(), storeDependencies));

    useEffect(callEffect, nonStoreDependencies);

    useEffect(() => {
        effectRef.current.dependenciesSubscribe();

        return () => {
            effectRef.current.dependenciesUnsubscribe();
        };
    }, []);

    function callEffect() {
        effectDestructorRef.current = effect() ?? undefined;

        return () => {
            if (!effectDestructorRef.current) return;
            effectDestructorRef.current();
        };
    }
}
