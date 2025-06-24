<template>
  <div class="greetings">
    <h1 class="beige">Hi there!</h1>
    <h3> 
      You can use this service to shorten your URL. Just past it in the field below and click GO
    </h3>
  </div>
</template>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
