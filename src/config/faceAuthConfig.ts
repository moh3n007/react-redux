/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthConfig = {
  login(callback: VoidFunction) {
    setTimeout(callback, 1000); // fake async
  },
  logout(callback: VoidFunction) {
    setTimeout(callback, 1000);
  },
};

export { fakeAuthConfig };
