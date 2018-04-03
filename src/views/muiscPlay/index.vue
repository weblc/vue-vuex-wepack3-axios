<template>
    <div class="play-music">
        <el-row>
            <el-col :span="16">
                <div class="play-title">this is play music</div>
            </el-col>
            <el-col :span="8">
                <template>
                    <div class="play-volume" >
                        <el-slider v-model="volume" show-input @change="volumeChange()" >
                        </el-slider>
                    </div>
                </template>
                <div @click="stop()">stop</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <ul class="play-song-name">
                    <li v-for="(item,index) in musics" @click="requestMusic(item,index)" :class="{active:songIndex===index}">{{item}}</li>
                </ul>
            </el-col>
            <el-col :span="18">
                <div class="play-canvas-cotian" id="showArea">
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { loadMusic1,changeVolume,stopMusic, creatArea } from '@utils/music';
    export default {
        data () {
            return {
                musics: '',
                volume: 20,
                volumeMax: 100,
                songIndex: ''
            };
        },
        components: {

        },
        mounted () {
            this.getMusic();
            changeVolume(this.volume,this.volumeMax);
            creatArea('showArea');
        },
        destroyed () {
            stopMusic();
        },
        methods: {
            getMusic: function () {
                this.$store.dispatch('getMusic').then(res => {
                    this.musics = res.musics;
                });
            },
            requestMusic: function (name,index) {
                loadMusic1('/media/' + name);
                this.songIndex = index;
            },
            volumeChange: function () {
                changeVolume(this.volume,this.volumeMax);
            },
            stop: function () {
                stopMusic();
            }
        },
        watch: {
            volume: 'volumeChange'
        }
    };
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    @import "src/css/mixin.scss";
    .play-music {
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        background: #000;
        color: #fff;
        .play-volume {
            padding: 20px;
        }
        .play-title {
            border: 1px solid #fff;
            height: 80px;
        }
        .play-song-name {
            border: 1px solid #fff;
            padding: 20px;
            line-height: 30px;
            color: green;
            cursor: pointer;
            .active{
                color: red;
            }
        }
        .play-canvas-cotian {
            border: 1px solid #fff;
        }
    }
</style>