import React, { useState } from 'react';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';

import { EuiSpacer } from '@opensearch-project/oui';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { DataSourceManagementPluginSetup } from '../../../../src/plugins/data_source_management/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface BlogExamplePluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  dataSourceManagement: DataSourceManagementPluginSetup;
  savedObjects: CoreStart['savedObjects'];
}

export const BlogExamplePluginApp = ({
  basename,
  notifications,
  http,
  navigation,
  dataSourceManagement,
  savedObjects,
}: BlogExamplePluginAppDeps) => {
  // Use React hooks to manage state.
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [indices, setIndices] = useState<string[]>([]);

  const DataSourceSelector = dataSourceManagement.ui.DataSourceSelector;
  const DataSourceSelectorComponent = (
    <DataSourceSelector
      savedObjectsClient={savedObjects.client}
      notifications={notifications.toasts}
      fullWidth={false}
      onSelectedDataSource={(ds) => setSelectedDataSources(ds)}
      disabled={false}
    />
  );

  const onClickHandler = async () => {
    if (selectedDataSources.length === 0) {
      const resp = await http.get(`/api/blog_example_plugin/example`, {
        query: {
          dataSourceId: '',
        },
      });
      setIndices(resp);
    } else {
      const dataSourceID = selectedDataSources[0].id;
      // Use the core http service to make a response to the server API.
      const resp = await http.get(`/api/blog_example_plugin/example`, {
        query: {
          dataSourceId: dataSourceID,
        },
      });
      setIndices(resp);
    }
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody component="main">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="blogExamplePlugin.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="blogExamplePlugin.congratulationsTitle"
                        defaultMessage="Congratulations, you have successfully created a new OpenSearch Dashboards Plugin!"
                      />
                    </h2>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiText>
                    <p>
                      <FormattedMessage
                        id="blogExamplePlugin.content"
                        defaultMessage="Now it is time to choose your favorite data source."
                      />
                    </p>
                    <EuiHorizontalRule />
                    {DataSourceSelectorComponent}
                    <EuiHorizontalRule />
                    <EuiTextColor>
                      Selected: {selectedDataSources.map((ds) => ds.label).join(', ')}
                    </EuiTextColor>
                    <EuiHorizontalRule />
                    <EuiButton type="primary" size="s" onClick={onClickHandler}>
                      <FormattedMessage id="mayTest.buttonText" defaultMessage="Get Indices" />
                    </EuiButton>
                    <p>
                      <FormattedMessage
                        id="blogTest.indicesText"
                        defaultMessage="Get indices: {data}"
                        values={{ data: indices ? indices : 'Unknown' }}
                      />
                    </p>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
