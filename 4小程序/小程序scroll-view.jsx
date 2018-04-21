小程序 - scroll - view用法及属性


如果屏幕中某元素的内容超过此元素的高度，
可设置元素为scroll - view 为滚动状态元素，
这样可以做到元素固定高度且元素内容滚动屏幕不滚动的效果；

scroll - view标签的主要属性分为以下几种：

<scroll-view scroll-y="false" 
scroll-x="false" 
bindscrolltoupper="" 
bindscrolltolower="" 
bindscroll="" 
scroll-into-view="" 
scroll-top="500"
upper-threshold="10" 
lower-threshold="10" 
scroll-top="50" 
scroll-left="10" 
bindscrolltoupper=‘ xx‘ 
bindscrolltolower="xx" 
bindscroll="xx"
class="largefont">
斯蒂芬斯蒂芬是否的是大法官的格式的风
格是股份是范甘迪国防生的国防生的告诉对方
</scroll-view>	
</view >
scroll - x / y=‘true / false‘----允许横向 / 纵向滚动

scroll - top / left=‘50‘--设置滚动条出现的位置

bindscroll =‘‘ 滚动中触发的函数  event.detail = { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY }

bindscrolltoupper =‘scrolltoupper‘   滚动到顶部 / 左边出发的函数scrolltoupper

bindscrolltolower =‘scrolltolower‘   滚动到底部 / 右边出发的函数scrolltolower

upper - threshold=‘50‘ 距离顶部 / 左边多远时触发scrolltoupper函数

lower - threshold=‘50‘ 距离底部 / 右边多远时触发scrolltolower 函数

scroll - into - view=‘id名字（无需#）’, 这个是用来设置此元素的某个子元素出现在最上方，id的名字为此子元素的id