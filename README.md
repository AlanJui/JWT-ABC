# 專案摘要

入門研習：如何在 MEAN Stack 以 JWT 建構具「使用者管理」功能的 App 。

 - Web Server: NodeJS 6.6.0 + ExpressJS 4.14.0
 - DB Server: MongoDB 2.6.6
 - Client: AngularJS 1.4.0

## 軟體架構

由以下兩部份，構成整體 App ：
 - Client
 - Server (RESTful API)

```
.
├── README.md
├── client
│   ├── Gruntfile.js
│   ├── README.md
│   ├── app
│   │   ├── 404.html
│   │   ├── favicon.ico
│   │   ├── images
│   │   ├── index.html
│   │   ├── robots.txt
│   │   ├── scripts
│   │   ├── styles
│   │   └── views
│   ├── bower.json
│   ├── bower_components
│   │   ├── angular
│   │   ├── angular-mocks
│   │   ├── angular-ui-router
│   │   ├── animate.css
│   │   ├── bootstrap
│   │   └── jquery
│   ├── node_modules
│   │   ├── abbrev
│   │   ├── accepts
│   │   ├── ⋯⋯⋯⋯⋯⋯
│   │   └── yeast
│   ├── package.json
│   └── test
│       ├── karma.conf.js
│       └── spec
└── server
    ├── models
    │   └── User.js
    ├── node_modules
    │   ├── accepts
    │   ├── array-flatten
    │   ├── ⋯⋯⋯⋯⋯⋯
    │   └── vary
    ├── package.json
    └── server.js
```


## 開發環境操作

以下說明本專案在進行開發時的基本操作。

### Cient 用戶端

#### 安裝及設定

```
 [ProjectRoot] $ cd client
 [ProjectRoot] $ npm install
```

#### 啟動

```
 [ProjectRoot] $ cd client
 [ProjectRoot/client] $ grunt serve
```

#### 瀏覽

 1. 啟動瀏覽器。
 2. 觀看網址： http://localhost:9000


### Server 伺服端

#### 安裝及設定

```
 [ProjectRoot] $ cd server
 [ProjectRoot] $ npm install
```

#### 啟動

```
 [ProjectRoot] $ cd server
 [ProjectRoot/server] $ npm start
```

#### 瀏覽

 1. 啟動瀏覽器。
 2. 觀看網址： http://localhost:3000

