# Using the Sticky Header/Footer Plugin

If you'd like to disable scrolling within the grid container, in favor of an infinite scroll UI you can use the sticky header/footer feature.

```javascript
export const plugins = {
    STICKY_HEADER: {
        enabled: true,
        scrollTarget: '#my-scrollable-div',
        listener: customFunc
    },
    STICKY_FOOTER: {
        enabled: true,
        scrollTarget: '#my-scrollable-div',
        listener: customFunc
    }
}
```

| Prop                      | Type                          | Description                                                                                                                                   |
|---------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| enabled                   | bool                          | whether the sticky header is initialized                                                                                                      |
| scrollTarget              | string                        | optional, useds as a selector to find the scrollable parent, ex. '.page-container'                                                            |
| listener                  | func                          | optional, custom function to be called on scroll                                                                                              |
