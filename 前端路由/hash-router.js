class Routers {
  constructor () {
    this.routes = {}
    this.currentUrl = ''
    this.history = []
    this.currentIndex = Math.max(this.history.length - 1, 0)
    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)
    window.addEventListener('hashchange', this.refresh, false)
  }
  route(path, callback) {
    this.routes[path] = callback || function() {}
  }
  refresh() {
    this.currentUrl = window.location.hash.slice(1) || ''
    // 将当前hash路由推入数组储存
    this.history.push(this.currentUrl)
    // 指针向前移动
    this.currentIndex++
    this.routes[this.currentUrl]()
  }
  // 后退功能
  backOff() {
    // 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1)
    // 随着后退,location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]()
  }
}

window.Router = new Routers()
console.log(Router,'Router')
const content = document.querySelector('body')
// change Page anything
function changeBgColor(color) {
  content.style.backgroundColor = color
}
Router.route('/', function() {
  changeBgColor('yellow')
})
Router.route('/blue', function() {
  changeBgColor('blue')
})
Router.route('/green', function() {
  changeBgColor('green')
})
$back_btn = document.querySelector('#back_btn')

$back_btn.addEventListener('click', Router.backOff)