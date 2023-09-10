# Container

## The Essence of Container

- Limitation:   cgroup
- Isolation:    namespace
- Layers:       rootfs

## 容器与 Docker 的关系

Docker 是容器技术的一个实现。

## Docker 使用技巧

1. 安装（以 root 用户执行如下命令）：

    ```bash
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    mkdir -pv /etc/apt/keyrings

    curl -fsSL http://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] http://mirrors.ustc.edu.cn/docker-ce/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update

    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```

1. 移除所有退出的容器

    ```bash
    docker rm `docker ps -aq`
    ```

1. 写 Dockerfile 时的注意事项
    - 设置时区
    - 配置中国镜像源站

    以 Alpine 为例：

    ```bash
    # add tsinghua mirror site
    RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

    # change timezone
    RUN apk update \
        && apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
        && echo "Asia/Shanghai" > /etc/timezone \
        && apk del tzdata
    ```

1. 上线前确保 Docker 的配置文件 `/etc/docker/daemon.json` 就绪，如镜像源站、日志切割等

    ```json
    {
        "registry-mirrors": [ "https://docker.mirrors.ustc.edu.cn/" ],
        "log-driver": "json-file",
        "log-opts": {
            "max-size": "5g",
            "max-file": "3"
        }
    }
    ```
