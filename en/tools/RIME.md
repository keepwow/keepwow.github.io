# RIME

RIME 是我从大学时期开始接触，然后使用至今的一款输入法引擎。

关于它的介绍，可以参阅其官网 [RIME](https://rime.im)。

这里记录如何在一台新安装的电脑上部署 RIME，相关脚本存放在笔者在 GitHub 上的私有仓库里。

1. 安装 RIME
    ```
    brew install --cask squirrel # macOS
    ```

2. 获取配置
    ```
    cd ~/Library && rm -rf Rime
    git clone git@github.com:kalabsha/Rime
    ```

3. 部署

    点击部署 `菜单栏 -> Squirrel -> Deploy` 或者使用快捷键：`Control + Option + \``

4. 恢复用户自定义词典
    ```
    rm -fv ~/Library/Rime/wubi86.userdb/LOCK
    
    /Library/Input\ Methods/Squirrel.app/Contents/MacOS/rime_dict_manager -r /path/to/your/wubi86.userdb.txt
    ```

5. 保存用户自定义词典

    `菜单栏 -> Squirrel -> Sync user data`

    执行上述操作后，用户自定义词典数据将会被保存在 `~/Library/Rime/sync/*/wubi86.userdb.txt` 文件中。
