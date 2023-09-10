# VitualBox 进阶攻略

## 常规技巧

- 更改虚拟机默认存储路径
- CPU、内存、显存 等设置

## 光驱

光驱的作用，首先是初始化时用来安装系统。

其实对于 Debian 系统来说，如果磁盘空间充足（100 GB），则在安装软件时完全可以不依赖于互联网。因为 Debian 提供了大容量 ISO 镜像文件：如 [Debian 11.5.0 版本的 DLBD](https://mirrors.ustc.edu.cn/debian-cd/11.5.0/amd64/jigdo-dlbd/)，里面包含所有的安装包。

VirtualBox 最多可挂载 4 块虚拟光盘。因此完全可以利用这个特点，实现离线安装软件。[使用 Jigdo 下载 Debian 系统镜像文件](https://kalabsha.github.io/Jigdo)
后，将下载好的 ISO 文件挂载到光驱，再到系统中运行 `sudo apt-cdrom add`，配置 `source.list`，即可享用。

## 磁盘

最多可以虚拟出两块磁盘，动态分配大小。

系统使用中，会遇到实际磁盘容量远大于真实使用容量的情况。这是因为在虚拟机中删除了文件后，宿主机并没有真正将相应的空间释放。解决方法如下：

1. 登录虚拟机系统后执行以下命令，将系统空间用 /dev/zero 写满到一个临时文件，然后将其清除
    ```bash
    $ sudo apt install pv
    $ dd if=/dev/zero | pv | dd of=/tmp/bigemptyfile bs=4096k; rm -fv /tmp/bigemptyfile
    ```
2. 关机后，在宿主机上执行以下命令，将空间释放（~~2022-12-05：难过……宿主机为 Windows 时无效~~ 2022-12-06：注意到临时文件的位置位于 /tmp 目录，而操作机器中 /tmp 目录独占一个分区，所以无效。将临时文件改为 /bigemptyfile 即可。Yeah！）
    ```bash
    [16:38]davinci@Monterey:~
    % l ~/VMs/xubuntu/xubuntu.vdi
    -rw-------  1 davinci  staff    16G  7 Jul 16:39 /Users/davinci/VMs/xubuntu/xubuntu.vdi
    [16:39]davinci@Monterey:~
    % VBoxManage modifymedium --compact ~/VMs/xubuntu/xubuntu.vdi
    0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
    [16:45]davinci@Monterey:~
    % l ~/VMs/xubuntu/xubuntu.vdi
    -rw-------  1 davinci  staff   8.8G  7 Jul 16:45 /Users/davinci/VMs/xubuntu/xubuntu.vdi
    ```
---

参考资料：
- [How to compact VirtualBox's VDI file size?](https://superuser.com/questions/529149/how-to-compact-virtualboxs-vdi-file-size)
- [8.22. VBoxManage modifymedium](https://www.virtualbox.org/manual/ch08.html#vboxmanage-modifyvdi)


## 网络
多种网络模式组合使用。我个人偏好使用 `NAT` + `HostOnly`。

- `NAT` 用于从虚拟机向外访问网络；
- `HostOnly` 用于从宿主机访问进虚拟机

每张网卡可以自定义 Mac 地址。
