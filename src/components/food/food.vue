<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{ food.name }}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{ food.sellCount }}份</span>
                        <span class="rating">好评率{{ food.rating }}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{ food.price }}</span>
						<span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
                    </transition>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品介绍</h1>
                    <p class="text">{{ food.info }}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import split from 'components/split/split'
    import ratingselect from 'components/ratingselect/ratingselect'

    // const POSITIVE = 0
    // const NEGATIVE = 1
    const ALL = 2

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        methods: {
            show () {
                this.selectType = ALL
                this.onlyContent = true

                this.showFlag = true
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            },
            hide () {
                this.showFlag = false
            },
            addFirst (event) {
                if (!event._constructed) {
                    return
                }
                this.$root.eventHub.$emit('cart.add', event.target)
                Vue.set(this.food, 'count', 1)
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        }
    }
</script>

<style lang="stylus">
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: #fff
        &.move-enter-active, &.move-leave-active
            transition: all 0.2s linear
        &.move-enter, &.move-leave-active
            transform: translate3d(100%, 0, 0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: blcok
                    padding: 10px
                    font-size: 20px
                    color: #fff
        .content
            position: relative
            padding: 18px
            font-size: 0
            .title
                font-size: 14px
                line-height: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
            .detail
                margin-top: 8px
                font-size: 10px
                line-height: 10px
                color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 12px
            .price
                margin-top: 18px
                .now
                    display: inline-block
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240, 20, 20)
                    line-height: 24px
                    margin-right: 12px
                    vertical-align: top
                .old
                    display: inline-block
                    font-size: 10px
                    font-weight: 700
                    color: rgb(147, 153, 159)
                    line-height: 24px
                    text-decoration: line-through
            .cartcontrol-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 10px
                color: #fff
                background: rgb(0, 160, 220)
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.5s
                &.fade-enter, &.fade-leave-active
                    opacity: 0
        .info
            padding: 18px
            .title
                font-size: 14px
                line-height: 14px
                color: rgb(7, 17, 27)
            .text
                padding: 6px 8px 0 8px
                font-size: 12px
                font-weight: 200px
                color: rgb(77, 85, 93)
                line-height: 24px
        .rating
            padding: 18px 18px 12px 18px
            border-bottom: 1px solid #ccc
            .title
                font-size: 14px
                line-height: 14px
                color: rgb(7, 17, 27)
</style>
