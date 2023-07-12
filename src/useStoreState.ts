import { useEffect, useState } from "react";
import { StoreReadonly } from "@nexcodepl/store";

export function useStoreState<T>(store: StoreReadonly<T>): T {
    const [state, setState] = useState<T>(() => store.current() as T);

    useEffect(() => {
        const storeUnsubscribe = store.subscribe(value => setState(value as T));

        return () => storeUnsubscribe();
    }, []);

    return state;
}
