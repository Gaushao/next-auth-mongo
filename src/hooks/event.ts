import { useCallback, useEffect } from "react";

export default class EventHooks {
  static useDispatchEvent(type: string) {
    return useCallback(() => {
      if (document?.dispatchEvent) document.dispatchEvent(new Event(type));
    }, [type]);
  }
  static useVisibilityChange() {
    return EventHooks.useDispatchEvent("visibilitychange");
  }
  static useVisibilityChangeOn(...changes: any[]) {
    return useEffect(EventHooks.useVisibilityChange(), changes);
  }
}
