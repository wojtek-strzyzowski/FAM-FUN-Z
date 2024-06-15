<script setup>


</script>

<template>

<div class="main-content">
  <slot></slot>
</div>

</template>

<style scoped>

.main-content {
  min-height: 100vh;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.522);
  color: rgba(70, 28, 11);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
  border-radius: 5%;
}

/* Media Query für Bildschirme mit einer Breite von bis zu 768px */
@media (max-width: 768px) {
  .main-content {
    margin-left: 5%; /* Reduzieren Sie den linken Rand auf kleineren Bildschirmen */
    padding: 10px; /* Reduzieren Sie das Padding auf kleineren Bildschirmen */
  }
}

/* Media Query für Bildschirme mit einer Breite von bis zu 480px */
@media (max-width: 480px) {
  .main-content {
    margin-left: 2%; /* Reduzieren Sie den linken Rand auf noch kleineren Bildschirmen */
    padding: 5px; /* Reduzieren Sie das Padding auf noch kleineren Bildschirmen */
  }
}

</style>