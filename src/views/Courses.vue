<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">{{ $t('Courses that take your English to the next level.') }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        
        <div class="jumbotron text-center courses bg-white shadow">
          <a
            href="https://yingyuyingxiong.teachable.com/"
            class="btn btn-success view-courses pb-1 bigger"
            target="_blank"
          >
            {{ $t('View all of our courses on') }}
            <img
              src="/img/teachable_light.png"
              alt="Teachable"
              class="logo-small mb-1"
            />
          </a>
          <p
            class="mt-3"
            v-html="$t('<b>Teachable</b> is an online platform that hosts video courses.')"
          />
        </div>
        <h2 class="mb-5 text-center" style="margin-top: 5rem">什么课程适合我？</h2>
        <p class="lead text-center mb-5">请参考以下的教学目标一览表。</p>
        <div class="text-center">
          <img src="/img/ezh-curriculum.jpg" alt="英语英雄课程等级表" class="img-fluid">
        </div>
        <p class="mt-5">参考以下的例子：</p>
        <ul>
          <li>比如，您的英语程度已经超越了雅思8，达到了C2的水平，可以学习“C2级词汇”课程。</li>
          <li>再比如，您是高中生，那么“英语英雄5级”适合您，可以帮助您提高水平直到考过大学六级。</li>
          <li>再比如，您已经考过中国“英语六级“，那么“英语英雄6级”适合您，可以提高您的英语水平，考过专业八级，达到雅思8分的水平。</li>
          <li>再比如，您从小学一年级就开始学习英语，现在上小学五年级，那么“英语英雄3级”适合您。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.courses a:not(.btn) {
  color: inherit;
}

.courses a:hover {
  text-decoration: none;
}
</style>
