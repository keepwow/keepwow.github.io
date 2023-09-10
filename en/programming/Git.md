# Git Basic Usages

## Basics

```bash
git init
git add 
git commit
git status
git clone
git pull
git push
```

## Advanced

```bash
git rebase
git blame
```

## Tips

**Git clone HTTPS projects without inputing password**

  ```bash
  % cat ~/.gitconfig
  [credential]
  helper = store --file $HOME/git-credentials/global.gitcredentials    # 指定路径
  helper = store    # 默认路径

  % cat ~/.git-credentials
  https://username:PASSWORD@gitlab.your.domain
  ```

Or by using `git config`：

  ```bash
  git config --global credential.helper store 
  # It will generate a file named ~/.gitconfig if it does not exist, and append a line with content like `helper = store`
  ```

Reference： https://www.cnblogs.com/volnet/p/git-credentials.html

Or `git config --global -e`


Ubuntu 20.04 use Nano as the default editor, change it:

  ```bash
  # update-alternatives --config editor
  There are 4 choices for the alternative editor (providing /usr/bin/editor).

    Selection    Path                Priority   Status
  ------------------------------------------------------------
  * 0            /bin/nano            40        auto mode
    1            /bin/ed             -100       manual mode
    2            /bin/nano            40        manual mode
    3            /usr/bin/vim.basic   30        manual mode
    4            /usr/bin/vim.tiny    15        manual mode

  Press <enter> to keep the current choice[*], or type selection number: 3
  update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/editor (editor) in manual mode
  ```

Before we use `select-editor`, but it doesn't work on Ubuntu 20.04

  ```bash
  # select-editor

  Select an editor.  To change later, run 'select-editor'.
    1. /bin/nano        <---- easiest
    2. /usr/bin/vim.basic
    3. /usr/bin/vim.tiny
    4. /bin/ed

  Choose 1-4 [1]: 2
```

---


- Q： 如何变更历史的 author
- A:  变更上一次提交的作者信息
    ```bash 
    git commit --amend --reset-author
    ```

---

- Q：如何变更历史的 author
- A：变更所有历史记录里的 author 信息
    ```bash
    #!/bin/bash

    git filter-branch -f --env-filter '
    OLD_EMAIL="old_name@old_mail.address"
    CORRECT_NAME="new_name"
    CORRECT_EMAIL="new_name@new_mail.address"
    if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
    then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
    if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
    then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
    fi' HEAD
    ```

    或者

    ```bash
    git filter-branch -f --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "old_name@old_mail.adress" ]; then
        GIT_AUTHOR_EMAIL=new_name@new_mail.adress;
        GIT_AUTHOR_NAME="New Name";
        GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
        GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
    ```

---

- Q: 如何使用 `.gitignore` 来忽略不想被追踪的目录或文件？
- A: 参见以下两篇
    - [高见龙](https://gitbook.tw/chapters/using-git/ignore.html) 
    - [SegmentFault 优秀解答](https://segmentfault.com/q/1010000000430426)

---

Git WorkFlow
- 主干开发（组件开发的团队，成员能力量，人员少，沟通顺畅，用户升级组件成本低）
- Git Flow：不具备主干开发能力，有预定的发布周期。需要执行严格的发布流程。
- GitHub Flow：不具备主干开发能力。随时集成随时发布：分支集成时经过代码评审……
- GitLab Flow（带生产分支）：
- GitLab Flow（带环境分支）：
- GitLab Flow（带发布分支）：

分支集成策略

--- 

- Q: git log 显示中文文件名时为乱码？
- A：[参考资料](https://support.huaweicloud.com/usermanual-codehub/devcloud_hlp_0957.html) `git config --global core.quotepath false`
