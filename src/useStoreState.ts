import { useEffect, useState } from "react";
import { StoreReadonly } from "@nexcodepl/store";

export function useStoreState<T>(store: StoreReadonly<T>): T {
    const [state, setState] = useState<T>(store.current);

    useEffect(() => {
        const storeUnsubscribe = store.subscribe(value => setState(value));

        return () => storeUnsubscribe();
    }, []);

    return state;
}
