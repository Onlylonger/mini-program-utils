# 使用

> 原生小程序

将 dist 目录中对应文件模块拷贝到项目中使用, dist 目录文件已经经过 babel 转译

> 基于 wepy 框架

[wepy 框架 github 地址](https://github.com/Tencent/wepy)

```zsh
// yarn
yarn add mini-program-utils
// npm
npm install mini-program-utils
```

# socket 模块

## Socket(url, opts)

- 参数:

  - `{ String } url`
  - `{ Object } opts`

- 使用:

  构造一个 socket 实例:

  ```js
  import Socket from 'mini-program-utils/dist/socket'

  const socket = new Socket('xxxx', {
    timeout: 1e3,
    maxAttempts: Infinity,
    onOpen(e) {
      console.log('onOpen: ', e)
    },
    onMessage(data) {
      console.log('onMessage: ', data)
    },
    onClose(e) {
      console.log('onClose: ', e)
    },
    onError(e) {
      console.log('onError: ', e)
    },
    onReconnect(e) {
      console.log('onReconnect: ', e)
    },
    onMaximum(e) {
      console.log('onMaximum: ', e)
    }
  })
  ```

## 实例方法

### send(data)

- 参数

  - `{ Object } data`

- 使用

```js
socket.send({
  cmd: 'xxx',
  data: {
    cor: '伊的家'
  }
})
```

### close(code, reason)

- 参数

  - `{ Number } code`
  - `{ String } reason`

- 使用

```js
socket.close()
```

# qrcode

## utils

# Demo
