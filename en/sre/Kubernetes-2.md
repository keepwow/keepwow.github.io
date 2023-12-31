# Kubernetes 最佳实践

## 1. 集群搭建部署

- [kubespray 离线安装配置]()
- [使用软件源加速软件包安装]()
- [使用海外容器镜像]()
- [使用 Terraform 创建 AWS EKS 弹性集群]()
- [使用 Terraform 创建腾讯云 EKS 弹性集群]()
- [为 Pod 设置内核参数]()
- [自建 Harbor 镜像仓库]()
- [自建 Gitlab 代码仓库]()
- [安装 KubeSphere]()
- [集群升级]()

## 2. 集群网络

- [为什么要开 bridge-nf-call-iptables?]()
- [ipvs 连接复用引发的系列问题]()
- [启用 CLB 直通 Pod]()
- [Pod 绑 EIP]()
- [IPVS 模式安装 localdns]()
- [使用 TCM 对外暴露 gRPC 服务]()

## 3. 集群存储

- [存储指南]()
  - [扩容 CBS 类型的 PVC]()
  - [定义 ReadOnlyMany 存储的方法]()
  - [使用 V3 协议挂载 CFS]()

## 4. 监控报警

- [Grafana 高可用部署]()
- [Prometheus 采集配置最佳实践]()
- [超级节点 Pod 监控仪表盘]()

## 5. 证书权限

- [使用 cfssl 生成证书]()
- [使用 cert-manager 签发免费证书]()
- [为 dnspod 的域名签发免费证书]()
- [用户与权限]()
- [使用 CSR API 创建用户]()

## 6.最佳实践

- [优雅终止]()
  - [Pod 销毁流程]()
  - [业务代码处理 SIGTERM 信号]()
  - [为什么收不到 SIGTERM 信号?]()
  - [在 SHELL 中传递信号]()
  - [合理使用 preStop]()
  - [长连接场景]()
  - [LB 直通 Pod 场景]()
- [健康检查配置]()
- [合理设置 Request 与 Limit]()
- [Pod 性能优化]()
  - [网络性能调优]()
  - [CPU 绑核]()
- [高可用部署]()
  - [Pod 打散调度]()
  - [工作负载平滑升级]()
- [DNS]()
  - [自定义域名解析]()
  - [CoreDNS 性能优化]()
- [弹性伸缩]()
  - [灵活调节 HPA 扩缩容速率]()
  - [HPA 使用自定义指标进行伸缩]()
- [应用容器化]()
  - [在容器内使用 systemd]()
  - [Java 应用容器化]()
    - [使用 Maven 构建 Java 容器镜像]()
  - [Go 应用容器化]()
  - [在容器中使用 crontab]()
  - [解决容器内时区不一致问题]()
- [集群运维]()
  - [安全维护或下线节点]()
  - [安全变更容器数据盘路径]()
  - [大规模集群优化]()
  - [ETCD 优化]()
  - [使用 Ansible 批量操作节点]()
- [日志采集]()
- [长连接服务]()

## 7. 故障排查

- [排障技能]()
  - [Linux 常用排查命令]()
  - [使用 nsenter 进入 netns]()
  - [使用 ksniff 远程抓包]()
  - [使用 Systemtap 定位疑难杂症]()
  - [使用 tcpdump 抓包与分析]()
  - [使用 wireshark 分析数据包]()
- [Pod 排障]()
  - [Pod 状态异常]()
    - [Terminating]()
      - [device or resource busy]()
    - [Pending]()
    - [ContainerCreating 或 Waiting]()
    - [CrashLoopBackOff]()
    - [ImagePullBackOff]()
  - [健康检查失败]()
    - [controller-manager 和 scheduler 状态显示 Unhealthy]()
- [节点排障]()
  - [节点 Crash 与 Vmcore 分析]()
  - [节点高负载]()
    - [IO 高负载]()
  - [内存碎片化]()
  - [磁盘爆满]()
  - [PID 爆满]()
  - [ARP 表爆满]()
  - [inotify 资源耗尽]()
  - [soft lockup ()
  - [no space left on device]()
  - [IPVS no destination available]()
  - [cAdvisor 无数据]()
- [网络排障]()
  - [网络超时]()
  - [网络丢包]()
  - [网络不通]()
  - [网速差]()
  - [DNS 解析异常]()
  - [CLOSE_WAIT 堆积]()
  - [排查流量激增]()
  - [排查公网服务不通]()
  - [DNS 5 秒延时]()
  - [ARP 爆满导致健康检查失败]()
  - [tcp_tw_recycle 导致跨 VPC 访问 NodePort 超时]()
  - [dns id 冲突导致解析异常]()
  - [修改 rp_filter 导致网路异常]()
  - [CLB 回环问题]()
- [存储排障]()
  - [Unable to mount volumes]()
  - [MountVolume.SetUp failed for volume]()
- [集群排障]()
  - [Namespace 一直 Terminating]()
- [排障案例]()
  - [运行时故障]()
    - [磁盘 IO 过高导致 Pod 创建超时]()
    - [高版本 containerd 下载镜像失败]()
    - [挂载根目录导致 device or resource busy]()
    - [系统时间被修改导致 sandbox 冲突]()
  - [高负载]()
    - [容器磁盘满导致 CPU 飙高]()
  - [集群故障]()
    - [误删 rancher 的 namespace 导致 node 被清空]()
    - [调度器 cache 快照遗漏部分信息导致 pod pending]()
    - [kubectl 执行 exec 或 logs 失败]()
  - [节点排障]()
    - [cgroup 泄露]()
  - [其它排障]()
    - [多容器场景下修改 hosts 失效]()
    - [Job 无法被删除]()
    - [.Net Core 配置文件无法热加载]()
