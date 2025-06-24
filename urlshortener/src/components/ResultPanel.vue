
<script setup>
defineProps({
    content: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="rounded-md p-2 bg-violet-600 text-white resultPanel flex flex-col items-center">
        <span class="font-bold text-lg">Your URL is ready!</span>
        <span>{{content}}</span>
    </div>
</template>
