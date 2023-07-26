<script setup></script>

<template>
  <div class="container">

  </div>
</template>

<style scoped lang="less">
@import "@/assets/css/IndexPage.less";
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @background-color;
  position: relative;
  transition: 0.5s;
  z-index: 1;
  background-image: @container-gradient;

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    text-decoration: none;
    background: @background-color @container-gradient;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    background: @background-color radial-gradient(at 47% 33%, @gradient-color-1 0, @gradient-transparent-1);
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
    filter: blur(30px);
  }

  &:hover:before,
  &:hover:after {
    transform: skewX(0deg) @container-gradient-hover;
  }

  &:before,
  &:after {
    background: linear-gradient(315deg, @accent-color, @hover-color);
  }

  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    pointer-events: none;
  }

  span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-radius: 8px;
    background: rgba(253, 252, 252, 0.1);
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: 0.1s;
    animation: animate 2s ease-in-out infinite;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  span::before {
    top: -40px;
    left: 40px;
    width: 50px;
    height: 50px;
    opacity: 1;
  }
}
</style>
