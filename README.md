# (obsolete) webxr-api
This repository contains a draft proposal and starting point for discussing WebXR that we created in the fall of 2017, to explore what it might mean to expand WebVR to include AR/MR capabilities.

The WebVR community has shifted WebVR in this direction.  The group is now called the [Immersive Web Community Group](https://github.com/immersive-web/) and the WebVR specification has now become the [WebXR Device API](https://github.com/immersive-web/webxr).  

We will not be updating this site any longer, although we will continue to experiment with the [webxr-polyfill](https://github.com/mozilla/webxr-polyfill) we created when we created this API specification, until there is a complete WebXR polyfill. At that point we expect to shift our experiments to the new polyfill.

## (old README, for historical purposes) 

In order to make progress on defining WebXR, we are creating a proposal for this capability.  The api is intended to build on the concepts already included in the native WebVR implementation, or the WebVR polyfill, but extend them with AR capabilities appropriate for the underlying platform.

The initial interface draft is in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md). 

A polyfill and example code using this draft WebXR API is available in the [webxr-polyfill repository](https://github.com/mozilla/webxr-polyfill).

There is also a [primer on using the WebXR APIs](https://github.com/mozilla/webxr-polyfill/blob/master/CODING.md).

We maintain a [list of changes we made to the WebVR 2.0 draft to create the WebXR draft](https://github.com/mozilla/webxr-api/blob/master/design%20docs/From%20WebVR%202.0%20to%20WebXR%202.1.md).

Some of the concepts we believe are important to have in WebXR include:

- The ability to have control the render of reality _inside_ the browser, as this is essential for enabling user privacy (e.g. controlling camera and location data), easy cross platform applications, and performance.

- Making access to video frames and other "world knowledge" up to the user-agent, so they may require permission from user for access to these resources.

- Supporting the potential for multiple simultaneous AR pages, where each page knows that they are rendering on top of reality and if they have focus. Supporting these lines up with the ability to render reality inside the browser since each application would not be responsible for rendering the view of reality, so their content could be composited.

- Supporting some form of the idea of “custom, user defined” representations of reality like fully virtual realities. The critical feature is that the "reality" code can “filter” the view pose that is passed back into the rAF callback, both in the same page and in _other_ pages (if there is multi-page support).

- Some ability to do high performance, synchronous computer vision in a mix of native and javascript. One approach is to have a synchronous vision worker that is executed before the rAF callback happens, but there are other approaches.
