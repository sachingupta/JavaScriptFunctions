/**Debouncing is a technique used to control how many times we allow a function to be executed over time.
 * Implement a debounce function which accepts a callback function and a wait duration. 
 * Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described above. 
 * Examples:
 * 1. Window resize
 * 2. keypress on autocomplete form
 * 3. search bar - wait untill user stop typing*/

export function debounce(func: Function, wait: number = 0): Function {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return function(this: any, ...args: any[]){
        const context = this;
        clearTimeout(timeoutId ?? undefined);

        timeoutId = setTimeout( function () {
            timeoutId = null;
            func.apply(context, args);
        }, wait);
    };
}


interface Debounced2Function extends Function {
    cancel: () => void;
    flush: () => void;
  }
  
export function debounce2(
    func: Function,
    wait: number,
): Debounced2Function {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let context: any = undefined;
    let argsToInvoke: Array<any> | undefined = undefined;
  
    function clearTimer() {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  
    function invoke() {
      // Don't invoke if there's no pending callback.
      if (timeoutId == null) {
        return;
      }
  
      clearTimer();
      func.apply(context, argsToInvoke);
    }
  
    function fn(this: any, ...args: Array<any>) {
      clearTimer();
      argsToInvoke = args;
      context = this;
      timeoutId = setTimeout(function () {
        invoke();
      }, wait);
    }
  
    fn.cancel = clearTimer;
    fn.flush = invoke;
    return fn;
  }
  
  