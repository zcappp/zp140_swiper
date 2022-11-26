import React from "react"

function render({ children }) {
    if (!Array.isArray(children) || !children.length) children = ["slide 1", "slide 2", "slide 3"].map(a => <div key={a}>{a}</div>)
    return <div className="swiper-container">
        <div className="swiper-wrapper">
            {children.map((a, i) => <div className="swiper-slide" key={i}>{a}</div>)}
        </div>
        <div className="swiper-pagination"></div>
    </div>
}

function onInit({ exc, props, container, ctx }) {
    // exc('load(["//z.zccdn.cn/vendor/swiper_6.5.8.css", "//z.zccdn.cn/vendor/swiper_6.5.8.js"])', {}, () => {
    exc('load(["https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css", "https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"])', {}, () => {
        let O = { on: {} }
        if (props.autoplay) O.autoplay = { delay: 3000 }
        if (props.pagingType) O.pagination = { type: props.pagingType, el: container.firstChild.lastChild }
        if (props.onSlideChange) {
            let slides = container.firstChild.firstChild.children
            O.on.slideChange = o => {
                exc(props.onSlideChange, { ...ctx, current: o.activeIndex, source: o.autoplay.running ? "autoplay" : o.touches.diff ? "touch" : "" }, () => exc("render()"))
            }
        }
        container.swiper = new Swiper(container.firstChild, O)
    })
}

const css = `
.zp140 {
  position: relative;
  overflow: hidden;
}

.zp140 .swiper-container{
  height: 100vw;
}

.zp140 .swiper-pagination-fraction {
  position: absolute;
  right: 7px;
  bottom: 7px;
  left: auto;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 0px 10px;
  font-size: 10px;
  color: white;
  width: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.zp140 .swiper-pagination-fraction span {
  margin: 2px;
}
`

$plugin({
    id: "zp140",
    props: [{
        prop: "autoplay",
        type: "switch",
        label: "自动播放"
    }, {
        prop: "pagingType",
        type: "select",
        label: "翻页类型",
        empty: "无",
        items: ["bullets", "fraction", "progressbar"]
    }, {
        prop: "onSlideChange",
        type: "exp",
        label: "onSlideChange",
        ph: "翻页时触发的表达式"
    }],
    render,
    onInit,
    css
})