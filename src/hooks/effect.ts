import { useEffect } from "react";

export default class EffectHooks {
  static useEffectOn(callback: () => any, trigger = false) {
    return useEffect(() => {
      if (trigger) callback();
    }, [trigger, callback]);
  }
}
