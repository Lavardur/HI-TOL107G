<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Veðurspá</h1>
        <p>Veldu staðsetningu til að sjá veðurspá.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-row justify-content-center">
          <button
            class="btn m-2"
            :class="selectedLocation === 'current' ? 'btn-primary' : 'btn-secondary'"
            @click="onSearchMyLocation"
          >
            Nota núverandi staðsetningu
          </button>
          <button
            v-for="location in locations"
            :key="location.title"
            class="btn m-2"
            :class="selectedLocation === location.title ? 'btn-primary' : 'btn-secondary'"
            @click="onSearch(location)"
          >
            {{ location.title }}
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="loading">
      <div class="col-12">
        <p>Hleð veðri...</p>
      </div>
    </div>
    <div class="row mt-4" v-if="error">
      <div class="col-12">
        <p class="text-danger">Villa kom upp: {{ error }}</p>
      </div>
    </div>
    <div class="row mt-4" v-if="results.length">
      <div class="col-12">
        <h2>Veðurspá fyrir {{ currentLocation.title }}</h2>
        <ul class="list-group">
          <li v-for="result in results" :key="result.time" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
            <div>{{ result.time }}</div>
            <div>{{ result.description }}</div>
            <div>{{ result.temperature }}°C</div>
              <div>Vindhraði: {{ result.windSpeed }}</div>
            </div>
            <img :src="result.icon" :alt="result.description" class="weather-icon" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { weatherSearch } from '../js/weather.js';

export default {
  name: 'WeatherComponent',
  data() {
    return {
      locations: [
        { title: 'Reykjavík', lat: 64.1355, lng: -21.8954 },
        { title: 'Akureyri', lat: 65.6835, lng: -18.0878 },
        { title: 'New York', lat: 40.7128, lng: -74.006 },
        { title: 'Tokyo', lat: 35.6764, lng: 139.65 },
        { title: 'Sydney', lat: 33.8688, lng: 151.2093 },
      ],
      results: [],
      currentLocation: null,
      loading: false,
      error: null,
      selectedLocation: null,
    };
  },
  methods: {
    async onSearch(location) {
      this.loading = true;
      this.error = null;
      this.results = [];
      this.currentLocation = location;
      this.selectedLocation = location.title;

      try {
        const results = await weatherSearch(location.lat, location.lng);
        this.results = results;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async onSearchMyLocation() {
      if (navigator.geolocation) {
        this.loading = true;
        this.error = null;
        this.results = [];
        this.selectedLocation = 'current';

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
              const results = await weatherSearch(lat, lng);
              this.currentLocation = { title: 'Núverandi staðsetningu', lat, lng };
              this.results = results;
            } catch (error) {
              this.error = error.message;
            } finally {
              this.loading = false;
            }
          },
          () => {
            this.error = 'Ekki tókst að sækja staðsetningu';
            this.loading = false;
          },
        );
      } else {
        this.error = 'Vafrinn styður ekki geolocation';
      }
    },
  },
};
</script>

<style scoped>
.btn {
  cursor: pointer;
}

.weather-icon {
  width: 50px;
  height: auto;
}

@media (max-width: 768px) {
  .list-group-item {
    flex: 1 1 100%;
  }
}
</style>