import './index.scss';

import { BlogExamplePluginPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new BlogExamplePluginPlugin();
}
export { BlogExamplePluginPluginSetup, BlogExamplePluginPluginStart } from './types';
