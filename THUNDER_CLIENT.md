# Thunder Client

Thunder Client is a tool for debugging the server API output from VSCode.
It aids in checking what the server gives us when we make requests to it, which can be
really helpful when you're trying to debug what your server gives you.

## Use Thunder Client to explore API output

To use Thunder Client (once it's installed), open it from the sidebar.
The icon is a circle with a lightning bolt in the middle.

<img src = "https://user-images.githubusercontent.com/32685970/214179360-2ab176da-dc4f-43f8-8519-4ade1660ef89.png" height = 300 />

This should add a button in the top of the sidebar labelled `New Request`, click it.

![Thunder client startup screen](https://user-images.githubusercontent.com/32685970/214179462-d89c738c-7ab3-4ede-99a8-a3c240169884.png)

This should open a window with two columns. In the top of the left column,
there should be a URL bar with a url, (by default, it's `https://www.thunderclient.com/welcome`). 
Change that to `http://localhost:4567/api/<the-route-you-want-to-test>` (ie. `http://localhost:4567/api/users`), then press send.

![Thunder client usage](https://user-images.githubusercontent.com/32685970/214179602-528f347b-b825-4446-9c91-d6671d8ad0bb.png)

The response will be on the right column. You can also change the query parameters from this window.
