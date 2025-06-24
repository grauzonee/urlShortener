<script setup>
defineEmits(['click']);
defineProps({
  bgColor: {
    type: String,
    default: "--color-emerald",
  },
  text: {
    type: String,
    default: "Go!",
  },
  btnClass: {
    type: String,
    required: true
    }
})
</script>
<template>
    <div class="btn-block">
        <button @click="$emit('click', $event)" type="button" 
            :class="['border-none rounded-lg text-white font-bold hover:px-8 hover:font-extrabold drop-shadow-sm py-2 px-5 transition ease-in-out duration-700', btnClass, `bg-[var(${bgColor})]`]">{{ text }}</button>
    </div>
</template>

