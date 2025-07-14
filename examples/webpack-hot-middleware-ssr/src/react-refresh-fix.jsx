function interceptInject(hook) {
  const originalInject = hook.inject.bind(hook);

  const inject = (renderer) => {
    // Prevent React from marking hot reloading as disabled when recovering from an error.
    // See: https://github.com/facebook/react/blob/v19.1.0/packages/react-reconciler/src/ReactFiberHotReloading.js#L89
    renderer.setRefreshHandler?.(() => undefined);

    return originalInject(renderer);
  };

  hook.inject = inject;
}

/**
 * If an error catchable by ErrorBoundary occurs before the first refresh triggered by react-refresh,
 * the app remains mounted. Even after the error is fixed, ErrorBoundary does not update, leaving the app stuck in an error state.
 * However, if any change triggers a refresh and the error happens again, the app recovers because it is fully remounted.
 *
 * The first React injection must be intercepted in the `__REACT_DEVTOOLS_GLOBAL_HOOK__` instance to initialize react-refresh.
 */
function attachReactRefreshInterceptor() {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // When the react-devtools chrome extension is installed, the hook is already defined.
  // See: https://react.dev/learn/react-developer-tools
  if (hook) {
    interceptInject(hook);

    return;
  }

  // The initial hook value should be undefined, because react-refresh defined it.
  // See: https://github.com/facebook/react/blob/v19.1.0/packages/react-refresh/src/ReactFreshRuntime.js#L427
  let hookValue;

  Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    configurable: true,
    get: () => hookValue,
    set: (value) => {
      interceptInject(value);
      hookValue = value;
    },
  });
}

attachReactRefreshInterceptor();
