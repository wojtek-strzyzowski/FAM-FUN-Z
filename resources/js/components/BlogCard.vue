<script setup>
// Keine Änderungen erforderlich im Script-Bereich
</script>

<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="/public/images/card2.png" alt="Card" style="width:300px;height:300px;">
        <div class="front-text">
            <div class="created"> 
              <div class="Date">  
                <p>Erstellt am:</p>
              </div>
              <div class="User"> 
                <p>User</p>
              </div>
            </div>
            <div class="front-description">
              <p>Titel</p>
              <p>Indoor</p>
            </div>
        </div>
      </div>
      <div class="flip-card-back">
        <h1>Titel</h1> 
        <h2>Beschreibung</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 350px;
  perspective: 1000px;
  margin: 15px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 5px; */
  box-sizing: border-box;
  overflow: hidden;
}

.flip-card-front {
  background-color:#18629285;
  color: rgba(70, 28, 11);
  border-radius: 5%;
}

.flip-card-back {
  background-color: #18629285;
  color:  rgba(70, 28, 11);
  transform: rotateY(180deg);
  border-radius: 5%;
}

.front-text {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.created {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 100px;
}

/* .front-description {
padding-top: 0;
} */

</style>
