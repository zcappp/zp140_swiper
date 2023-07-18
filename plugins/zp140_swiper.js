import React from "react"

function render(ref) {
    let c = ref.children
    if (ref.iniChildren !== c && ref.container.swiper) setTimeout(() => ref.container.swiper.update(), 9)
    if (!Array.isArray(c) || !c.length) c = (ref.isDev ? ["slide 1", "slide 2", "slide 3"] : []).map(a => <div key={a}>{a}</div>)
    return <div className="swiper-container">
        <div className="swiper-wrapper">
            {c.map((a, i) => <div className="swiper-slide" key={i}>{a}</div>)}
        </div>
        <div className="swiper-pagination"></div>
    </div>
}

// exc('load(["https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css", "https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"])', {}, () => setTimeout(() => {
function init(ref) {
    const { exc, props, container, ctx } = ref
    ref.iniChildren = ref.children
    exc('load(["https://z.zccdn.cn/vendor/swiper-8.4.5.css", "https://z.zccdn.cn/vendor/swiper-8.4.5.js"], 200)', {}, () => {
        let O = { on: {}, autoplay: { delay: props.delay || 3000 } }
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

.swiper-slide {
    align-items: center;
    display: flex;
    justify-content: center;
}

.zp140 .swiper-pagination-fraction {
  position: absolute;
  left: auto;
  right: 10px;
  bottom: 10px;
  z-index: 9;
  display: inline-block;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2px;
  font-size: 10px;
  color: rgb(255, 255, 255);
  text-align: center;
  width: 45px;
}
`

$plugin({
    id: "zp140",
    props: [{
        prop: "pagingType",
        type: "select",
        label: "翻页类型",
        empty: "无",
        items: ["bullets", "fraction", "progressbar"]
    }, {
        prop: "delay",
        type: "number",
        label: "delay",
        ph: "自动切换的时间间隔，单位ms"
    }, {
        prop: "onSlideChange",
        type: "exp",
        label: "onSlideChange",
        ph: "翻页时触发的表达式"
    }],
    render,
    init,
    css
})