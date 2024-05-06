import { PluginInitializerContext } from '../../../src/core/server';
import { BlogExamplePluginPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new BlogExamplePluginPlugin(initializerContext);
}

export { BlogExamplePluginPluginSetup, BlogExamplePluginPluginStart } from './types';
