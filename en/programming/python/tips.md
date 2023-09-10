# Python Tips

这里记录一些 Python 的小贴士。

1. 使用[虚拟环境](./Pyenv.md) `pyenv` 和 `pyenv-virtualenv`

    ```bash
    pyenv install 3.10.4 # [TAB] 补全可以列出众多版本以供选择
    pyenv virtualenv 3.10.4 myvenv # 虚拟出一个名为 myvenv 的 3.10.4 版本的 Python 环境
    pyenv shell myvenv # 进入虚拟环境
    ```

1. 使用 PYPI 源的镜像站点

    ```bash
    pip install -h

    ...
    Package Index Options:
    -i, --index-url <url>       Base URL of the Python Package Index (default https://pypi.tuna.tsinghua.edu.cn/simple). This should point to a
                                repository compliant with PEP 503 (the simple repository API) or a local directory laid out in the same format.
    --extra-index-url <url>     Extra URLs of package indexes to use in addition to --index-url. Should follow the same rules as --index-url.
    --no-index                  Ignore package index (only looking at --find-links URLs instead).
    -f, --find-links <url>      If a URL or path to an html file, then parse for links to archives such as sdist (.tar.gz) or wheel (.whl)
                                files. If a local path or file:// URL that's a directory, then look for archives in the directory listing.
                                Links to VCS project URLs are not supported.
    ...
    ```

    例如：

    ```bash
    pip config set global.index-url https://pypi.douban.com/simple          # 全局
    pip install --upgrade pip --index-url https://pypi.douban.com/simple    # 一次性
    ```

1. Python 内置的 Web 服务器

    ```bash
    python -m http.server 8888  # 在本机 8888 端口开启一个简易的 Web 服务，此为 Python3 版本
    ```

1. 使用 `python -i` 这个命令会在程序运行后跳转到 Python 的控制台，以便进行 debug、测试

    ```bash
    python3 -i hello_world.py
    ```

1. 异或运算符 `^` 的含义：如果 a、b 两个值不相同，则异或结果为 1；如果 a、b 两个值相同，异或结果为 0。这里的结果是指的二进制结果。

1. `f-strings`（Python 3.6+）语法中可以设置填充： `>` 表示左填充，`<` 表示右填充，`^` 表示居中填充，例如：

    ```python3
    >>> name = "Huang Wei"
    >>> f"{name:_>20}"
    '___________Huang Wei'
    >>> f"{name:_<20}"
    'Huang Wei___________'
    >>> f"{name:_^20}"
    '_____Huang Wei______'
    >>> f"{name:^20}"
    '     Huang Wei      '
    >>> f"{name:>20}"
    '           Huang Wei'
    >>> f"{name:<20}"
    'Huang Wei           '
    >>> 
    ```
