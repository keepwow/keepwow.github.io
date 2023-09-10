# Visual Studio Code

- [离线使用 Remote SSH 的方法]( "CSDN Blog")

如果仍失败，可以登录远程主机将 `code-server` 进程 kill 后再尝试连接。

> 后记：原因是本机的 VSCode 客户端进行了升级，为避免这种情况，最好是去设置里禁用自动更新功能。

```bash
lfs@debian:~$ ps aux | grep code-server                                                                                                     lfs        19108  0.0  0.0   2576   916 ?        S    17:13   0:00 sh /home/lfs/.vscode-server/bin/5235c6bb189b60b01b1f49062f4ffa42384f8c91/bin/code-server --start-server --host=127.0.0.1 --accept-server-license-terms --enable-remote-auto-shutdown --port=0 --telemetry-level all --connection-token-file /home/lfs/.vscode-server/.5235c6bb189b60b01b1f49062f4ffa42384f8c91.token                        lfs        19118  0.1  1.6 909640 64492 ?        Sl   17:13   0:02 /home/lfs/.vscode-server/bin/5235c6bb189b60b01b1f49062f4ffa42384f8c91/node /home/lfs/.vscode-server/bin/5235c6bb189b60b01b1f49062f4ffa42384f8c91/out/server-main.js --start-server --host=127.0.0.1 --accept-server-license-terms --enable-remote-auto-shutdown --port=0 --telemetry-level all --connection-token-file /home/lfs/.vscode-server/.5235c6bb189b60b01b1f49062f4ffa42384f8c91.token                                                                                  lfs        19155  0.0  1.1 624052 47004 ?        Sl   17:13   0:00 /home/lfs/.vscode-server/bin/5235c6bb189b60b01b1f49062f4ffa42384f8c91/node /home/lfs/.vscode-server/bin/5235c6bb189b60b01b1f49062f4ffa42384f8c91/out/bootstrap-fork --type=ptyHost --logsPath /home/lfs/.vscode-server/data/logs/20221210T171354
lfs        25435  0.0  0.0   6332  2124 pts/4    S+   17:47   0:00 grep code

lfs@debian:~$ kill 19108 19118 19155
```

- [Peacock]()
