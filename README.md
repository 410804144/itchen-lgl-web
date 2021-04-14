# admin boilerplate

基于 Ant Design 的后台模板

# 运行说明

复制 `build` 目录下的 `proxy.template.js` 为 `proxy.js`，修改其中的 `cookie` 通过 cloudflare access 校验。

- `npm run dev`：运行本地环境，访问 <http://localhost:9000>
- `npm run build`：编译
- `npm run format`：代码格式化

提交代码时会自动进行代码格式化。

# 开发说明

本仓储是开发模板，若需要基于该模板开发项目，请 fork 之后再开发。

如果要提交新页面模板、优化等内容，请基于 `master` 分支新建一个开发分支，名字任意，然后提交 MR，确认 ok 后再合并到 `master` 分支（简而言之，不要直接提代码到 `master` 分支）。

# 项目结构

```
src
  ├─ assets                 静态资源
  ├─ components             公共组件
  ├─ hooks                  react hooks
  ├─ pages                  页面
  │    ├─ index.tsx           入口页
  │    ├─ route.tsx           路由配置
  │    └─ xxx
  ├─ services               接口请求
  ├─ stores                 全局数据
  ├─ styles                 全局样式
  └─ utils                  工具函数
      ├─ common               通用函数
      ├─ emitter              事件订阅
      ├─ format               格式化
      ├─ history              路由跳转
      ├─ request              网络请求
      └─ storage              本地存储
```

使用引入前缀 `@` 标识 `src` 目录，例如要引用 `history`，使用 `@/utils/history` 即可。

# 左侧菜单

在 `pages/route.tsx` 中维护，属性说明：

```
{
  path: '/staff',  // 页面 url
  name: '员工',     // 菜单标题
  icon: <SolutionOutlined />,  // 菜单图标，见 https://ant.design/components/icon-cn/
  component: loadable(() => import('@/pages/staff')), // 代码目录，
  routes: []  //
},
```

# 接口 services

运行 `npm run swagger` 生成。

接口调用目前有几种形式（调用函数最末尾都有一个可选参数 `options`）：

- 无参数，如 `/admin_api/user/logout` 对应调用 `userSvc.logout()`
- 有 query/body 参数但无 path 参数，如 `/admin_api/staff/list` 对应调用 `staffSvc.list(data)`
- 有 query/body、path 参数，如 `/admin_api/staff/update/{id}` 对应调用 `staffSvc.update(id, data)`
- 有 path 参数，如 `/admin_api/staff/get/{id}` 对应调用 `staffSvc.get(id)`

proTable 中的 request 参数已经做了封装 `getTableRequest`，基本可以满足上述几种形式的调用：

- 无 path 参数：`getTableRequest({ api: userSvc.list })`
- 有 path 参数，需要使用 bind 方式传入：`getTableRequest({ api: userSvc.update.bind(this, id) })`

`getTableRequest` 中可以传入 `params` 携带额外参数、`requestOptions` 携带请求选项，如 `getTableRequest({ api: ..., params: { ... } })`

# 表格

使用 [proTable](https://protable.ant.design/)，可以参考 `pages/staff` 页面。

# 注意事项

- 当修改内容，页面自动刷新后，如果左侧菜单不见了，此时功能可能会有异常，就需要重新刷新页面了（一般改了全局的东西才会这样）
