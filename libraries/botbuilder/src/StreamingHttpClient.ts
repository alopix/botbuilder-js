/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { HttpClient, HttpOperationResponse, WebResource } from '@azure/ms-rest-js';
import { IStreamingTransportServer, StreamingRequest } from 'botframework-streaming-extensions';

export class StreamingHttpClient implements HttpClient {
  private readonly server: IStreamingTransportServer;

  constructor(server: IStreamingTransportServer) {
    this.server = server;
  }

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    const request = this.mapHttpRequestToProtocolRequest(httpRequest);
    request.Path = request.Path.substring(request.Path.indexOf('/v3'));
    const res = await this.server.sendAsync(request, undefined);

    return {
      request: httpRequest,
      status: res.StatusCode,
      headers: httpRequest.headers,
      readableStreamBody: res.Streams.length > 0 ? res.Streams[0].getStream() : undefined
    };
  }

  private mapHttpRequestToProtocolRequest(httpRequest: WebResource): StreamingRequest {

    return StreamingRequest.create(httpRequest.method, httpRequest.url, httpRequest.body);
  }
}