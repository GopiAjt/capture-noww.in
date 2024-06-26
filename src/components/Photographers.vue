<template>
    <div class="recommendations">
        <div id="emptyData"></div>
        <div class="loader" v-if="loading"></div>
        <div v-else>
            <div v-for="photographer in photographers" :key="photographer.id" class="ele">
                <Card style="width: 25rem; overflow: hidden">
                    <template #header>
                        <a style="cursor: pointer" @click="alertLogin">
                            <img 
                                :src="photographer.profilePhoto ? `data:image/jpeg;base64,${photographer.profilePhoto}` : '/images/default_profile.png'"
                                class="card-img-top" alt="Photographer Image" 
                            />
                        </a>
                    </template>
                    <template #title>
                        <a @click.prevent="alertLogin" style="text-decoration: none; color: black;">
                            <h4 style="font-weight: bolder; margin-bottom: 0;">{{ photographer.name }}</h4>
                        </a>
                    </template>
                    <template #subtitle>{{ photographer.experience }} Years</template>
                    <template #content>
                        <div class="ratingDiv">
                            <h6 style="margin: 0%;">{{ photographer.avgRating }}</h6>
                        </div>
                        <div class="card-info-style">{{ photographer.serviceLocation }}</div>
                        <div class="card-info-style">{{ photographer.services }}</div>
                        <div class="card-info-style">{{ photographer.languages }}</div>
                    </template>
                    <template #footer>
                        <div class="flex gap-4 mt-1">
                            <div class="price-range">Starts with: {{ photographer.startsWith }}</div>
                            <Button label="Book Me" class="p-button-sm p-button-dark" @click="alertLogin" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

export default {
    components: {
        Button,
        Card
    },
    setup() {
        const photographers = ref([]);
        const loading = ref(true);

        const fetchPhotographers = () => {
            let offset = 0;
            let pageSize = 10;

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

        const alertLogin = (event) => {
            event.preventDefault();
            window.alert('Please Login to see a photographer');
        };

        onMounted(() => {
            fetchPhotographers();
        });

        return {
            photographers,
            loading,
            alertLogin
        };
    }
};
</script>

<style scoped>
.recommendations {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
}

.loader {
    display: block;
    /* Add loader styles */
}

.ele {
    margin-bottom: 20px;
}

.card-img-top {
    width: 100%;
    height: auto;
}

.card-name {
    display: flex;
    align-items: center;
}

.card-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.card-info-style {
    display: flex;
    align-items: center;
}

</style>
