import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { BlogExamplePluginApp } from './components/app';
import { DataSourceManagementPluginSetup } from '../../../src/plugins/data_source_management/public'; // Add this line

export const renderApp = (
  { notifications, http, savedObjects }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters,
  dataSourceManagement: DataSourceManagementPluginSetup
) => {
  ReactDOM.render(
    <BlogExamplePluginApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      dataSourceManagement={dataSourceManagement}
      savedObjects={savedObjects}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
