<script>
export default {

  mounted() {
    this.$nextTick(() => {
      window.w3CodeColor();
    });
  },
  updated() {
    this.$nextTick(() => {
      window.w3CodeColor();
    });
  },
};
</script>
<template>
  <div class="w3-container w3-margin-top">
    <h1>Vue Giriş</h1>
    <hr>

    <div class="w3-container w3-metro-dark-green w3-round-large">
      <p>Vue, bir JavaScript framework'üdür. Vue, bir HTML sayfasına <code class="w3-code">&lt;script&gt;</code> etiketiyle eklenebilir.</p>
      <p><b>Vue, Yönergeler</b> ile HTML niteliklerini genişletir ve <b>İfadeler</b> ile verileri HTML'ye bağlar .</p>
    </div>
    <hr>
    <h2>Vue bir JavaScript Çerçevesidir</h2>
    <div class="w3-container">
      <p>Vue, JavaScript ile yazılmış bir ön uç JavaScript çerçevesidir.</p>
      <p>Vue'ye benzer frameworkler React ve Angular'dır, ancak Vue daha hafiftir ve başlangıç ​​için daha kolaydır.</p>
      <p>Vue bir JavaScript dosyası olarak dağıtılır ve bir web sayfasına script etiketiyle eklenebilir:</p>
    </div>

    <div class="w3-panel w3-card w3-light-grey">
      <h4>JavaScript Example</h4>
      <div class="w3-code jsHigh notranslate" ref="codeContainer">
        <!-- &lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt; -->
      </div>
    </div>

    <div class="w3-container ">
      <h2>Neden Vue Öğrenmelisiniz?</h2><br>
      <ul>
        <li>Kullanımı basit ve kolaydır.</li>
        <li>Hem basit hem de karmaşık projelerin üstesinden gelebilmektedir.</li>
        <li>Giderek artan popülaritesi ve açık kaynaklı topluluk desteği.</li>
        <li>Normal JavaScript'te HTML ve JavaScript'in NASIL bağlandığını yazmamız gerekir , ancak Vue'de yapmamız gereken tek şey bir bağlantının OLDUĞUNDAN emin olmak ve gerisini Vue'ye bırakmaktır.</li>
        <li>Şablon tabanlı söz dizimi, çift yönlü veri bağlama ve merkezi durum yönetimi ile daha verimli bir geliştirme sürecine olanak tanır.</li>
      </ul>
      <p>Eğer bu noktalardan bazılarını anlamakta zorlanırsanız endişelenmeyin, eğitimin sonunda anlayacaksınız.</p>
    </div>
    <hr>

    <div class="w3-container">
      <h2>Seçenekler API'si</h2><br>
      <p>Vue'da kod yazmanın iki farklı yolu vardır: Options API'si ve Composition API'si.</p>
      <p>Hem Option API hem de Composition API'sinin temelinde yatan kavramlar aynıdır, dolayısıyla birini öğrendikten sonra diğerine
        kolayca geçebilirsiniz.
      </p>
      <p>Bu eğitimde Option API'si yazılmıştır çünkü daha başlangıç ​​seviyesindeki kullanıcılara uygun, daha kolay tanınabilir bir yapıya sahip olduğu düşünülmektedir.</p>
      <p>Seçenekler API'si ile Kompozisyon API'si arasındaki farklar hakkında daha fazla bilgi edinmek için bu eğitimin sonundaki sayfaya göz atın .</p>
    </div>
    <hr>

    <div class="w3-container">
      <h2>İlk Sayfam</h2><br>
      <p>Şimdi 5 basit adımda ilk Vue web sayfamızı nasıl oluşturabileceğimizi öğreneceğiz:</p>
      <ol>
        <li>Basit bir HTML dosyasıyla başlayın.</li>
        <li>Vue'nün bağlanacağı bir <code class="w3-text-orange">&lt;div id="app"&gt;</code> etiketi ekleyin.</li>
        <li>Vue'ye bir bağlantı içeren bir  <code class="w3-text-orange">&lt;script&gt;</code> etiketi ekleyerek tarayıcıya Vue kodunu nasıl işleyeceğini söyleyin.</li>
        <li>İçerisinde Vue örneği bulunan bir <code class="w3-text-orange">&lt;script&gt;</code> etiketi ekleyin.</li>
        <li><code class="w3-text-orange">&lt;div id="app"&gt;</code> etiketine Vue örneğini bağlayın.</li>
      </ol>
    </div>
    <hr>

    <div class="w3-container">
      <h2>Adım 1: HTML sayfası</h2><br>
      <p>Basit bir HTML sayfasıyla başlayın:</p>
    </div>
    <div class="w3-panel w3-card w3-light-grey">
      <div class="w3-code htmlHigh notranslate" ref="codeContainer">
        <!-- &lt;!DOCTYPE html&gt;<br>&lt;html lang="en"&gt;<br>&lt;head&gt;<br>&lt;title&gtİlk Vue.js Sayfam&lt;/title&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br><br>&lt;/body&gt;<br>&lt;/html&gt; -->
      </div>
    </div>
    <hr>
    <div class="w3-container">
      <h2>Adım 2: &lt;div&gt; ekleyin</h2><br>
      <p>Vue'nun bağlanabilmesi için sayfanızda bir HTML öğesine ihtiyacı vardır.</p>
      <p ><span class="w3-text-orange">&lt;div&gt;</span> etiketinin içine bir <span class="w3-text-orange">&lt;body&gt;</span>
        etiketi ekleyin ve ona bir id verin:
      </p>
    </div>
    <div class="w3-panel w3-card w3-light-grey">
      <div class="w3-code htmlHigh notranslate" ref="codeContainer">
          <!-- &lt;body&gt;<br>&lt;div id="app"&gt;&lt;/div&gt;<br>&lt;/body&gt; -->
      </div>
    </div>
    <hr>

    <div class="w3-container">
      <h2>Adım 3: Vue'ye bir bağlantı ekleyin</h2><br>
      <p>Tarayıcımızın Vue kodumuzu yorumlamasına yardımcı olmak için şu <span class="w3-text-orange">&lt;script&gt;</span> etiketi ekleyin.</p>
    </div>
    <div class="w3-panel w3-card w3-light-grey">
      <div class="w3-code jsHigh notranslate" ref="codeContainer">
        <!-- &lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt; -->
      </div>
    </div>
    <hr>

    <div class="w3-container">
      <h2>Adım 4: Vue örneğini ekleyin</h2><br>
      <p>Şimdi Vue kodumuzu eklememiz gerekiyor.</p>
      <p><b>Buna Vue örneği</b> denir ve veriler, yöntemler ve diğer şeyleri içerebilir, ancak şimdi yalnızca bir mesaj içerir.</p>
    </div>
    <div class="w3-panel w3-card w3-light-grey">
      <div class="w3-code htmlHigh notranslate" ref="codeContainer">
        <!-- &lt;div id="app"&gt;&lt;/div&gt;<br><br>&lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt;<br><br>&lt;script&gt;<br><br>const app = Vue.createApp({<br>data() {<br>return {<br>message: "Hello World!"<br>}<br>}<br>})<br><br>app.mount('#app')<br><br>&lt;/script&gt; -->
      </div>
    </div>

    <div class="w3-container">
      <h2>Adım 5: Metin Enterpolasyonu ile "mesajı" görüntüleyin</h2><br>
      <p>Son olarak, veriler için yer tutucu olarak </p>
    </div>
    <div class="w3-panel w3-card w3-light-grey">
      <div class="w3-code htmlHigh notranslate" ref="codeContainer">
        <!-- &lt;div id="app"&gt;&lt;/div&gt;<br><br>&lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt;<br><br>&lt;script&gt;<br><br>const app = Vue.createApp({<br>data() {<br>return {<br>message: "Hello World!"<br>}<br>}<br>})<br><br>app.mount('#app')<br><br>&lt;/script&gt; -->
      </div>
    </div>

  </div>
</template>
