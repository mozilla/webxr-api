# webxr-api
A proposal and starting point for discussing WebXR, an expansion of WebVR to include AR/MR capabilities.

In order to make progress on defining WebXR, we are creating a proposal for this capability.  The api is intended to build on the concepts already included in the native WebVR implementation, or the WebVR polyfill, but extend them with AR capabilities appropriate for the underlying platform.

The initial interface draft is in [WebXR API.md](https://github.com/mozilla/webxr-api/blob/master/WebXR%20API.md). 

A polyfill and example code using this draft WebXR API is available in the [webxr-polyfill repository](https://github.com/mozilla/webxr-polyfill).

Some of the concepts we believe are important to have in WebXR include:

- the ability to have reality renderer _inside_ the browser, as this is essential for enabling user privacy, easy cross platform application, and performance.

- making access to video frames and other "world knowledge" is up to the user-agent, so they may require permission from user for access to these resources.

- supporting the potential for multiple simultaneous webar pages, where each page knows they are rendering on top of reality and if they have focus (for example). Supporting these lines up with the ability to render reality inside the browser (since each application would not be responsible for rendering the view of reality, so their content could be composited.)

- supporting some form of the idea of “custom, user defined” representations of reality, as we have done in argon.js.  The architecture may be different than what we did in Argon4, since the structure is different.  For example, these realities might be run inside the web page that defines them (not in a separate page as in Argon4). The critical feature is that the "reality" code can “filter” the view pose that is passed back into the rAF callback, both in the same page and in _other_ pages (if there is multi-page support).

- some ability to do high performance, synchronous computer vision in a mix of native / javascript.  The obvious approach is to have a synchronous vision worker that is executed before the rAF callback happens, but other approaches might work.
