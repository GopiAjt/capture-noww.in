<script setup>

import SearchBar from './SearchBar.vue';
import Button from "primevue/button";
import LoginInPopup from './LogInPopup.vue';
</script>

<template>
    <div id="navbar">
        <img src="/src/assets/images/CaptureNow.png" alt="" id="home" width="45vw">
        <div id="search-bar">
            <SearchBar />
        </div>
        <div>
            <LoginInPopup />
        </div>

    </div>
</template>

<style scoped>
#navbar {
    margin-top: 0%;
    display: flex;
    align-items: center;
    width: 1500px;
    height: 50px;
    margin-top: 10px;
    background-color: yellow;
    justify-content: space-around;
    border-radius: 5px;
}

#search-bar {
    height: 50px;
    display: flex;
    align-items: center;
}

@media (max-width: 412px) {
    #navbar {
        margin-top: 0%;
        display: flex;
        align-items: center;
        width: 400px;
        height: 50px;
        margin-top: 10px;
        background-color: yellow;
        justify-content: space-around;
        border-radius: 5px;
    }
    #home{
        width: 32px;
    }
}
</style>