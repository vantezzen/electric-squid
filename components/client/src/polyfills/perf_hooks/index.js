const perfHooksModule = {
  now: window.performance.now.bind(performance),
};

export default perfHooksModule;
