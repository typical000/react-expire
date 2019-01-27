# react-expire

React component for managing time expiration.

## Why

Sometimes, we need to show something, and after, remove this thing. The simpliest case - notification that must disappear after some time.

## Installation

```
# with NPM
npm install react-expire --save
# or YARN
yarn install react-expire
```

## How to use

`react-expire` component accepts such props:
- **until** Lifetime in milliseconds. If set 0 - this means that widget will never expire. When widget will expire - `onExpire` property will be triggered.
- **onExpire** Callback, that will be called when 'until' prop countdown will finish.
- **id** Optional property. Used as identifier of "what" was expired. Usefull if you have parent component that renders "list" of "expirable" components, and you need to identify them in some way. If this props isn't - `onExpire` will be called without any params.
- **children** Nothing, node or function (if you want to use it as render-prop. See examples below)

You can use this component in different ways:
1. As component with(out) children that passes expire event in parent component via callback
    ```
    <Expire until={2000} id={1} onExpire={someParentComponentHandler}>
      <ChildComponent />
    </Expire>
    ```

2. As render-prop
    ```
    <Expire until={2000}>
      {(expired) => (
        expired ? 'Expired' : 'Not yet expired'
      )}
    </Expire>
    ```

*NOTE:* You can use together render-prop pattern and callback function.


## How to build

```
npm run build
```

## How to run examples

```
npm run example
```
