# react-express
react+express的初次尝试

在 /leftNav 的render中`{getMenuNodes(item.children)}`获取导航节点，在getMenuNodes中通过setOpenkey的方法改变openkey会导致无限重绘，最终系统崩溃