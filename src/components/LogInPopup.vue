<template>
    <div class="card flex justify-center">
        <Button label="Log In" @click="visible = true" id="login-btn" 
        :style="{ backgroundColor: 'yellow', borderColor: 'black' }"/>
        <Dialog v-model:visible="visible" header="CaptureNoww" modal :style="{ width: '25rem' }">

            <div class="card">
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Log In</Tab>
                        <Tab value="1">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="0">
                            <div class="card flex justify-center">
                                <br><br>
                                <FloatLabel>
                                    <InputText id="username" v-model="emailId" />
                                    <label for="username">Email Id</label>
                                </FloatLabel>
                                <br><br>
                                <div class="card flex justify-center">
                                    <Password v-model="password" toggleMask />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="1">

                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";


const password = ref(null);

import FloatLabel from 'primevue/floatlabel';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';



const visible = ref(false);
</script>

<style scoped>
#login-btn{
    height: 35px;
}
.p-tablist-tab-list{
    justify-content: space-between;
}
</style>