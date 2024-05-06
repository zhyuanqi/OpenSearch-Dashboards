import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface BlogExamplePluginPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlogExamplePluginPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
