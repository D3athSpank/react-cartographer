import Alt from 'alt';
import ReactDOM from 'react-dom';

const alt = new Alt({
  // React.addons.batchedUpdates is deprecated:
  // batchingFunction: React.addons.batchedUpdates

  // use this instead in newer versions of React
  // see https://discuss.reactjs.org/t/any-plan-for-reactdom-unstable-batchedupdates/1978
  batchingFunction: ReactDOM.unstable_batchedUpdates,
});
// for alt chrome debugger
Alt.debug('alt', alt);

export default alt;

