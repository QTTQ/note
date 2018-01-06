去查了一下 JavaScript event对象属性方法

currentTarget 返回其事件监听器触发该事件的元素。
target 返回触发此事件的元素（事件的目标节点）。
target 触发事件的元素。尽管事件是绑定在 li 上的，
点 div.item - content 触发的就是 div.item - content。
currentTarget 事件绑定的元素。事件绑定在 li 不管你点谁 触发的总是 li
解决无法获取到当前触发事件的元素

handleMsglistStar(e){
    console.log(e.currentTarget)
    console.log(e.currentTarget.getAttribute('data-key'))
    //这样就能拿到绑定在 li 上的信息了
}