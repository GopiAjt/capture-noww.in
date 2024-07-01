<script setup>
import SearchBar from './SearchBar.vue';
import LoginInPopup from './LogInPopup.vue';
import Photographers from './Photographers.vue';

</script>
<script>

export default {
    components: {
        SearchBar,
        Photographers
    },
    setup() {
        const photographers = ref([]);
        const loading = ref(true);

        const fetchPhotographers = (offset = 0, pageSize = 10) => {
            fetch(`http://localhost:8080/customer/getPhotographersIndex/${offset}/${pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    photographers.value = data.content;
                    loading.value = false;
                })
                .catch(error => {
                    console.error('Error fetching photographers:', error);
                    loading.value = false;
                });
        };

        const updatePhotographers = (data) => {
            photographers.value = data;
            loading.value = false;
        };

        onMounted(() => {
            fetchPhotographers();
        });

        return {
            photographers,
            loading,
            updatePhotographers
        };
    }
};
</script>
<template>
    <div id="navbar" style="position: sticky;">
        <img src="/src/assets/images/CaptureNow.png" alt="" id="home" width="45vw">
        <div id="search-bar">
            <SearchBar @searchResults="updatePhotographers" />
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
    position: sticky;
    top: 0;
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
        width: 370px;
        height: 50px;
        margin-top: 10px;
        background-color: yellow;
        justify-content: space-around;
        border-radius: 5px;
        padding: 10px;
    }

    #home {
        width: 40px;
    }
}
</style>