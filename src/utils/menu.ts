// 菜单去掉第一项没有path和name项
export const filterMenu = (menu) => {
  // 过滤不带"path"和"name"的项

  const arr = menu.filter((item) => item.path && item.name);

  // 递归遍历子项
  arr.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children = filterMenu(item.children);
    }
  });
  return arr;
};
