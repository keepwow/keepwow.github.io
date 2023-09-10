# 使用 Gin 框架实现一个文件共享服务器之：上传

## 准备工作

我们将会分别实现「单文件上传」和「多文件上传」的功能。

1. 先创建好相应的目录

    ```bash
    $ mkdir -pv ~/Code/fileServer/gin{Single,Multi}FileServer/{template,public}
    ```

1. 将本文中的示例代码复制到相应路径下
1. 进入相应的根目录（本例中为 `~/Code/fileServer/ginSingleFileServer` 和 `~/Code/fileServer/ginMultiFileServer`），以多文件上传功能为例，执行如下命令：

    ```bash
    cd ~/Code/fileServer/ginMultiFileServer
    go mod init gmf
    go mod tidy
    ```

1. 执行 `go run ginFileServer.go` 后，本机将开启 8081 端口，访问相关路径进行文件上传即可
1. 最终目录结构如下：

    ```bash
    $ tree ~/Code/fileServer/ginMultiFileServer/
    /home/lfs/Code/fileServer/ginMultiFileServer/
    ├── ginFileServer.go
    ├── go.mod
    ├── go.sum
    ├── public
    |    └──  text.txt
    └── template
        └── multiUpload.html
    ```

下面针对两种情况分别解释。

## 单文件上传

1. 准备前端 HTML 页面：

    ```html
    <!-- ~/Code/fileServer/ginSingleFileServer/template/upload.html -->
    <html>
        <body>
            <form action="/upload" enctype="multipart/form-data" method="POST"> 
                <input type="file" name="file" id="file" accept="*" />
                <button type="submit">提交</button>
            </form>
        </body>
    </html>
    ```

1. 对应的 Go 代码如下：

    ```go
    //  ~/Code/fileServer/ginSingleFileServer/ginFileServer.go
    package main

    import (
        "fmt"
        "io"
        "log"
        "net/http"
        "os"

        "github.com/gin-gonic/gin"
    )

    func upload(c *gin.Context) {
        file, header, err := c.Request.FormFile("file")
        if err != nil {
            c.String(http.StatusBadRequest, fmt.Sprintf("file err : %s", err.Error()))
            return
        }
        filename := header.Filename
        out, err := os.Create("public/" + filename)
        if err != nil {
            log.Fatal(err)
        }
        defer out.Close()
        _, err = io.Copy(out, file)
        if err != nil {
            log.Fatal(err)
        }
        filepath := "http://your.file.server:8080/file/" + filename
        c.JSON(http.StatusOK, gin.H{"filepath": filepath})
    }

    func main() {
        r := gin.Default()
        r.LoadHTMLGlob("template/*")
        r.GET("/", func(c *gin.Context) {
            c.HTML(http.StatusOK, "upload.html", gin.H{})
        })
        r.POST("/upload", upload)
        r.StaticFS("/file", http.Dir("public")) // 列出 public 目录下的文件
        r.Run(":8080")
    }
    ```

## 多文件上传

1. 前端文件

    ```html
    <!-- ~/Code/fileServer/ginMultiFileServer/template/multiUpload.html -->
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Multi-Upload</title>
    </head>
    <body>
        <form action="/upload" method="post" accept-charset="utf-8" enctype="multipart/form-data" >
        <input type="file" name="fs" id="fs" multiple="multiple" />
        <button type="submit">提交</button>
        </form>
    </body>
    </html>
    ```

1. Go 代码：

    ```go
    //  ~/Code/fileServer/ginMultiFileServer/ginFileServer.go

    package main

    import (
        "fmt"
        "log"
        "net/http"

        "github.com/gin-gonic/gin"
    )

    func main() {

        r := gin.Default()
        r.LoadHTMLGlob("template/*")

        r.GET("/upload", func(c *gin.Context) {
            c.HTML(http.StatusOK, "multiUpload.html", nil)
        })

        r.POST("/upload", func(c *gin.Context) {

            form, _ := c.MultipartForm()

            fs := form.File["fs"]

            for _, f := range fs {

                log.Println(f.Filename)
                dst := fmt.Sprintf("public/%s", f.Filename)
                c.SaveUploadedFile(f, dst)
            }

            c.JSON(http.StatusOK, gin.H{

                "message": fmt.Sprintf("%d uploaded!", len(fs)),
            })
        })

        r.StaticFS("/file", http.Dir("public"))

        r.Run(":8081")
    }
    ```
