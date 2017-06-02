<template>
    <transition name="move">
        <div class="food" v-show="showFlag">
            
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            showFlag: false
        }
    },
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        show () {
            this.showFlag = true
        }
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
        background: #ccc
        &.move-enter-active, &.move-leave-active
            transition: all 0.2s linear
        &.move-enter, &.move-leave-active
            transform: translate3d(100%, 0, 0)
</style>
