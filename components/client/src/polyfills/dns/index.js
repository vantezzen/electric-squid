const dnsModule = {
  resolveSrv: (_, callback) => {
    // Always callback with an error
    callback(true);
  },
};

export default dnsModule;
