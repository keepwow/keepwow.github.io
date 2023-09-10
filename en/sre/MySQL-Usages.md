# MySQL 基础笔记

>_持续补充中……_

## 1. 基本概念

数据库与数据表

- 数据表：
    - 表头：定义了如「姓名」、「年龄」、「分数」等**列**，每一列称之为「字段」
    - 按表头的定义，逐行填充内容（即数据）
- 数据库：一张或多张数据表的集合

以表格形式存储的数据库，称为**关系型数据库**，如：MySQL、Oracle、PostgreSQL、SQL Server 等。

**非**关系型数据库：
    - 列存储数据库：
    - 键值对数据库：Redis
    - 文档数据库：MongoDB
    - 图形数据库：

对于关系型数据库，我们使用**结构化查询语言**（Structured Query Language），即 SQL（读作：Es-Kew-El） 语言操作数据库。

## 2. 实际应用

[phpMyAdmin 官方演示服务](https://demo.phpmyadmin.net)

### 1. 基础

1. 查询：

    ```SQL
    SELECT * FROM Country;
    ```

1. 限制只输出 10 条记录，避免服务器过载：

    ```SQL
    SELECT * FROM Country LIMIT 10;
    ```

1. 跳过前 10 条，限制只输出 5 条记录：(`LIMIT` 后的 "," 用来分隔两个控制参数：偏移量、展示行数)

    ```SQL
    SELECT * FROM Country LIMIT 10,5;
    ```

1. 指定字段查询：

    ```SQL
    SELECT Name,SurfaceArea,Population 
    FROM Country LIMIT 10;
    ```

1. 精确查询：

    ```SQL
    SELECT * FROM Country WHERE Name='China';
    ```

1. `WHERE` 中除了 "=" 可用之外，还有如下方式：
    - `>` 大于
    - `<` 小于
    - `<>` 不等于
    - `>=` 大于或等于
    - `<=` 小于或等于
    - `BETWEEN` 介于 …… 之间
    - `IN` 从 …… 中选择
    - `LIKE` 和 …… 相似

    例：

    ```SQL
    SELECT * FROM Country WHERE IndepYear BETWEEN 1900 AND 2000;
    SELECT * FROM Country WHERE IndepYear >= 1900 AND IndepYear <= 2000;
    SELECT * FROM Country WHERE SurfaceArea > 1000000 OR Population > 100000000;
    ```

1. 当查询条件比较复杂时，使用 `()` 将其括住，括号内的部分将会优先判断，如果有嵌套，越里面的部分越优先。

    ```SQL
    SELECT * FROM Country WHERE
    (SurfaceArea > 1000000 OR Population > 100000000) AND
    (Continent='Asia' OR Continent='Africa');
    ```

    上面的 SQL 语句查询的内容是：
    - 面积大于 100 万平方公里，或者人口大于 1 亿
    - 位于亚洲或非洲

1. 使用 `IN` 优化上面 `AND` 后面的 `OR` 语句：

    ```SQL
    SELECT * FROM Country WHERE
    (SurfaceArea > 1000000 OR Population > 100000000) AND
    (Continent IN ('Asia','Africa'));
    ```

1. 使用 `LIKE` 进行模糊匹配，查询以 A 开头的国家或地区：

    ```SQL
    SELECT * FROM Country WHERE Name LIKE 'A%';
    ```

    其中 `%` 表示匹配任意内容。

1. 查询 10 个最长寿的国家或地区，并降序排列后将结果输出：

    ```SQL
    SELECT * FROM Country ORDER BY LifeExpectancy DESC LIMIT 10;
    ```

    与 `DESC`（Descend） 对应的 `ASC` 表示升序（Ascend）。

1. 使用 `GROUP BY` 分组：查询哪个洲的国家或地区数量最多

    ```SQL
    SELECT Continent,COUNT(*) FROM Country GROUP BY Continent;
    ```

    其中的 `COUNT(*)` 表示统计行数；`GROUP BY` 表示按后面指定的字段来分组，结合起来就表示「将 Country 中的记录按 Continent 分组，并统计每组的记录数」。注意这里的顺序：先分组、再计数。

1. 查询每个大洲的区域（Region）数量，这时需要使用 `DISTINCT` 对 `Region` 字段去重：

    ```SQL
    SELECT Continent, COUNT(DISTINCT Region) AS RegionNum FROM Country
    GROUP BY Continent;
    ```

    这里的 `DISTINCT` 的意思是独立的、不同的，经过它的修饰，`COUNT` 的对象，从简单的行数，变成了去重后的 `Region`，从而得到我们的目标结果。

    同时，我们用 `AS` 将 `COUNT(DISTINCT Region)` 的结果赋值给一个别名 `RegionNum`。同理，对于每日的活跃用户数，可以通过对用户 ID 字段做**去重计数**来统计。

    `DISTINCT` 亦可单独使用，如查询世界上有哪些洲：

    ```SQL
    SELECT DISTINCT Continent FROM Country;
    ```

### 2. 进阶

函数：对输入的数据进行加工的方法，上面的 `COUNT`（计数方法）其实就是一个常用函数。此外还有：
- 求和：`SUM`
- 求平均值：`AVG`
- 最大值：`MAX`
- 最小值：`MIN`
- 四舍五入：`ROUND`

1. 利用求和函数计算每个洲的总人口：

    ```SQL
    SELECT Continent, SUM(Population) FROM Country GROUP BY Continent;
    ```

1. 指定衍生数据的排序方式：

    ```SQL
    SELECT Continent,COUNT(*) AS CountryNum FROM Country
    GROUP BY Continent ORDER BY CountryNum DESC;
    ```

1. 各国家或地区的人均国民生产总值（Per Captia GNP）

    ```SQL
    SELECT                            Name,
    ROUND(GNP * 1000000 / Population, 2) AS
    PCGNP FROM Country ORDER BY PCGNP
    DESC LIMIT 10;
    ```

    - `GNP / Population` 用于计算人均国民生产总值，然后通过 `ROUND` 函数四舍五入到 2 位小数；
    - `* 1000000` 是因为 `GNP` 字段原本的单位是百万美元，我们计算人均 GNP 的时候，需要将其单位还原为美元。

1. 查看国家名首字母的分布情况：

    ```SQL
    SELECT SUBSTRING(Name, 1, 1) AS FirstLetter, COUNT(*) AS Num FROM Country
    GROUP BY FirstLetter ORDER BY FirstLetter;
    ```

    我们使用 `SUBSTRING` 函数对 `Name` 字段，从 第 1 个字母开始，截取 1 个长度的字符。

1. 同时对多个字段做分组和排序。统计每个区域的国家或地区数量：

    ```SQL
    SELECT Continent, Region, COUNT(*) FROM Country GROUP BY Continent, Region;
    ```

    `GROUP BY` 后可以跟指定多个字段，查询结果将依次逐级分组，上面示例表示先按洲分组，再按区域分组

1. 复合排序：首先按洲名的字母表顺序排列；然后按每个区域的国家或地区数降序排列：

    ```SQL
    SELECT Continent, Region, COUNT(*) AS Num FROM Country GROUP BY Continent, Region
    ORDER BY Continent, Num DESC;
    ```

    这里的 `ORDER BY` 指明了排序规则：
    - 首先按 `Continent` 升序排序（默认 `ASC`）
    - 如果 `Continent` 相同，就按 `COUNT` 得出的 `Num` 降序排列

1. 只展示国家或地区数量超过 10 的部分：

    ```SQL
    SELECT Continent, Region, COUNT(*) AS Num FROM Country GROUP BY Continent, Region
    HAVING Num > 10
    ORDER BY Continent, Num DESC;
    ```

    注意：这里不能使用 `WHERE` 来限制，因为 `WHERE` 只能以原表中的数据为基础，而分组后的统计数据 `Num` 是一个合并后产生的数据，对于这种情况，需要使用 `HAVING` 来过滤结果。

    `HAVING` 必须跟在 `GROUP BY` 之后，`ORDER BY` 之前（如果有的话），用来对分组计算结果做过滤。

### SELECT 查询语句的模板总结：

```SQL
SELECT {column} FROM {table} WHERE {condition} 
GROUP BY {column}
HAVING {condition}
ORDER BY {column}
LIMIT {offset, count};
```

### SQL 查询语句的执行顺序

- 首先打开 FROM 指定的数据表
- 然后根据 WHERE 条件选取满足要求的数据行
- 接下来进行 GROUP BY 分组、计数等操作
- HAVING 可以对 GROUP BY 的结果做二次过滤
- ORDER BY 对数据进行排序
- 最后通过 LIMIT 展示某几行

### 常用的 SQL 命令

1. 显示当前的数据**库**列表：`SHOW DATABASES;`
1. 访问指定的数据库：`USE {dbname};`
1. 显示当前的数据**表**列表：`SHOW TABLES;`
1. 显示指定的数据表基本格式：`DESC {table};`

---

## 工具
- [DBeaver](https://dbeaver.io)
