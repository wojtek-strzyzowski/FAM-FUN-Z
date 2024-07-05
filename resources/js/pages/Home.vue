<script setup>
import MainContent from '@/components/MainContent.vue';
import BlogCard from '@/components/BlogCard.vue';


</script>

<template>
    <MainContent>
        <div class="begrüssung">  
            <h2>Willkommen auf FAM FUN Z</h2>
            <p>
                Hier finden Sie viele Informationen und Tipps rund um das Thema Familie.
                Entdecken Sie spannende Beiträge, tauschen Sie sich mit anderen Eltern aus und erfahren Sie Neues.
            </p>
        </div>

        <div class="card-container">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    </MainContent>
</template>

<style scoped>


.begrüssung {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(70, 28, 11);
    font-weight: bolder;
}

.card-container {
    display: flex;
    flex-grow:1;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
}

@media (max-width: 768px) {

    h2 {
        font-size: 1.2rem;
        font-weight: bolder;
    }
}
</style>