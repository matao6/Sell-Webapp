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
                        <span class="">好评率{{ food.rating }}%</span>
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
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" :key="rating.id" class="rating-item border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import {formatDate} from 'common/js/date'
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
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        created () {
            this.$root.eventHub.$on('ratingtype.select', (type) => {
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            })
            this.$root.eventHub.$on('content.toggle', (toggle) => {
                this.onlyContent = toggle
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            })
        },
        methods: {
            show () {
                this.selectType = ALL
                this.onlyContent = false

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
            },
            needShow (type, text) {
                if (this.onlyContent && !text) {
                    return false
                }
                if (this.selectType === ALL) {
                    return true
                } else {
                    return type === this.selectType
                }
            }
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
    @import '../../common/stylus/bass.styl'
    @import '../../common/stylus/mixin.styl'

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
            // padding: 18px 18px 12px 18px
            .title
                font-size: 14px
                line-height: 14px
                padding: 18px 18px 0 18px
                color: rgb(7, 17, 27)
            .rating-wrapper
                padding: 0 18px
                .rating-item
                    position: relative
                    padding: 16px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                    .user
                        position: absolute
                        right: 0
                        top: 16px
                        line-height: 12px
                        font-size: 0
                        .name
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .avatar
                            border-radius: 50%
                    .time
                        margin-bottom: 6px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .text
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right: 4px
                            line-height: 16px
                            font-size: 12px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .icon-thumb_down
                            color: rgb(147, 153, 159)
                .no-rating
                    padding: 16px 0
                    font-size: 12px
                    color: rgb(147, 153, 159)
</style>
