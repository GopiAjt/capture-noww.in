<template>
    <div class="recommendations">
        <div v-if="loading" class="loader"></div>
        <div v-else>
            <div v-if="photographers.length === 0" id="emptyData">No photographers found.</div>
            <div v-for="photographer in photographers" :key="photographer.id" class="ele">
                <Card style="width: 21rem; overflow: hidden">
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
                            <Button label="Book Me" class="p-button-sm p-button-dark" @click="alertLogin" 
                            :style="{ backgroundColor: 'yellow', borderColor: 'black' }"/>
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
    margin: 20px 10px;
}

.loader {
    display: block;
    /* Add loader styles */
}

.ele {
    margin-bottom: 20px;
}

.card {
    /* Add card styles */
}

.card-body {
    /* Add card-body styles */
}

.card-img-top {
    width: 100%;
    height: auto;
}

.card-info-style {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.card-footer {
    /* Add card-footer styles */
}

.price-range {
    font-weight: bold;
}

@media (max-width: 768px) {
    .card {
        width: 100%;
    }
}
</style>
