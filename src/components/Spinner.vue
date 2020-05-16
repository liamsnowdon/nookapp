<template>
  <div class="spinner"></div>
</template>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .spinner {
    display: inline-block;
    width: 80px;
    height: 80px;

    &::after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid $brown-darkest;
      border-color: $brown-darkest transparent $brown-darkest transparent;
      animation: spin 1.2s linear infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
