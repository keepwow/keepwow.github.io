# Kubernetes 入门（一）

## 1.  初识 Kubernetes

- What  容器编排工具，可类比为一个集群操作系统
- Why   解决了云原生、微服务场景下的繁琐的运维难题
- How   这是一个大的话题，需要深入学习了解

## 2. 先跑起来

（五到十分钟）示例：`kubectl`

1. 官网的交互式教程
1. 创建集群
    `% minikube start`
1. 部署应用

    ```bash
    % kubectl run kubernetes-bootcamp 
    --image=docker.io/jocatalin/kubernetes-bootcamp:v1 
    --port=8080
    ```

1. 访问应用

    ```bash
    % kubectl expose pod/kubernetes-bootcamp 
    --type="NodePort" 
    --port=8080
    ```

1. 扩容、缩容

    ```bash
    % kubectl scale deployments/kubernetes-bootcamp --replicas=3
    % kubectl scale deployments/kubernetes-bootcamp --replicas=2
    ```

1. 滚动更新、版本回退

    ```bash
    % kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/lubernetes-bootcamp:v2
    % kubectl rollout undo deployments/kubernetes-bootcamp
    ```

总结：部署、架构、运行、访问、滚动更新、健康检查

## 3. 基本组件

- Cluster
- Master
- Node

## 4. 基本概念

- Pod
- 存活探针
- Label
- Namespace（资源隔离）

## 5. Pod 的编排与调度

- Deployment
- StatefulSet
- ReplicaSet
- Job & CronJob
- DaemonSet
- Affinity VS AntiAffinity

## 6. 配置管理

- ConfigMap
- Secret

## 7. Kubernetes 网络

- 网络模型
  - Pod 内容器之间的通信
  - Pod 之间的通信
  - Pod 与 Service 之间的通信
  - 外部访问
  - NodePort
  - LoadBalancer
- 容器网络
- Service
- Ingress
- 就绪探针
- 网络方案（CNI：Container Networking Interface 实现）NetworkPolicy
  - Flannel
  - Calico
  - Canal
  - Weave Net

## 8. 持久化存储

### 8.1 Volume

- emptyDir
  - 对容器而言是持久的
  - 与 Pod 的生命周期一致
- hostPath
  - 在宿主机真实存在
  - 与 Node 的生命周期一致
- 外部存储（External Storage Provider）
  - 与 Kubernetes 集群独立
  - 生命周期：永久

### 8.2. PV & PVC & StorageClass

- PV: PersistentVolume 管理员
- PVC: PersistentVolumeClaim 普通用户（开发）
