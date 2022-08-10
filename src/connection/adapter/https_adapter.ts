import { BaseHttpAdapter, RequestParams } from './base_http_adapter';
import { Connection, ConnectionParams } from '../connection';
import { Logger } from '../../logger';
import Https from 'https';
import Http from 'http';

export class HttpsAdapter extends BaseHttpAdapter implements Connection {
  constructor(config: ConnectionParams, logger: Logger) {
    const agent = new Https.Agent({
      keepAlive: true,
      timeout: config.request_timeout,
    });
    super(config, logger, agent);
  }

  protected createClientRequest(
    url: URL,
    params: RequestParams
  ): Http.ClientRequest {
    return Https.request(params.url, {
      method: params.method,
      agent: this.agent,
      headers: this.getHeaders(params),
    });
  }
}
