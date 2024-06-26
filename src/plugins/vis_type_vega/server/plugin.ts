/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginInitializerContext, CoreSetup, CoreStart, Plugin } from '../../../core/server';
import { registerVegaUsageCollector } from './usage_collector';
import {
  ConfigObservable,
  VisTypeVegaPluginSetupDependencies,
  VisTypeVegaPluginSetup,
  VisTypeVegaPluginStart,
} from './types';
import {
  VEGA_VISUALIZATION_CLIENT_WRAPPER_ID,
  vegaVisualizationClientWrapper,
} from './vega_visualization_client_wrapper';
import { setDataSourceEnabled } from './services';

export class VisTypeVegaPlugin implements Plugin<VisTypeVegaPluginSetup, VisTypeVegaPluginStart> {
  private readonly config: ConfigObservable;

  constructor(initializerContext: PluginInitializerContext) {
    this.config = initializerContext.config.legacy.globalConfig$;
  }

  public setup(
    core: CoreSetup,
    { home, usageCollection, dataSource }: VisTypeVegaPluginSetupDependencies
  ) {
    if (usageCollection) {
      registerVegaUsageCollector(usageCollection, this.config, { home });
    }
    setDataSourceEnabled({ enabled: dataSource?.dataSourceEnabled() || false });
    core.savedObjects.addClientWrapper(
      10,
      VEGA_VISUALIZATION_CLIENT_WRAPPER_ID,
      vegaVisualizationClientWrapper
    );
    return {};
  }

  public start(core: CoreStart) {
    return {};
  }
  public stop() {}
}
