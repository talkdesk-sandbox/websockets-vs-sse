# Websocket vs SSE
Example project where you can subscribe to metrics on the frontend and push metrics from the backend with the following approaches:
- SSE with HTTP1
- SSE with HTTP2
- Websockets

## SSE
By using HTTP2, we only need one connection in client side for maintaining all subscriptions. From the backend perspective, it is still multiple connections.

### HTTP1
![alt text](images/http1+sse.png)

### HTTP2
![alt text](images/http2+sse.png)