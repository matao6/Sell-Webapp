<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <transition name="fade">
            <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
        </transition>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        created () {
            // console.log(this.food)
        },
        methods: {
            addCart () {
                if (!event._constructed) {
                    return
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                } else {
                    this.food.count ++
                }
                this.$root.eventHub.$emit('cart.add', event.target)
            },
            decreaseCart () {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    this.food.count --
                }
            }
        }
    }
</script>

<style lang="stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear
                .inner
                    transition: all 0.4s linear
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: translate3d(24px, 0, 0)
                .inner
                    transform: rotate(180deg)
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            font-size: 10px
            line-height: 24px
            text-align: center
            color: rgb(147, 153, 159)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.4s linear
            &.fade-enter, &.fade-leave-active
                opacity: 0
        .cart-add
            display: inline-block
            line-height: 24px
            font-size: 24px
            padding: 6px
            color: rgb(0, 160, 220)
            
</style>
