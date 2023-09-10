# macOS 添加静态路由

起因：在汉堡王使用免费 WiFi，拨公司的 VPN，无法登录内网机器。

检查网络情况，在汉堡王 WiFi 下获取的 IP 是 `172.16.193.213`，拨入 VPN 后获取的 IP 是 `172.16.10.4`

![Wi-Fi](/images/macOS-static-route-1.png)
![VPN](/images/macOS-static-route-2.png)


公司内网的 VPN 网段是 `172.16.10.0/24`，汉堡王的 WiFi 网段刚好也是 `172.16.0.0/16`，所以网段重叠，拨了 VPN 也无法访问内网的机器，这时添加一条静态路由，让访问内网主机网段时走 VPN 即可。

命令如下：
```bash
% sudo route add -net 172.16.118.0/23 -gateway 172.16.10.4
```
