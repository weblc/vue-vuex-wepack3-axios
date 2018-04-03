<template>
    <div>
        <router-link v-for="tag in tags" :to="tag.path">
            <el-tag :key="tag.name" closable :type="isActive(tag.path)?'success':''"  size="medium" @close="deleTag(tag,$event)">
            {{tag.name}}
        </el-tag>
        </router-link>
        
    </div>
</template>
<script>
    export default {
        name: 'tagview',
        computed: {
            tags () {
                return this.$store.state.app.tags.slice(-6);
            }
        },
        data () {
            return {
            };
        },
        methods: {
            deleTag (tag,event) {
                this.$store.dispatch('deleTag',tag).then((views) => {
                    if (this.isActive(tag.path)) {
                        const lastestTag = views.slice(-1)[0];
                        if (lastestTag) {
                            this.$router.push(lastestTag.path);
                        } else {
                            this.$router.push('/');
                        }
                    }
                });
                event.preventDefault();
            },
            getCurrentRoute () {
                if (!this.$route.name) {
                    return false;
                } else {
                    this.$store.dispatch('addTags', this.$route);
                };
            },
            isActive (path) {
                return path === this.$route.path;
            }
        },
        created () {
            this.getCurrentRoute();
        },
        watch: {
            $route () {
                this.getCurrentRoute();
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>