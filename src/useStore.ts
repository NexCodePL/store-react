import { Store } from "@nexcodepl/store";
import { useRef } from "react";

export function useStore<T>(...args: ConstructorParameters<typeof Store<T>>) {
    const storeRef = useRef<Store<T>>(new Store<T>(...args));

    return storeRef.current;
}
