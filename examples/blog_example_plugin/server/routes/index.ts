import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter, dataSourceEnabled: boolean) {
  router.get(
    {
      path: `/api/blog_example_plugin/example`,
      validate: {
        query: schema.object({
          dataSourceId: schema.maybe(schema.string({ defaultValue: '' })),
        }),
      },
    },
    async (context, request, response) => {
      let resp;
      if (dataSourceEnabled && request.query.dataSourceId) {
        const dataSourceId = request.query.dataSourceId;
        const client = await context.dataSource.opensearch.getClient(dataSourceId);
        resp = await client.cat.indices();
      } else {
        resp = await context.core.opensearch.client.asCurrentUser.transport.request({
          method: 'GET',
          path: `_cat/indices`,
        });
      }
      return response.ok({
        body: resp.body,
      });
      // const client = await context.dataSource.opensearch.getClient(dataSourceId)
      // const resp = await client.cat.indices();

      // const resp = await context.core.opensearch.client.asCurrentUser.transport.request({
      //   method: 'GET',
      //   path: `_cat/indices`,
      // });
      // return response.ok({
      //   body: resp.body,
      // });
    }
  );
}
