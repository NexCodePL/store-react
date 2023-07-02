import { Store } from "@nexcodepl/store";
import { useRefStatic } from "./useRefStatic.js";

export function useStore<T>(...args: ConstructorParameters<typeof Store<T>>) {
    const storeRef = useRefStatic<Store<T>>(() => new Store<T>(...args));

    return storeRef.current;
}
