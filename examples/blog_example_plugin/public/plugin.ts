import { i18n } from '@osd/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  BlogExamplePluginPluginSetup,
  BlogExamplePluginPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';
import { DataSourceManagementPluginSetup } from '../../../src/plugins/data_source_management/public';

export interface PluginSetupDependencies {
  dataSourceManagement: DataSourceManagementPluginSetup;
}

export class BlogExamplePluginPlugin
  implements Plugin<BlogExamplePluginPluginSetup, BlogExamplePluginPluginStart> {
  public setup(
    core: CoreSetup,
    { dataSourceManagement }: PluginSetupDependencies
  ): BlogExamplePluginPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'blogExamplePlugin',
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(
          coreStart,
          depsStart as AppPluginStartDependencies,
          params,
          dataSourceManagement
        );
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('blogExamplePlugin.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): BlogExamplePluginPluginStart {
    return {};
  }

  public stop() {}
}
