<script>
import exifr from 'exifr';

export default {
  data() {
    return {
      exifData: null,  // EXIF verisi burada saklanacak
      map: null
    };
  },
  mounted() {
    console.log("Google Map Api Key: ", import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
    this.testGoogleMapsApiKey()
  },
  methods: {
    testGoogleMapsApiKey() {
      const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      console.log("Google Maps API: ", googleMapsApiKey)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleMapsApiKey}&address=New+York`)
        .then(response => response.json())
        .then(data => {
          if (data.status === "OK") {
            console.log("API Anahtarı geçerli:", data);
          } else {
            console.error("API Anahtarı hatası:", data.status);
          }
        })
        .catch(error => {
          console.error("Hata:", error);
          alert('Sorry, there was an error loading the map or EXIF data.');
        });
    },
    loadMap() {
      const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const lat = this.exifData.GPSLatitude[0] + this.exifData.GPSLatitude[1] / 60 + this.exifData.GPSLatitude[2] / 3600;
      const lon = this.exifData.GPSLongitude[0] + this.exifData.GPSLongitude[1] / 60 + this.exifData.GPSLongitude[2] / 3600;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      window.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: { lat: lat, lng: lon }
        });

        // Haritaya bir işaretçi ekle
        new google.maps.Marker({
          position: { lat: lat, lng: lon },
          map: this.map,
          title: 'Photo Location'
        });
      };
      document.head.appendChild(script);
    },
    async getExifData(event) {
      const file = event.target.files[0];
      if (!['image/jpeg', 'image/png', 'image/tiff'].includes(file.type)) {
        alert('Only JPEG, PNG, or TIFF formatted photos may contain EXIF data.');
        return;
      }
      if (file) {
        try {
          // EXIF verilerini oku
          const exif = await exifr.parse(file);
          console.log('EXIF Data:', exif);

          // Tarihi daha okunabilir bir formata dönüştürme
          const date = exif.CreateDate ? new Date(exif.CreateDate) : null;
          const formattedDateTime = date ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : 'N/A';

          this.exifData = {
            formattedDateTime: formattedDateTime,
            ExifVersion: exif.ExifVersion || 'N/A',
            Software: exif.Software || 'N/A',
            Make: exif.Make || 'N/A',
            Model: exif.Model || 'N/A',
            ExposureTime: exif.ExposureTime || 'N/A',
            FNumber: exif.FNumber || 'N/A',
            ExposureProgram: exif.ExposureProgram || 'N/A',
            ImageWidth: exif.ImageWidth || 'N/A',
            ImageHeight: exif.ImageHeight || 'N/A',
            BitsPerSample: exif.BitsPerSample ? Array.from(exif.BitsPerSample) : [],
            ColorSpace: exif.ColorSpace || 'N/A',
            ExifImageWidth: exif.ExifImageWidth || 'N/A',
            ExifImageHeight: exif.ExifImageHeight || 'N/A',
            XResolution: exif.XResolution || 'N/A',
            YResolution: exif.YResolution || 'N/A',
            ResolutionUnit: exif.ResolutionUnit || 'N/A',
            Orientation: exif.Orientation || 'N/A',
            PhotometricInterpretation: exif.PhotometricInterpretation || 'N/A',
            SamplesPerPixel: exif.SamplesPerPixel || 'N/A',
            BitDepth: exif.BitDepth || 'N/A',
            ColorType: exif.ColorType || 'N/A',
            Compression: exif.Compression || 'N/A',
            Filter: exif.Filter || 'N/A',
            Interlace: exif.Interlace || 'N/A',
            GPSLatitude: exif.GPSLatitude ? Array.from(exif.GPSLatitude) : [],
            GPSLongitude: exif.GPSLongitude ? Array.from(exif.GPSLongitude) : []
          };

          // Haritayı sadece GPS bilgileri mevcutsa yükle
          if (this.exifData.GPSLatitude && this.exifData.GPSLongitude) {
            this.loadMap();
          }
        } catch (error) {
          console.error('Error reading EXIF data:', error);
          alert('Sorry, there was an error loading the EXIF data.');
        }
      }
    }
  }
}
</script>

<template>
  <div class="w3-container w3-card-4 w3-light-grey w3-round-large w3-margin">
    <h2 class="w3-xxlarge w3-center">FotoMeta GPS Extractor</h2>
    <h2 class="w3-center w3-text-deep-orange">EXIF and GPS Information</h2>
    <p class="w3-text-grey w3-center">Upload a photo to view EXIF and GPS data:</p>
    <img src="../components/icons/FotoGps.png" alt="App Icon" class="app-logo" />

    <div class="w3-center">
      <input class="w3-button w3-blue w3-round-large" type="file" @change="getExifData" />
    </div>

    <!-- Bilgilendirme yazısı -->
    <div class="w3-container w3-margin-top w3-padding-16">
      EXIF (Exchangeable Image File) is a standard format in digital photography that embeds additional information into JPEG images. This data includes important details like shutter speed, ISO value, date, time, white balance, flash usage, and resolution. Some images may also store GPS information, revealing the exact location where the photo was taken.
      On <span class="w3-text-deep-orange">yukselsoftware.de</span>, you can easily upload and explore these hidden details from your favorite photos. Whether you're a photography enthusiast or a professional, this online tool offers a quick and intuitive way to view the metadata behind your images.
      <p class="w3-text-grey w3-center">Upload a JPEG, PNG, or TIFF photo to view EXIF and GPS data. Large files may take a few seconds to load.</p>
    </div>

    <!-- EXIF Verileri -->
    <div v-if="exifData" class="w3-container w3-light-grey w3-margin-top w3-padding-16 w3-card w3-animate-opacity w3-half">
      <h3 class="w3-text-deep-orange">EXIF Data:</h3>
      <p v-if="exifData.formattedDateTime"><strong>Date Time Original:</strong> {{ exifData.formattedDateTime }}</p>
      <p v-if="exifData.ExifVersion"><strong>Exif Version:</strong> {{ exifData.ExifVersion }}</p>
      <p v-if="exifData.Software"><strong>Software:</strong> {{ exifData.Software }}</p>
      <p v-if="exifData.Make"><strong>Make:</strong> {{ exifData.Make }}</p>
      <p v-if="exifData.Model"><strong>Model:</strong> {{ exifData.Model }}</p>
      <p v-if="exifData.ExposureTime"><strong>Exposure Time:</strong> {{ exifData.ExposureTime }} seconds</p>
      <p v-if="exifData.FNumber"><strong>F Number:</strong> {{ exifData.FNumber }}</p>
      <p v-if="exifData.ExposureProgram"><strong>Exposure Program:</strong> {{ exifData.ExposureProgram }}</p>
      <p v-if="exifData.ImageWidth"><strong>Image Width:</strong> {{ exifData.ImageWidth }} px</p>
      <p v-if="exifData.ImageHeight"><strong>Image Height:</strong> {{ exifData.ImageHeight }} px</p>
      <p v-if="exifData.BitsPerSample && exifData.BitsPerSample.length"><strong>Bits Per Sample:</strong> {{ exifData.BitsPerSample.join(', ') }}</p>
      <p v-if="exifData.ColorSpace"><strong>Color Space:</strong> {{ exifData.ColorSpace }}</p>
      <p v-if="exifData.ExifImageWidth"><strong>Exif Image Width:</strong> {{ exifData.ExifImageWidth }} px</p>
      <p v-if="exifData.ExifImageHeight"><strong>Exif Image Height:</strong> {{ exifData.ExifImageHeight }} px</p>
      <p v-if="exifData.XResolution"><strong>X Resolution:</strong> {{ exifData.XResolution }}</p>
      <p v-if="exifData.YResolution"><strong>Y Resolution:</strong> {{ exifData.YResolution }}</p>
      <p v-if="exifData.ResolutionUnit"><strong>Resolution Unit:</strong> {{ exifData.ResolutionUnit }}</p>
      <p v-if="exifData.Orientation"><strong>Orientation:</strong> {{ exifData.Orientation }}</p>
      <p v-if="exifData.PhotometricInterpretation"><strong>Photometric Interpretation:</strong> {{ exifData.PhotometricInterpretation }}</p>
      <p v-if="exifData.SamplesPerPixel"><strong>Samples Per Pixel:</strong> {{ exifData.SamplesPerPixel }}</p>

      <!-- Yeni eklenen veriler -->
      <p v-if="exifData.BitDepth"><strong>Bit Depth:</strong> {{ exifData.BitDepth }}</p>
      <p v-if="exifData.ColorType"><strong>Color Type:</strong> {{ exifData.ColorType }}</p>
      <p v-if="exifData.Compression"><strong>Compression:</strong> {{ exifData.Compression }}</p>
      <p v-if="exifData.Filter"><strong>Filter:</strong> {{ exifData.Filter }}</p>
      <p v-if="exifData.Interlace"><strong>Interlace:</strong> {{ exifData.Interlace }}</p>

      <!-- GPS Bilgileri -->
      <p v-if="exifData.GPSLatitude"><strong>GPS Latitude:</strong> {{ exifData.GPSLatitude.join(', ') }} {{ exifData.GPSLatitudeRef }}</p>
      <p v-if="exifData.GPSLongitude"><strong>GPS Longitude:</strong> {{ exifData.GPSLongitude.join(', ') }} {{ exifData.GPSLongitudeRef }}</p>
    </div>

    <!-- Harita -->
    <div v-if="exifData && exifData.GPSLatitude && exifData.GPSLongitude" class="w3-half w3-container w3-card-4 w3-margin-top w3-padding-16 w3-animate-opacity">
      <h3 class="w3-text-white">Map:</h3>
      <div id="map" style="height: 400px;"></div>
    </div>
  </div>
</template>

<style>
/* Sayfayı bozmadan stil eklemeleri yapılabilir */
.w3-container {
  padding: 20px;
}

.w3-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.w3-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.w3-button {
  margin-top: 10px;
}

.w3-animate-opacity {
  animation: fadeIn 1.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.app-logo {
  width: 100px;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>
