# webxr-api
A proposal and starting point for discussing WebXR, an expansion of WebVR to include AR/MR capabilities.

In order to make progress on defining WebXR, we are creating a proposal for this capability.  The api is intended to build on the concepts already included in the native WebVR implementation, or the WebVR polyfill, but extend them with AR capabilities appropriate for the underlying platform.

The initial interface draft is in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md). 

A polyfill and example code using this draft WebXR API is available in the [webxr-polyfill repository](https://github.com/mozilla/webxr-polyfill).

We maintain a [list of changes we made to the WebVR 2.0 draft to create the WebXR draft](https://github.com/mozilla/webxr-api/blob/master/design%20docs/From%20WebVR%202.0%20to%20WebXR%202.1.md).

Some of the concepts we believe are important to have in WebXR include:

- The ability to have control the render of reality _inside_ the browser, as this is essential for enabling user privacy (e.g. controlling camera and location data), easy cross platform applications, and performance.

- Making access to video frames and other "world knowledge" up to the user-agent, so they may require permission from user for access to these resources.

- Dupporting the potential for multiple simultaneous AR pages, where each page knows that they are rendering on top of reality and if they have focus. Supporting these lines up with the ability to render reality inside the browser since each application would not be responsible for rendering the view of reality, so their content could be composited.

- Supporting some form of the idea of “custom, user defined” representations of reality like fully virtual realities. The critical feature is that the "reality" code can “filter” the view pose that is passed back into the rAF callback, both in the same page and in _other_ pages (if there is multi-page support).

- Some ability to do high performance, synchronous computer vision in a mix of native and javascript. One approach is to have a synchronous vision worker that is executed before the rAF callback happens, but there are other approaches.
