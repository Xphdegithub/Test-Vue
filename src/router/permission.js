// 路由权限表
const permissionList = {
  coustomer: [{
    name: 'Index',
  },
  {
    name: 'Home',
  },
  {
    name: 'Product',
  },
  {
    name: 'Statistics',
  },
  {
    name: 'GoodList',
  },
  ],
  admin: [{
    name: 'Index',
  },
  {
    name: 'Home',
  },
  {
    name: 'Product',
  },
  {
    name: 'Statistics',
  },
  {
    name: 'GoodList',
  },
  {
    name: 'AddList',
  },
  ],
};

export default function (role, routes) {
  // 与角色对应权限的name列表
  const rolePermissionName = permissionList[role].map((listItem) => listItem.name);
  // 与角色对应权限的路由列表
  const roleRoutes = routes.filter((routeItem) => {
    const childItem = routeItem;
    if (rolePermissionName.indexOf(routeItem.name) !== -1) {
      const {
        children,
      } = routeItem;
      // 过滤一级子路由
      if (children) {
        childItem.children = children.filter((item) => rolePermissionName.indexOf(item
          .name) !== -1);
          // 过滤二级子路由
          children.forEach(item => {
            if(item.children){
              const { children } = item;
              item.children = children.filter((item) => rolePermissionName.indexOf(item
                .name) !== -1);
            }
          });
      }
      return true;
    }
    return false;
  });
  return roleRoutes;
}
