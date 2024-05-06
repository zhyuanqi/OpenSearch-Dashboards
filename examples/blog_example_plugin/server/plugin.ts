import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { BlogExamplePluginPluginSetup, BlogExamplePluginPluginStart } from './types';
import { defineRoutes } from './routes';
import { DataSourcePluginSetup } from '../../../src/plugins/data_source/server';

export interface PluginDependencies {
  dataSource: DataSourcePluginSetup;
}

export class BlogExamplePluginPlugin
  implements Plugin<BlogExamplePluginPluginSetup, BlogExamplePluginPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup, { dataSource }: PluginDependencies) {
    this.logger.debug('blog_example_plugin: Setup');
    const router = core.http.createRouter();

    const dataSourceEnabled = !!dataSource;
    if (dataSourceEnabled) {
      dataSource.registerCustomApiSchema(BlogExamplePluginPlugin);
    }
    // Register server side APIs
    defineRoutes(router, dataSourceEnabled);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('blog_example_plugin: Started');
    return {};
  }

  public stop() {}
}
