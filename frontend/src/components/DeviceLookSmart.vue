<script></script>

<template>
    <div class="smartphone">
        <div class="contentSmart">
            <iframe src="https://yukselsoftware.de/music.html" frameborder="0" style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
    </div>
</template>

<style>
    /* The device with borders */
.smartphone {
  position: relative;
  width: 360px;
  height: 640px;
  margin: auto;
  border: 16px rgb(33, 29, 29) solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone .contentSmart {
  width: 335px;
  height: 550px;
  background: white;
}

</style>