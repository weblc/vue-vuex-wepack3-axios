<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
    export default {
        name: 'icon-svg',
        props: {
            iconClass: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName () {
                return `#${this.iconClass}`;
            }
    }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>