//获取验证码时间
// 注册事件
// kits.Verificati = function (element, num) {
//   // 定义一个变量
//   let num = 60
//   // 使用禁止按键
//   element.disabled = true;
//   // 为了保证点击瞬间就计时,先在点的瞬间修改文字一次
//   element.value = '获取验证码(' + num + ')';
//   // 每隔一段时间修改文字
//   let intervalId = setInterval(function () {
//     num--;
//     element.value = '获取验证码(' + num + ')';
//     // 如果时间到了0了,需要停止
//     if (num === 0) {
//       clearInterval(intervalId)
//       element.disabled = false;
//       element.value = '获取验证码'
//     }
//   }, 1000)
// }

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
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}



//调用移动端的点击事件
kits.tap = function (element, fn) {
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

    if (Math.abs(endX - startX) > 50 || Math.abs(endY - startY) > 50) {
      console.log('偏移过大')
      return;
    }

  })
  fn && fn()
}


// 随机颜色
kits.getRandomColor = function () {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}



// 本地存储
kits.getArray = function (key) {
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr || [];
}


/**
 * @description 封装好的把复杂数据存储到本地里面的方法，默认是存储json格式字符串
 * @param {string} key 存储到本地里面的键
 * @param {object} obj 要存储的复杂数据
 * @returns undefined
 */
kits.setData = function (key, obj) {
  let json = JSON.stringify(obj)
  localStorage.setItem(key, json)
}