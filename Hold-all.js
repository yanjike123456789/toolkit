//获取验证码时间
// 注册事件
function Verificati(element) {
  // 定义一个变量
  let num = 60
  // 使用禁止按键
  element.disabled = true;
  // 为了保证点击瞬间就计时,先在点的瞬间修改文字一次
  element.value = '获取验证码(' + num + ')';
  // 每隔一段时间修改文字
  let intervalId = setInterval(function () {
    num--;
    element.value = '获取验证码(' + num + ')';
    // 如果时间到了0了,需要停止
    if (num === 0) {
      clearInterval(intervalId)
      element.disabled = false;
      element.value = '获取验证码'
    }
  }, 1000)
}

var kits = {};
//获取年月日时分秒：
// 把方法都放到对象的身上
kits.formatDate = function () {
  let date = new Date();
  // 把年月日时分秒获取
  let year = date.getFullYear();
  let montht = date.getMonth() + 1;
  montht = this.dispatchZero(montht);
  let day = date.getDate();
  day = this.dispatchZero(day);
  let hour = date.getHours();
  hour = this.dispatchZero(hour);
  let minute = this.dispatchZero(date.getMinutes());
  let second = this.dispatchZero(date.getSeconds());
  return year + '-' + montht + '-' + day + ' ' + hour + ':' + minute + ':' + second;

}
// kits.randomInt = function (n, m) {
//   return Math.floor(Math.random() * (m - n + 1) + n);
// }




//调用移动端的点击事件
function tap(element, fn) {
  let dat;
  // 定义变量位置
  let startX, startY;
  // 注册事件触摸事件
  element.addEventListener('touchstart', function (e) {
    //    判断是否单指操作
    if (e.touches.length !== 1) {
      console.log('不是单指操作')
      return;
    }
    // 记录开始的触摸时间,和开始点
    dat = Date.now();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  })
  // 注册触摸结束
  element.addEventListener('touchend', function (e) {
    //得到触摸结束时间
    let $dat = Date.now()
    if ($dat - dat > 150) {
      console.log('按下事件太长')
      return;
    }
    let endX = e.changedTouches[0].pageX;
    let endY = e.changedTouches[0].pageY;

    if (Math.abs(endX - startX) > 50 || Math.abs(endX - startY) > 50) {
      console.log('偏移过大')
      return;
    }

  })
  fn && fn()
}