import { useRef } from "react";

export function useRefStatic<T>(staticValue: () => T) {
    const ref = useRef<T>(null as T);
    if (ref.current === null) {
        ref.current = staticValue();
    }
    return ref;
}
