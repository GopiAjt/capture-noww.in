<template>
    <div class="search-box form-outline" id="search-autocomplete">
        <label for="inputPre">
            <i class="bi bi-search"></i>
        </label>&nbsp;
        <input type="text" class="search-input" id="inputPre" placeholder="Search by preferences" v-model="searchQuery"
            @input="updateResults" @keyup.enter="fetchResults" ref="searchInputPre" />
        <div class="dropdown-menu" id="autocompleteResultsPre" aria-labelledby="inputPre"
            v-if="filteredPreparations.length">
            <button v-for="preparation in filteredPreparations" :key="preparation" class="dropdown-item"
                @click="selectPreparation(preparation)" role="option" aria-selected="false">
                {{ preparation }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const preparations = [
    'Wedding',
    'Pre Wedding',
    'Portraits',
    'Documentary',
    'Fashion',
    'Commercial',
    'Street',
    'Event',
    'Travel',
    'Pet',
    'Product',
    'Real Estate',
    'Food',
    'Still Life',
    'Architecture',
    'Abstract',
    'Landscape',
    'Wildlife',
    'Macro',
    'Astrophotography',
    'Scientific',
    'Underwater',
];

const filteredPreparations = computed(() => {
    if (!searchQuery.value) return [];
    return preparations.filter((item) =>
        item.toLowerCase().startsWith(searchQuery.value.toLowerCase())
    );
});

const updateResults = () => {
    // This function will be called on input, and it will update the filteredPreparations computed property
    // Actually, the computed property filteredPreparations automatically updates when searchQuery changes,
    // so this function does not need to do anything in this case.
};

const selectPreparation = (preparation) => {
    searchQuery.value = preparation;
};

const fetchResults = async () => {
    if (!searchQuery.value) return;
    let offset = 0;
    let pageSize = 10;
    console.log('Search query:', searchQuery.value);
    try {
        const response = await fetch(`/api/customer/searchByPreference?pre=${encodeURIComponent(searchQuery.value)}&offset=${offset}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response status:', response.status);
        console.log('Response content type:', response.headers.get('content-type'));

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response received:', text);
            throw new TypeError("Received non-JSON response");
        }

        const data = await response.json();
        console.log('Search results:', data);
        // Handle the search results as needed
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
</script>

<style scoped>
.form-check-input {
    cursor: pointer;
}

.autocomplete {
    position: relative;
    display: inline-block;
}

.search-box {
    position: relative;
    display: flex;
    width: 40vw;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    outline: none;
    color: rgb(0, 0, 0);
    background: none;
}

.search-input {
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 1.8vmin;
    color: rgb(0, 0, 0);
    background: none;
    width: 100%;
}

#autocompleteResultsPre {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #000000;
    border-top: none;
    border-radius: 0 0 10px 10px;
    max-height: 150px;
    overflow-y: auto;
    background-color: rgb(255, 255, 255);
    z-index: 1000;
    display: flex;
    flex-direction: column;
}

.dropdown-item {
    padding: 8px;
    cursor: pointer;
    list-style: none;
    transition: 1.3s;
    color: #000000;
    background-color: #f5f5f5;
}

.dropdown-item:hover {
    background-color: rgba(229, 255, 0, 0.46);
}

::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    height: 30px;
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
}

::-webkit-scrollbar-button {
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 5px;
}

@media (max-width: 575px) {
    .search-box {
        width: 60vw;
    }

    .search-input {
        width: 56vw;
        font-size: 15px;
    }
}
</style>
