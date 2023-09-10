# Debian GNU/Linux

## 1. Download Debian ISO File With Jigdo

[Jigdo](http://atterer.org/jigdo/) 是一个系统镜像文件下载工具，它可以利用已有的 Debian GNU/Linux 镜像文件，从而为**你**和**镜像提供者**节省网络流量。

1. 安装 `jigdo-file`：`sudo apt install jigdo-file`
1. 如果有已经下载好的镜像文件，将其挂载到 `/mnt` 相应路径下
1. 使用 `jigdo-lite` 命令，提供 jigdo 文件或文件网址、本地解压后的镜像文件路径（用于扫描）、待下载的镜像地址（非镜像文件，而是**镜像文件包**的地址，如 https://mirrors.ustc.edu.cn/debian-cdimage/weekly-builds/amd64/jigdo-dlbd/）

  ```bash
  ## cd /data/debian-testing-dlbd
  ## mount debian-testing-amd64-DLBD-1.iso /mnt/dlbd1
  ## mount debian-testing-amd64-DLBD-2.iso /mnt/dlbd2
  ## rm -rf 1 2 && mkdir -pv 1 2
  ## # 分别进入 1、2 两个临时目录执行 jigdo-lite 命令（亦可不用手动执行 wget 命令，jigdo-lite 会自动下载 template 文件）
  ## cd 1
  ## wget -c "https://mirrors.ustc.edu.cn/debian-cdimage/weekly-builds/amd64/jigdo-dlbd/debian-testing-amd64-DLBD-1.template"
  ## jigdo-lite "https://mirrors.ustc.edu.cn/debian-cdimage/weekly-builds/amd64/jigdo-dlbd/debian-testing-amd64-DLBD-1.jigdo"
  ## 
  You can also enter a single digit from the list below to
  select the respective entry for scanning:
    1: /mnt/dlbd2/
    2: /mnt/dlbd1/
  Files to scan: 2
  ```

## 2. 使用 `apt-cdrom` 设置镜像源

## 3. 配置 sudo 免密码，控制台 root 免密码登录

---

# (B)LFS 最佳实践

> 本文基于 VirtualBox 进行实践，后续会写系列文章，使用 `jhalfs` 直接在物理机上构建 LFS

## LFS
### 准备工作
1. VirtualBox
    - CPU：4 核
    - 内存：4 GB
    - 磁盘：100 GB
    - 网卡：
        - NAT
        - HostOnly
    - 显存：128 MB
1. Debian GNU/Linux [ISO 镜像](https://mirrors.ustc.edu.cn/debian-cd/11.5.0/amd64/iso-cd/debian-11.5.0-amd64-netinst.iso)
1. [LFS 手册](https://www.linuxfromscratch.org/lfs/view/stable-systemd/)

### 分区方案

1. 安装 Debian 系统时，预先留出一个约 30 GB 大小的空白分区
1. 安装 Debian 系统时占用全部磁盘，另外再虚拟出一块新的磁盘用于 LFS。注意，新的磁盘 `Disklabel type` 需要选择 dos 而非 gpt，否则无法设为系统启动盘。

### 编译 LFS

按照手册操作即可。

### 尾声

完成编译之后，为了后续编译 BLFS 的方便，可以先不急着重启系统。再安装如下几个软件：

1. [OpenSSH]()
1. [Tmux]()
1. [Sudo]()
1. [Wget]()

## BLFS

### 桌面环境

---

## Tips

- [Linux 中 Shell 脚本实现多进程循环](https://blog.csdn.net/z_ssyy/article/details/123051697)
- [Linux Shell 实现多进程并发执行](https://blog.csdn.net/hellojoy/article/details/77340238)
