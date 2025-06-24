<template>
  <header>
    <div class="mt-10 wrapper">
      <Greeting/>
    </div>
  </header>

  <main class="grow my-7 mx-12 flex flex-col">
        <div class="w-100 flex flex-col searchForm gap-4">
            <Searchbar v-model="originalUrl" inputName="longUrl" placeholder="Type your looong URL here..." @keydown.enter="sendUrl"/>
            <Button btnClass="go-btn" @click="sendUrl"/>
        </div>
        <div class="mx-24 mt-10">
            <ResultPanel v-if="showResult" :content="resultUrl"/>
        </div>
  </main>
</template>

<script setup lang="ts">
import Greeting from '../components/Greeting.vue'
import Searchbar from '../components/Searchbar.vue'
import Button from '../components/Button.vue'
import ResultPanel from '../components/ResultPanel.vue'
import { ref } from 'vue'
import axios from 'axios';

const originalUrl = ref('');
let showResult = ref(false);
const resultUrl = ref('')
async function sendUrl(): Promise<String | null> {
    const processedInput = originalUrl.value.trim();
    if (processedInput.length == 0) {
        return null;
    }
    try {
        const response = await axios.post("http://localhost:3000/api/shorten", {url: processedInput});
        if (response.data.success === true) {
            showResult.value = true;
            resultUrl.value = response.data.data;
            originalUrl.value = '';
        }
    } catch (error) {
        console.log(error);
    }
}
// Implement URL handling
</script>

