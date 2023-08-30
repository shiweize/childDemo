<template>
    <div class="testColor">
        子应用
    </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";


const { proxy } = getCurrentInstance();

const goParent = (url) => {
}
</script>

<style scoped>
/* .testColor{
    color: red;
} */
</style>