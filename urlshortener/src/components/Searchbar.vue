<script setup>
const model = defineModel();
defineEmits(['keydown.enter'])
defineProps({
  inputName: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
})
</script>
<template>
    <div class="w-full input-field">
        <input v-model="model" @keydown.enter="$emit('keydown.enter', $event)" type="text" :name="{inputName}" :class="[ 'w-full px-4 py-2 bg-white border-2 border-gray-800 rounded-md drop-shadow-sm hover:border-emerald-500 hover:bg-gray-50 focus:bg-gray-200 focus:text-[#777] focus:border-4 focus:border-emerald-500 hover:pointer focus:outline-none transition ease-in-out duration-700', inputName ]" :placeholder="placeholder"/>
    </div>
</template>
