import { CoreTableCellRendererType, TableMode, TableSortDirection, TableStyle } from '@hypertrace/components';
import {
  DashboardDefaultConfiguration,
  MetricAggregationType,
  TracingTableCellType
} from '@hypertrace/distributed-tracing';
import { ObservabilityTableCellType } from '../../../shared/components/table/observability-table-cell-type';
import { ObservabilityEntityType } from '../../../shared/graphql/model/schema/entity';

export const endpointListDashboard: DashboardDefaultConfiguration = {
  location: 'ENDPOINT_LIST',
  json: {
    type: 'container-widget',
    layout: {
      type: 'auto-container-layout',
      'enable-style': false
    },
    children: [
      {
        type: 'table-widget',
        id: 'endpoint-list.table',
        mode: TableMode.Flat,
        style: TableStyle.FullPage,
        searchAttribute: 'name',
        selectFilterOptions: [
          {
            type: 'table-widget-select-filter',
            attribute: 'serviceName',
            'unset-option': 'All Services',
            data: {
              type: 'entities-attribute-data-source',
              entity: ObservabilityEntityType.Service,
              attribute: {
                type: 'attribute-specification',
                attribute: 'name'
              }
            }
          }
        ],
        columns: [
          {
            type: 'table-widget-column',
            title: 'Name',
            display: ObservabilityTableCellType.Entity,
            width: '20%',
            value: {
              type: 'entity-specification'
            }
          },
          {
            type: 'table-widget-column',
            title: 'Service',
            display: ObservabilityTableCellType.Entity,
            width: '20%',
            value: {
              type: 'entity-specification',
              'id-attribute': 'serviceId',
              'name-attribute': 'serviceName',
              'entity-type': ObservabilityEntityType.Service
            }
          },
          {
            type: 'table-widget-column',
            title: 'p99 Latency',
            display: TracingTableCellType.Metric,
            value: {
              type: 'metric-aggregation',
              metric: 'duration',
              aggregation: 'p99'
            },
            sort: TableSortDirection.Descending
          },
          {
            type: 'table-widget-column',
            title: 'Errors/s',
            display: CoreTableCellRendererType.Number,
            value: {
              type: 'metric-aggregation',
              metric: 'errorCount',
              aggregation: 'avgrate_sec'
            }
          },
          {
            type: 'table-widget-column',
            title: 'Calls/s',
            display: CoreTableCellRendererType.Number,
            value: {
              type: 'metric-aggregation',
              metric: 'numCalls',
              aggregation: 'avgrate_sec'
            }
          },
          {
            type: 'table-widget-column',
            title: 'Last Called',
            display: CoreTableCellRendererType.Timestamp,
            value: {
              type: 'metric-aggregation',
              metric: 'endTime',
              aggregation: MetricAggregationType.Max
            }
          }
        ],
        data: {
          type: 'entity-table-data-source',
          entity: 'API'
        }
      }
    ]
  }
};
