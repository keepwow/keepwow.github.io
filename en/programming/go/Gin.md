# Go Web 框架初探之 Gin 

## Gin 框架介绍

- [官网地址](https://gin-gonic.com)
- [Github](https://github.com/gin-gonic/gin)
- [中文文档](https://gin-gonic.com/zh-cn/docs/)

Gin 是一个用 Go 语言编写的 Web 框架。它是一个类似于 Martini 但拥有更好性能的 API 框架，由于使用了 [httprouter](https://github.com/julienschmidt/httprouter)，速度提高了近 40 倍。

关于命名：Martini 和 Gin 都是一种烈酒。有兴趣可以挖掘其背后的故事。

## 安装与使用

### 安装

1. 手动安装 `Gin`:

```bash
go install github.com/gin-gonic/gin
```

1. 在项目路径下执行 `go mod tidy`，即可自动安装

### 示例

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// 创建一个默认的路由引擎
	r := gin.Default()
	// GET：请求方式；/hello：请求的路径
	// 当客户端以 GET 方法请求 /hello 路径时，会执行后面的匿名函数
	r.GET("/hello", func(c *gin.Context) {
		// c.JSON：返回JSON格式的数据
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})
	// 启动 HTTP 服务，默认在 0.0.0.0:8080 启动服务
	r.Run()
}
```

将上面的代码保存并编译执行，然后使用浏览器打开 `127.0.0.1:8080/hello` 就能看到一串 JSON 字符串。

```go
// TO BE CONTINUED
```
