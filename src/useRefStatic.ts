import { useRef, MutableRefObject } from "react";

export function useRefStatic<T>(staticValue: () => T): MutableRefObject<T> {
    const ref = useRef<T>(null as T);
    if (ref.current === null) {
        ref.current = staticValue();
    }
    return ref;
}
