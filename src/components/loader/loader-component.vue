<script setup lang="ts"></script>

<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped lang="scss">
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.spinner {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  color: #854f1d;
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 6px),
    #0000 calc(100% - 5px) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 13px),
    #000 calc(100% - 12px)
  );
  border-radius: 50%;
  animation: s9 2s infinite linear;
}
.spinner::before,
.spinner::after {
  content: '';
  grid-area: 1/1;
  background: linear-gradient(currentColor 0 0) center,
    linear-gradient(currentColor 0 0) center;
  background-size: 100% 10px, 10px 100%;
  background-repeat: no-repeat;
}
.spinner::after {
  transform: rotate(45deg);
}

@keyframes s9 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
