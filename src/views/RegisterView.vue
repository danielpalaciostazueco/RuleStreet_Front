<script setup lang="ts">
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/Register/RegisterFormComponent.vue';
const router = useRouter();
</script>

<template>
    <div class="register_container">
        <RegisterForm />
    </div>
</template>
